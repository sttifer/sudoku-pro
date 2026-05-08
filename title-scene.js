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

        // Display de Moedas no topo
        const coins = localStorage.getItem('sudoku_coins') || '0';
        this.add.text(width - 25, 40, `🪙 ${coins}`, {
            fontSize: '20px',
            fontFamily: 'Montserrat',
            fontStyle: 'bold',
            color: '#ffeb3b'
        }).setOrigin(1, 0.5);

        // Botão da Loja (Ícone)
        new MenuButton(this, 40, 40, '🛒', {
            width: 45,
            height: 45,
            fontSize: '24px',
            color: 0x1a1a1a,
            strokeColor: 0x444444,
            textOffsetY: -2,
            callback: () => {
                this.scene.start('ShopScene');
            }
        });

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