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

        // 1. Aplica o fundo padrão (Wallpaper)
        GameBackground.init(this);

        // 2. Garante a remoção do save ao entrar nesta tela (Segurança extra)
        localStorage.removeItem('sudoku_save');

        // Texto de Resultado (Vitória/Derrota)
        this.add.text(width / 2, height * 0.2, this.resultMessage, {
            fontSize: '54px',
            fontStyle: '900',
            fill: this.resultColor,
            fontFamily: 'Montserrat'
        }).setOrigin(0.5);

        new MenuButton(this, width / 2, height / 2, 'JOGAR NOVAMENTE', {
            width: 250,      // Botão um pouco mais estreito
            scale: 1,
            strokeColor: 0x999999,
            callback: () => {
                this.scene.start('TitleScene'); // Volta para a tela de título
            }
        }).setDepth(2); // Garante que o botão fique acima do overlay
    }
}