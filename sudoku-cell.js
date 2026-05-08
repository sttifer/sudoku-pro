class SudokuCell extends Phaser.GameObjects.Container {
    constructor(scene, x, y, row, col, value, isReadOnly, size) {
        super(scene, x, y);
        this.cellSize = size;
        this.row = row;
        this.col = col;
        this.value = value;
        this.isReadOnly = isReadOnly; // Garanta que isso está sendo salvo

        // Camada de Destaque (Seleção) - Branca
        this.bg = scene.add.rectangle(0, 0, size - 2, size - 2, 0xffffff, 1).setOrigin(0.5).setAlpha(0);
        
        // Camada de Sucesso (Completar linha/bloco) - Verde
        this.successBg = scene.add.rectangle(0, 0, size - 2, size - 2, 0x00ff00, 1).setOrigin(0.5).setAlpha(0);
        
        // Estética: Números bloqueados (fixos) geralmente são brancos ou azul escuro
        // Números que o jogador coloca são de outra cor (ex: amarelo)
        const textColor = isReadOnly ? '#ffffff' : '#ffff00'; 
        
        this.text = scene.add.text(0, 0, value !== 0 ? value : '', {
            fontSize: `${Math.floor(size * 0.6)}px`,
            color: textColor,
            fontStyle: 'bold',
            fontFamily: 'Montserrat'
        }).setOrigin(0.5);

        this.add([this.bg, this.successBg, this.text]);
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
        this.bg.setAlpha(active ? 0.15 : 0);
    }

    playSuccessAnimation(delay = 0) {
        // Delega a animação de brilho
        GameEffects.flash(this.scene, {
            delay: delay,
            onUpdate: (val) => {
                this.successBg.setAlpha(val);
            }
        });

        // Delega a animação de relevo (escala)
        GameEffects.scale(this.scene, {
            delay: delay,
            power: 0.2,
            onUpdate: (val) => {
                this.setScale(val);
            }
        });
    }
}