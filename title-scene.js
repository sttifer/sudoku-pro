class TitleScene extends Phaser.Scene {
    constructor() {
        super('TitleScene');
    }

    create() {
        const { width, height } = this.scale;

        // Aplica o fundo isolado
        GameBackground.init(this);

        // Título do Jogo
        const titleSize = Math.floor(width * 0.13); // Reduzido para um tamanho mais adequado
        this.add.text(width / 2, height * 0.2, 'SUDOKU PRO', {
            fontSize: `${titleSize}px`,
            fontStyle: '900',
            fill: '#00f3ff',
            fontFamily: 'Montserrat',
            shadow: { offsetX: 0, offsetY: 0, color: '#00f3ff', blur: 20, fill: true }
        }).setOrigin(0.5);

        // Display de Moedas no topo
        const coins = localStorage.getItem('sudoku_coins') || '0';
        const uiFontSize = Math.floor(width * 0.06);
        this.add.text(width - (width * 0.05), height * 0.05, `🪙 ${coins}`, {
            fontSize: `${uiFontSize}px`,
            fontFamily: 'Inter',
            fontStyle: 'bold',
            color: '#ffeb3b'
        }).setOrigin(1, 0.5);

        // Botão da Loja (Alinhado com o padrão de volta)
        const btnSize = width * 0.13;
        const margin = width * 0.05;
        const headerX = margin + (btnSize / 2);
        const headerY = height * 0.05;

        new MenuButton(this, headerX, headerY, '🛒', {
            width: btnSize,
            height: btnSize,
            fontSize: `${Math.floor(btnSize * 0.5)}px`,
            color: 0x1a1a1a,
            strokeColor: 0x444444,
            callback: () => {
                this.scene.start('ShopScene');
            }
        });

        new MenuButton(this, width / 2, height * 0.55, 'JOGAR', {
            width: width * 0.85,
            height: width * 0.17,
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