class GameScene extends Phaser.Scene {
    constructor() {
        super('GameScene');
    }

    init(data) {
        // Recebe a dificuldade da TitleScene. Se não existir, assume 5.
        this.difficulty = data.difficulty !== undefined ? data.difficulty : 5;
       
        this.cells = [];
        this.selectedNumber = null;
        this.attempts = 3;
        this.gameOver = false;
        this.paletteItems = [];
        
        // Layout
        this.marginSide = 20;
        this.innerPadding = 30;
        this.gridDisplaySize = 450 - (this.marginSide * 2);
        this.cellSize = this.gridDisplaySize / 9;
        this.offsetY = (800 - (this.gridDisplaySize + 60 + 150)) / 2;
    }

    create() {
        this.sudoku = new SudokuCore();
        const board = this.sudoku.generate(this.difficulty);

        // 1. Primeiro criamos os containers (A ORDEM IMPORTA)
        this.gridContainer = this.add.container(this.marginSide, this.offsetY);
        this.paletteContainer = this.add.container(this.marginSide, this.offsetY + this.gridDisplaySize + this.innerPadding);

        // 2. Populamos o Grid
        this.setupGrid(board); // <--- Remova o this.updateVisualState() de dentro desse método!

        // 3. Populamos a Paleta
        this.setupPalette();

        // 4. UI de Status
        const paletteY = this.offsetY + this.gridDisplaySize + this.innerPadding;
        this.attemptsText = this.add.text(this.marginSide, paletteY + 85, `Tentativas: ${this.attempts}`, {
            fontSize: '20px', color: '#ffffff', fontFamily: 'Arial'
        });

        // 5. AGORA SIM: Sincronizamos o visual pela primeira vez
        this.updateVisualState();

        this.input.on('pointerdown', (pointer) => this.handleInput(pointer));
    }

    setupGrid(board) {
        const g = this.add.graphics();
        this.gridContainer.add(g);
        
        for (let i = 0; i <= 9; i++) {
            const thick = i % 3 === 0 ? 4 : 1;
            const pos = i * this.cellSize;
            g.lineStyle(thick, 0xffffff);
            g.lineBetween(pos, 0, pos, this.gridDisplaySize);
            g.lineBetween(0, pos, this.gridDisplaySize, pos);
        }

        for (let r = 0; r < 9; r++) {
            this.cells[r] = [];
            for (let c = 0; c < 9; c++) {
                const val = board[r][c];
                const isLocked = (val !== 0);
                const x = (c * this.cellSize) + (this.cellSize / 2);
                const y = (r * this.cellSize) + (this.cellSize / 2);
                
                const cell = new SudokuCell(this, x, y, r, c, val, isLocked, this.cellSize);
                this.gridContainer.add(cell);
                this.cells[r][c] = cell;
            }
        }
    }

    setupPalette() {
        const itemW = this.gridDisplaySize / 10;
        for (let i = 0; i <= 9; i++) {
            const x = (i * itemW) + (itemW / 2);
            const bg = this.add.rectangle(x, 25, itemW - 4, 50, 0x333333).setOrigin(0.5);
            const text = this.add.text(x, 25, i === 0 ? "X" : i, {
                fontSize: '24px', color: '#fff', fontStyle: 'bold'
            }).setOrigin(0.5);
            
            this.paletteContainer.add([bg, text]);
            this.paletteItems.push({ bg, text });
        }
    }

    handleInput(pointer) {
        if (this.gameOver) return;

        const gridX = pointer.x - this.gridContainer.x;
        const gridY = pointer.y - this.gridContainer.y;
        
        if (gridX >= 0 && gridX <= this.gridDisplaySize && gridY >= 0 && gridY <= this.gridDisplaySize) {
            const col = Math.floor(gridX / this.cellSize);
            const row = Math.floor(gridY / this.cellSize);
            this.makeMove(row, col);
            return;
        }

        const palX = pointer.x - this.paletteContainer.x;
        const palY = pointer.y - this.paletteContainer.y;

        if (palY >= 0 && palY <= 50) {
            const col = Math.floor(palX / (this.gridDisplaySize / 10));
            if (col >= 0 && col <= 9) {
                this.selectedNumber = col;
                this.updateVisualState();
            }
        }
    }

    makeMove(row, col) {
        const cell = this.cells[row][col];
        if (cell.isReadOnly) return;

        // BLOQUEIO: Se não houver nada selecionado na paleta, não faz nada
        if (this.selectedNumber === null) return;

        // Lógica para apagar: 
        // Se selecionou o "X" (0) OU se clicou com o mesmo número que já está lá
        if (this.selectedNumber === 0 || cell.value === this.selectedNumber) {
            cell.updateValue(0, true);
            this.sudoku.grid[row][col] = 0;
        } 
        // Lógica para preencher:
        else {
            const isCorrect = this.sudoku.solution[row][col] === this.selectedNumber;
            cell.updateValue(this.selectedNumber, isCorrect);
            this.sudoku.grid[row][col] = this.selectedNumber;

            if (!isCorrect) {
                this.attempts--;
                this.attemptsText.setText(`Tentativas: ${this.attempts}`);
                this.cameras.main.shake(150, 0.005);
                if (this.attempts <= 0) this.endGame("GAME OVER", "#ff0000");
            } else {
                this.checkWin();
            }
        }

        this.updateVisualState();
    }

    updateVisualState() {
        // 1. Deseleciona se o número acabou (apenas para 1-9)
        if (this.selectedNumber !== null && this.selectedNumber !== 0) {
            if (this.isNumberCompleted(this.selectedNumber)) {
                this.selectedNumber = null;
            }
        }

        // 2. Highlights do Grid
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                const cell = this.cells[r][c];
                // Só destaca células se houver um número de 1 a 9 selecionado
                const shouldHighlight = (this.selectedNumber !== null && this.selectedNumber > 0) 
                                        && (cell.value === this.selectedNumber);
                cell.setHighlight(shouldHighlight);
            }
        }

        // 3. Highlights da Paleta
        this.paletteItems.forEach((item, index) => {
            const completed = this.isNumberCompleted(index);
            if (completed && index !== 0) {
                item.bg.setVisible(false);
                item.text.setVisible(false);
            } else {
                item.bg.setVisible(true);
                item.text.setVisible(true);

                // Só ativa o visual amarelo se o index bater com a seleção E não for null
                const active = (this.selectedNumber === index) && (this.selectedNumber !== null);
                
                item.text.setColor(active ? '#ffff00' : '#ffffff');
                item.bg.setStrokeStyle(active ? 3 : 0, 0xffff00);
            }
        });
    }

    isNumberCompleted(num) {
        if (num === 0) return false;
        let count = 0;
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (this.sudoku.grid[r][c] === num && this.sudoku.grid[r][c] === this.sudoku.solution[r][c]) count++;
            }
        }
        return count === 9;
    }

    checkWin() {
        const win = this.sudoku.grid.every((row, r) => 
            row.every((val, c) => val === this.sudoku.solution[r][c])
        );
        if (win) this.endGame("VITÓRIA!", "#00ff00");
    }

    endGame(msg, color) {
        this.gameOver = true;
        
        // Para a música de fundo se houver e limpa eventos
        this.input.removeAllListeners();

        // Inicia a GameOverScene passando os dados do resultado
        this.scene.start('GameOverScene', { 
            message: msg, 
            color: color 
        });
    }
}