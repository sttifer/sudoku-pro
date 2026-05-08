class MenuButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text, options = {}) {
        super(scene, x, y);

        const config = {
            width: options.width || 300,
            height: options.height || 60,
            color: options.color || 0x333333,
            strokeColor: options.strokeColor || 0xffffff,
            strokeWidth: options.strokeWidth || 2,
            fontSize: options.fontSize || '22px',
            textColor: options.textColor || '#ffffff',
            scale: options.scale || 1,
            callback: options.callback || (() => {})
        };

        this.setScale(config.scale);

        this.bg = scene.add.rectangle(0, 0, config.width, config.height, config.color)
            .setStrokeStyle(config.strokeWidth, config.strokeColor);
        
        this.label = scene.add.text(0, 0, text, {
            fontSize: config.fontSize,
            color: config.textColor,
            fontStyle: 'bold',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        this.add([this.bg, this.label]);

        this.bg.setInteractive({ useHandCursor: true });

        // --- CORREÇÃO AQUI ---
        // Criamos um objeto de cor do Phaser para manipular o brilho
        const baseColor = Phaser.Display.Color.ValueToColor(config.color);
        const hoverColor = Phaser.Display.Color.ValueToColor(config.color).lighten(20).color;

        this.bg.on('pointerover', () => {
            this.bg.setFillStyle(hoverColor);
            this.setScale(config.scale * 1.05);
        });

        this.bg.on('pointerout', () => {
            this.bg.setFillStyle(config.color);
            this.setScale(config.scale);
        });
        // ---------------------

        this.bg.on('pointerdown', () => {
            scene.tweens.add({
                targets: this,
                scale: config.scale * 0.95,
                duration: 50,
                yoyo: true,
                onComplete: config.callback
            });
        });

        scene.add.existing(this);
    }
}