class ContinueScene extends Phaser.Scene {
    constructor() {
        super('ContinueScene');
    }

    create() {
        const { width, height } = this.scale;

        GameBackground.init(this);

        const fontSize = Math.floor(width * 0.08);
        this.add.text(width / 2, height * 0.2, 'PARTIDA\nENCONTRADA', {
            fontSize: `${fontSize}px`,
            fontStyle: 'bold',
            fill: '#ffffff',
            fontFamily: 'Montserrat',
            align: 'center'
        }).setOrigin(0.5);

        const spacing = height * 0.12;

        // Botão para Continuar
        new MenuButton(this, width / 2, height * 0.55, 'CONTINUAR', {
            width: width * 0.85,
            height: width * 0.17,
            fontSize: `${Math.floor(width * 0.07)}px`,
            strokeColor: 0x4caf50,
            callback: () => {
                const saveData = JSON.parse(localStorage.getItem('sudoku_save'));
                this.scene.start('GameScene', { saveData });
            }
        });

        // Botão para Novo Jogo
        new MenuButton(this, width / 2, height * 0.55 + spacing, 'NOVO JOGO', {
            width: width * 0.85,
            height: width * 0.17,
            fontSize: `${Math.floor(width * 0.07)}px`,
            strokeColor: 0xff9800,
            callback: () => {
                localStorage.removeItem('sudoku_save');
                this.scene.start('StageSelectScene');
            }
        });

        // Botão Voltar
        const btnSize = width * 0.13;
        const margin = width * 0.05;
        const headerX = margin + (btnSize / 2);
        const headerY = height * 0.05;
        new BackButton(this, headerX, headerY, '←', 'TitleScene');
    }
}