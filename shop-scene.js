class ShopScene extends Phaser.Scene {
    constructor() {
        super('ShopScene');
    }

    create() {
        const { width, height } = this.scale;
        GameBackground.init(this);

        this.add.text(width / 2, 80, 'LOJA', {
            fontSize: '40px',
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Montserrat'
        }).setOrigin(0.5);

        const coins = localStorage.getItem('sudoku_coins') || '0';
        this.add.text(width / 2, 130, `SUAS MOEDAS: 🪙 ${coins}`, {
            fontSize: '18px',
            color: '#ffeb3b',
            fontFamily: 'Montserrat'
        }).setOrigin(0.5);

        // Exemplo de Item da Loja: Pacote de Dicas
        const hintPrice = 150;
        new MenuButton(this, width / 2, 250, `💡 +3   🪙 ${hintPrice}`, {
            width: 220,
            strokeColor: 0x4caf50,
            callback: () => {
                const currentCoins = parseInt(localStorage.getItem('sudoku_coins') || '0');
                if (currentCoins >= hintPrice) {
                    localStorage.setItem('sudoku_coins', currentCoins - hintPrice);
                    let hints = parseInt(localStorage.getItem('sudoku_hints') || '0');
                    localStorage.setItem('sudoku_hints', hints + 3);
                    this.scene.restart(); // Atualiza a tela
                } else {
                    this.cameras.main.shake(100, 0.005);
                }
            }
        });

        new MenuButton(this, width / 2, height - 100, 'VOLTAR', {
            width: 200,
            strokeColor: 0x999999,
            callback: () => this.scene.start('TitleScene')
        });
    }
}