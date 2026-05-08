class ShopScene extends Phaser.Scene {
    constructor() {
        super('ShopScene');
    }

    create() {
        const { width, height } = this.scale;
        GameBackground.init(this);

        const titleSize = Math.floor(width * 0.12);
        this.add.text(width / 2, height * 0.12, 'LOJA', {
            fontSize: `${titleSize}px`,
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Montserrat'
        }).setOrigin(0.5);

        const coins = localStorage.getItem('sudoku_coins') || '0';
        this.add.text(width / 2, height * 0.19, `SUAS MOEDAS: 🪙 ${coins}`, {
            fontSize: `${Math.floor(width * 0.05)}px`,
            color: '#ffeb3b',
            fontFamily: 'Montserrat'
        }).setOrigin(0.5);

        // --- SEÇÃO: UTILITÁRIOS ---
        this.add.text(width / 2, height * 0.27, 'RECURSOS', { fontSize: `${Math.floor(width * 0.045)}px`, color: '#888888', fontStyle: 'bold', fontFamily: 'Montserrat' }).setOrigin(0.5);

        const hintPrice = 100;
        new MenuButton(this, width / 2, height * 0.35, `💡 +3   🪙 ${hintPrice}`, {
            width: width * 0.85,
            height: width * 0.17,
            fontSize: `${Math.floor(width * 0.07)}px`,
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
        this.add.text(width / 2, height * 0.48, 'DESBLOQUEAR NÍVEIS', { fontSize: `${Math.floor(width * 0.045)}px`, color: '#888888', fontStyle: 'bold', fontFamily: 'Montserrat' }).setOrigin(0.5);

        const levels = [
            { label: 'FÁCIL', value: 3, price: 100 },
            { label: 'MÉDIO', value: 5, price: 500 },
            { label: 'DIFÍCIL', value: 7, price: 2000 },
            { label: 'ESPECIALISTA', value: 9, price: 8000 }
        ];

        let startY = height * 0.57;
        const spacing = height * 0.09;
        levels.forEach(lvl => {
            const isUnlocked = localStorage.getItem(`sudoku_unlocked_${lvl.value}`) === 'true';
            const btnText = isUnlocked ? `${lvl.label} ✔` : `${lvl.label}  🪙 ${lvl.price}`;
            const currentCoins = parseInt(localStorage.getItem('sudoku_coins') || '0');

            new MenuButton(this, width / 2, startY, btnText, {
                width: width * 0.85,
                height: width * 0.14,
                fontSize: `${Math.floor(width * 0.06)}px`,
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
            startY += spacing;
        });

        // Alinhamento fixo do botão voltar
        const btnSize = width * 0.13;
        const margin = width * 0.05;
        const headerX = margin + (btnSize / 2);
        const headerY = height * 0.05;
        new BackButton(this, headerX, headerY, '←', 'TitleScene');
    }
}