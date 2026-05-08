class MenuButton extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text, options = {}) {
        super(scene, x, y);

        this.config = {
            width: options.width || 300,
            height: options.height || 60,
            color: options.color || 0x333333,
            strokeColor: options.strokeColor || 0xffffff,
            strokeWidth: options.strokeWidth || 2,
            fontSize: options.fontSize || '22px',
            textColor: options.textColor || '#ffffff',
            scale: options.scale || 1,
            textOffsetX: options.textOffsetX || 0,
            textOffsetY: options.textOffsetY !== undefined ? options.textOffsetY : -Math.floor((options.height || 60) * 0.05),
            callback: options.callback || (() => {})
        };

        this.setScale(this.config.scale);

        // Usamos Graphics para permitir bordas arredondadas
        this.bg = scene.add.graphics();
        this.drawButton(this.config.color);
        
        this.label = scene.add.text(this.config.textOffsetX, this.config.textOffsetY, text, {
            fontSize: this.config.fontSize,
            color: this.config.textColor,
            fontStyle: 'bold',
            fontFamily: 'Inter'
        }).setOrigin(0.5);

        this.add([this.bg, this.label]);

        // Define a área interativa manualmente para o Graphics
        const hitArea = new Phaser.Geom.Rectangle(-this.config.width/2, -this.config.height/2, this.config.width, this.config.height);
        this.bg.setInteractive(hitArea, Phaser.Geom.Rectangle.Contains).setCursorHandler;

        const hoverColor = Phaser.Display.Color.ValueToColor(this.config.color).lighten(10).color;

        this.bg.on('pointerover', () => {
            this.drawButton(hoverColor);
            this.setScale(this.config.scale * 1.02);
        });

        this.bg.on('pointerout', () => {
            this.drawButton(this.config.color);
            this.setScale(this.config.scale);
        });

        this.bg.on('pointerdown', () => {
            scene.tweens.add({
                targets: this,
                scale: this.config.scale * 0.98,
                duration: 80,
                yoyo: true,
                onComplete: this.config.callback
            });
        });

        scene.add.existing(this);
    }

    drawButton(color) {
        this.bg.clear();
        this.bg.fillStyle(color, 1);
        this.bg.lineStyle(this.config.strokeWidth, this.config.strokeColor);
        // 20 é o raio do arredondamento das pontas
        this.bg.fillRoundedRect(-this.config.width/2, -this.config.height/2, this.config.width, this.config.height, 20);
        this.bg.strokeRoundedRect(-this.config.width/2, -this.config.height/2, this.config.width, this.config.height, 20);
    }
}