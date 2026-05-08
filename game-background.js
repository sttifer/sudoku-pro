class GameBackground {
    static init(scene, baseDepth = -1) { // Adicionado parâmetro baseDepth
        const { width, height } = scene.scale;

        // 1. Fundo com Gradiente
        const bg = scene.add.graphics();
        bg.fillGradientStyle(0x1a1a1a, 0x1a1a1a, 0x0f2027, 0x0f2027, 1);
        bg.fillRect(0, 0, width, height);
        bg.setDepth(baseDepth); // Define a profundidade

        // 2. Padrão de Grade Sutil
        const grid = scene.add.graphics();
        grid.lineStyle(1, 0xffffff, 0.03); 
        const spacing = 50;
        for (let x = 0; x < width; x += spacing) {
            grid.lineBetween(x, 0, x, height); // Desenha as linhas verticais
        }
        for (let y = 0; y < height; y += spacing) {
            grid.lineBetween(0, y, width, y); // Desenha as linhas horizontais
        }
        grid.setDepth(baseDepth); // Define a profundidade

        // 3. Números decorativos
        ['1', '4', '9', '7', '3'].forEach(num => {
            scene.add.text(
                Phaser.Math.Between(50, width - 50), // Posição X aleatória
                Phaser.Math.Between(50, height - 50), // Posição Y aleatória
                num, { 
                fontFamily: 'Montserrat', fontSize: '120px', color: '#ffffff', fontStyle: 'bold' 
            }).setOrigin(0.5).setAlpha(0.03).setRotation(Phaser.Math.FloatBetween(-0.5, 0.5)).setDepth(baseDepth); // Define a profundidade
        });
    }
}