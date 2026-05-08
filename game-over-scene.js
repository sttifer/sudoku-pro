class GameOverScene extends Phaser.Scene {
    constructor() {
        super('GameOverScene');
    }

    init(data) {
        // Recupera os dados enviados pela GameScene
        this.resultMessage = data.message || "FIM DE JOGO";
        this.resultColor = data.color || "#ffffff";
        this.isWin = data.isWin || false;
        this.reward = 0;

        if (this.isWin) {
            // Tabela de recompensas progressiva
            const rewardTable = {
                1: 20,   // Muito Fácil
                3: 50,   // Fácil
                5: 100,  // Médio
                7: 200,  // Difícil
                9: 500   // Especialista
            };
            this.reward = rewardTable[data.difficulty] || 100;
            this.updateCoins(this.reward);
        }
    }

    updateCoins(amount) {
        const currentCoins = parseInt(localStorage.getItem('sudoku_coins') || '0');
        localStorage.setItem('sudoku_coins', (currentCoins + amount).toString());
    }

    create() {
        const { width, height } = this.scale;

        // 1. Aplica o fundo padrão (Wallpaper)
        GameBackground.init(this);

        // 2. Garante a remoção do save ao entrar nesta tela (Segurança extra)
        localStorage.removeItem('sudoku_save');

        // Texto de Resultado (Vitória/Derrota)
        const titleSize = Math.floor(width * 0.12);
        this.add.text(width / 2, height * 0.25, this.resultMessage, {
            fontSize: `${titleSize}px`,
            fontStyle: '900',
            fill: this.resultColor,
            fontFamily: 'Montserrat'
        }).setOrigin(0.5);

        // Exibição da Recompensa
        if (this.isWin) {
            this.add.text(width / 2, height * 0.35, `+${this.reward} MOEDAS`, {
                fontSize: `${Math.floor(width * 0.07)}px`,
                color: '#ffeb3b',
                fontFamily: 'Montserrat',
                fontStyle: 'bold'
            }).setOrigin(0.5);
        }

        new MenuButton(this, width / 2, height * 0.6, 'JOGAR NOVAMENTE', {
            width: width * 0.8,
            height: width * 0.17,
            fontSize: `${Math.floor(width * 0.07)}px`,
            strokeColor: 0x999999,
            callback: () => {
                this.scene.start('TitleScene'); // Volta para a tela de título
            }
        }).setDepth(2); // Garante que o botão fique acima do overlay
    }
}