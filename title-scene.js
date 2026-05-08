class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    create() {
        const { width, height } = this.scale;

        // Aplica o fundo isolado
        GameBackground.init(this);

        // Título do Jogo
        this.add.text(width / 2, height * 0.2, 'SUDOKU PRO', {
            fontSize: '52px',
            fontStyle: '900',
            fill: '#ffffff',
            fontFamily: 'Montserrat',
            shadow: { offsetX: 2, offsetY: 4, color: '#000', blur: 8, fill: true }
        }).setOrigin(0.5);

        new MenuButton(this, width / 2, height / 2, 'JOGAR', {
            width: 250,      // Botão um pouco mais estreito
            scale: 1,      // Escala menor para hierarquia visual
            strokeColor: 0x999999,
            callback: () => {
                const save = localStorage.getItem('sudoku_save');
                if (save) {
                    this.scene.start('ContinueScene');
                } else {
                    this.scene.start('StageSelectScene');
                }
            }
        });
    }
}