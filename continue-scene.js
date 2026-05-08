class ContinueScene extends Phaser.Scene {
    constructor() {
        super('ContinueScene');
    }

    create() {
        const { width, height } = this.scale;

        GameBackground.init(this);

        const fontSize = Math.floor(width * 0.08);
        this.add.text(width / 2, height * 0.25, 'PARTIDA\nENCONTRADA', {
            fontSize: `${fontSize}px`,
            fontStyle: 'bold',
            fill: '#ffffff',
            fontFamily: 'Montserrat',
            align: 'center'
        }).setOrigin(0.5);

        // Botão para Continuar
        new MenuButton(this, width / 2, height / 2 - 40, 'CONTINUAR', {
            strokeColor: 0x4caf50,
            callback: () => {
                const saveData = JSON.parse(localStorage.getItem('sudoku_save'));
                this.scene.start('GameScene', { saveData });
            }
        });

        // Botão para Novo Jogo
        new MenuButton(this, width / 2, height / 2 + 60, 'NOVO JOGO', {
            strokeColor: 0xff9800,
            callback: () => {
                localStorage.removeItem('sudoku_save');
                this.scene.start('StageSelectScene');
            }
        });

        // Botão Voltar
        // Padronização: Botão de voltar com o ícone de setinha no canto superior
        const btnSize = Math.max(40, width * 0.1);
        new BackButton(this, btnSize, btnSize, '←', 'TitleScene');
    }
}