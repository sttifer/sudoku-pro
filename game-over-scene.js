class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        // Recupera os dados enviados pela GameScene
        this.resultMessage = data.message || "FIM DE JOGO";
        this.resultColor = data.color || "#ffffff";
    }

    create() {
        const { width, height } = this.scale;

        // Fundo semitransparente para dar foco ao texto
        this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.8);

        // Texto de Resultado (Vitória/Derrota)
        this.add.text(width / 2, height * 0.2, this.resultMessage, {
            fontSize: '54px',
            fontStyle: 'bold',
            fill: this.resultColor,
            fontFamily: 'Verdana'
        }).setOrigin(0.5);

        new MenuButton(this, width / 2, height / 2, 'JOGAR NOVAMENTE', {
            width: 250,      // Botão um pouco mais estreito
            scale: 1,
            strokeColor: 0x999999,
            callback: () => {
                this.scene.start('TitleScene');
            }
        });
    }
}