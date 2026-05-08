const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#1a1a1a',
    resolution: window.devicePixelRatio || 1,
    render: { antialias: true, roundPixels: true },
    autoRound: true,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [TitleScene, StageSelectScene, ContinueScene, GameScene, GameOverScene, ShopScene]
};

const game = new Phaser.Game(config);