class StageSelectScene extends Phaser.Scene {
    constructor() {
        super('StageSelectScene');
    }

    create() {
        const { width, height } = this.cameras.main;

        // Aplica o fundo isolado
        GameBackground.init(this);

        // Título
        this.add.text(width / 2, 80, 'DIFICULDADE', {
            fontSize: '40px',
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

        let startY = 180;
        const spacing = 85;

        // Cria os botões de dificuldade usando a nova classe MenuButton
        difficulties.forEach((diff) => {
            // A primeira dificuldade (1) é sempre aberta. As outras dependem da loja.
            const isUnlocked = diff.value === 1 || localStorage.getItem(`sudoku_unlocked_${diff.value}`) === 'true';
            
            new MenuButton(this, width / 2, startY, isUnlocked ? diff.label : `🔒 ${diff.label}`, {
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

        // Botão de Voltar usando a nova classe MenuButton
        new MenuButton(this, width / 2, height - 100, 'VOLTAR', {
            width: 250,      // Botão um pouco mais estreito
            scale: 0.8,      // Escala menor para hierarquia visual
            strokeColor: 0x999999,
            callback: () => {
                this.scene.start('TitleScene');
            }
        });
    }
}