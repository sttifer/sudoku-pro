class ContinueScene extends Phaser.Scene {
    constructor() {
        super('ContinueScene');
    }

    create() {
        const { width, height } = this.scale;

        GameBackground.init(this);

        this.add.text(width / 2, height * 0.2, 'PARTIDA ENCONTRADA', {
            fontSize: '32px',
            fontStyle: 'bold',
            fill: '#ffffff',
            fontFamily: 'Montserrat'
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
        new MenuButton(this, width / 2, height - 100, 'VOLTAR', {
            width: 200,
            scale: 0.8,
            strokeColor: 0x999999,
            callback: () => {
                this.scene.start('TitleScene');
            }
        });
    }
}