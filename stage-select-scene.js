class StageSelectScene extends Phaser.Scene {
    constructor() {
        super('StageSelectScene');
    }

    create() {
        const { width, height } = this.cameras.main;

        // Fundo
        this.add.rectangle(0, 0, width, height, 0x1a1a1a).setOrigin(0);

        // Título
        this.add.text(width / 2, 80, 'DIFICULDADE', {
            fontSize: '40px',
            color: '#ffffff',
            fontStyle: 'bold',
            fontFamily: 'Arial'
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
            new MenuButton(this, width / 2, startY, diff.label, {
                strokeColor: diff.color,
                callback: () => {
                    this.scene.start('GameScene', { difficulty: diff.value });
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