class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    create() {
        const { width, height } = this.scale;

        // Título do Jogo
        this.add.text(width / 2, height * 0.2, 'SUDOKU PRO', {
            fontSize: '48px',
            fontStyle: 'bold',
            fill: '#ffffff',
            fontFamily: 'Verdana'
        }).setOrigin(0.5);

        new MenuButton(this, width / 2, height / 2, 'JOGAR', {
            width: 250,      // Botão um pouco mais estreito
            scale: 1,      // Escala menor para hierarquia visual
            strokeColor: 0x999999,
            callback: () => {
                this.scene.start('StageSelectScene');
            }
        });
    }
}