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

        // --- SEÇÃO: UTILITÁRIOS ---
        this.add.text(width / 2, 180, 'RECURSOS', { fontSize: '14px', color: '#888888', fontStyle: 'bold' }).setOrigin(0.5);

        const hintPrice = 100;
        new MenuButton(this, width / 2, 220, `💡 +3   🪙 ${hintPrice}`, {
            width: 220,
            height: 50,
            fontSize: '18px',
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

        // --- SEÇÃO: DIFICULDADES ---
        this.add.text(width / 2, 300, 'DESBLOQUEAR NÍVEIS', { fontSize: '14px', color: '#888888', fontStyle: 'bold' }).setOrigin(0.5);

        const levels = [
            { label: 'FÁCIL', value: 3, price: 100 },
            { label: 'MÉDIO', value: 5, price: 500 },
            { label: 'DIFÍCIL', value: 7, price: 2000 },
            { label: 'ESPECIALISTA', value: 9, price: 8000 }
        ];

        let startY = 350;
        levels.forEach(lvl => {
            const isUnlocked = localStorage.getItem(`sudoku_unlocked_${lvl.value}`) === 'true';
            const btnText = isUnlocked ? `${lvl.label} (ADQUIRIDO)` : `${lvl.label}   🪙 ${lvl.price}`;
            const currentCoins = parseInt(localStorage.getItem('sudoku_coins') || '0');

            new MenuButton(this, width / 2, startY, btnText, {
                width: 280,
                height: 45,
                fontSize: '15px',
                strokeColor: isUnlocked ? 0x333333 : 0xff9800,
                textColor: isUnlocked ? '#666666' : '#ffffff',
                callback: () => {
                    if (isUnlocked) return;

                    if (currentCoins >= lvl.price) {
                        localStorage.setItem('sudoku_coins', (currentCoins - lvl.price).toString());
                        localStorage.setItem(`sudoku_unlocked_${lvl.value}`, 'true');
                        this.scene.restart();
                    } else {
                        this.cameras.main.shake(100, 0.005);
                    }
                }
            });
            startY += 55;
        });

        new MenuButton(this, width / 2, height - 100, 'VOLTAR', {
            width: 200,
            strokeColor: 0x999999,
            callback: () => this.scene.start('TitleScene')
        });
    }
}