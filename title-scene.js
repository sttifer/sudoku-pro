class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    create() {
        const { width, height } = this.scale;

        // Aplica o fundo isolado
        GameBackground.init(this);

        // Título do Jogo
        const titleSize = Math.floor(width * 0.12);
        this.add.text(width / 2, height * 0.2, 'SUDOKU PRO', {
            fontSize: `${titleSize}px`,
            fontStyle: '900',
            fill: '#ffffff',
            fontFamily: 'Montserrat',
            shadow: { offsetX: 2, offsetY: 4, color: '#000', blur: 8, fill: true }
        }).setOrigin(0.5);

        // Display de Moedas no topo
        const coins = localStorage.getItem('sudoku_coins') || '0';
        const uiFontSize = Math.floor(width * 0.05);
        this.add.text(width - (width * 0.05), height * 0.05, `🪙 ${coins}`, {
            fontSize: `${uiFontSize}px`,
            fontFamily: 'Montserrat',
            fontStyle: 'bold',
            color: '#ffeb3b'
        }).setOrigin(1, 0.5);

        // Botão da Loja (Ícone)
        const btnSize = width * 0.12;
        new MenuButton(this, btnSize, height * 0.05, '🛒', {
            width: btnSize,
            height: btnSize,
            fontSize: `${Math.floor(btnSize * 0.5)}px`,
            color: 0x1a1a1a,
            strokeColor: 0x444444,
            textOffsetY: -2,
            callback: () => {
                this.scene.start('ShopScene');
            }
        });

        new MenuButton(this, width / 2, height / 2, 'JOGAR', {
            width: width * 0.6,
            fontSize: `${Math.floor(width * 0.07)}px`,
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