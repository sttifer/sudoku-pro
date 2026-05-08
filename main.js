// Calcula a dimensão ideal:
// Se a tela é mais alta que larga (celular), calculamos a altura proporcional à largura de 540
// Se for PC (mais larga), travamos no 9:16 (960 de altura)
const isPortrait = window.innerHeight > window.innerWidth;
const gameWidth = 540;
const gameHeight = isPortrait ? (window.innerHeight / window.innerWidth) * gameWidth : 960;

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: gameWidth,
    height: gameHeight,
    backgroundColor: '#1a1a1a',
    resolution: window.devicePixelRatio || 1,
    render: { antialias: true, roundPixels: true },
    autoRound: true,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [TitleScene, StageSelectScene, ContinueScene, GameScene, GameOverScene, ShopScene]
};

const game = new Phaser.Game(config);