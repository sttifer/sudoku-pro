class StageSelectScene extends Phaser.Scene {
    constructor() {
        super('StageSelectScene');
    }

    create() {
        const { width, height } = this.scale;

        // Aplica o fundo isolado
        GameBackground.init(this);

        // Título
        const titleSize = Math.floor(width * 0.1);
        this.add.text(width / 2, height * 0.15, 'DIFICULDADE', {
            fontSize: `${titleSize}px`,
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Montserrat'
        }).setOrigin(0.5);

        // Mapeamento das dificuldades (1, 3, 5, 7, 9)
        const difficulties = [
            { label: 'MUITO FÁCIL', value: 1, color: 0x4caf50 },
            { label: 'FÁCIL',       value: 3, color: 0x8bc34a },
            { label: 'MÉDIO',       value: 5, color: 0xffeb3b },
            { label: 'DIFÍCIL',     value: 7, color: 0xff9800 },
            { label: 'ESPECIALISTA', value: 9, color: 0xf44336 }
        ];

        let startY = height * 0.32;
        const spacing = height * 0.12;

        // Cria os botões de dificuldade usando a nova classe MenuButton
        difficulties.forEach((diff) => {
            // A primeira dificuldade (1) é sempre aberta. As outras dependem da loja.
            const isUnlocked = diff.value === 1 || localStorage.getItem(`sudoku_unlocked_${diff.value}`) === 'true';
            
            new MenuButton(this, width / 2, startY, isUnlocked ? diff.label : `🔒 ${diff.label}`, {
                width: width * 0.85,
                height: width * 0.17,
                fontSize: `${Math.floor(width * 0.07)}px`,
                strokeColor: isUnlocked ? diff.color : 0x444444,
                textColor: isUnlocked ? '#ffffff' : '#777777',
                callback: () => {
                    if (isUnlocked) {
                        this.scene.start('GameScene', { difficulty: diff.value });
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