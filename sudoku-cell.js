class SudokuCell extends Phaser.GameObjects.Container {
    constructor(scene, x, y, row, col, value, isReadOnly, size) {
        super(scene, x, y);
        this.cellSize = size;
        this.row = row;
        this.col = col;
        this.value = value;
        this.isReadOnly = isReadOnly; // Garanta que isso está sendo salvo

        this.bg = scene.add.rectangle(0, 0, size - 2, size - 2, 0xffffff, 0).setOrigin(0.5);
        
        // Estética: Números bloqueados (fixos) geralmente são brancos ou azul escuro
        // Números que o jogador coloca são de outra cor (ex: amarelo)
        const textColor = isReadOnly ? '#ffffff' : '#ffff00'; 
        
        this.text = scene.add.text(0, 0, value !== 0 ? value : '', {
            fontSize: `${Math.floor(size * 0.6)}px`,
            color: textColor,
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.add([this.bg, this.text]);
        scene.add.existing(this);
    }

    updateValue(newValue, isCorrect) {
        // ESSA É A TRAVA DE SEGURANÇA:
        if (this.isReadOnly) return; 

        this.value = newValue;
        this.text.setText(newValue !== 0 ? newValue : '');
        this.text.setColor(isCorrect ? '#ffff00' : '#ff0000');
    }

    setHighlight(active) {
        this.bg.setFillStyle(0xffffff, active ? 0.15 : 0);
    }
}