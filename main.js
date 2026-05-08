const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: 450,
    height: 800,
    backgroundColor: '#1a1a1a',
    resolution: window.devicePixelRatio || 1,
    render: { antialias: true, roundPixels: true },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [TitleScene, StageSelectScene, ContinueScene, GameScene, GameOverScene, ShopScene]
};

const game = new Phaser.Game(config);