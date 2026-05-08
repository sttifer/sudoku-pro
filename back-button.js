class BackButton extends MenuButton {
    /**
     * Cria um botão de "Voltar" com o estilo padrão do botão de gameplay (seta '←'),
     * mas permitindo personalização de texto e posição.
     * @param {Phaser.Scene} scene A cena atual.
     * @param {number} x A posição X do botão.
     * @param {number} y A posição Y do botão.
     * @param {string} text O texto a ser exibido no botão (ex: '←' ou 'VOLTAR').
     * @param {string} targetScene A chave da cena para a qual o botão deve navegar.
     * @param {object} [options={}] Opções para sobrescrever o estilo padrão.
     */
    constructor(scene, x, y, text, targetScene, options = {}) {
        const { width } = scene.scale;
        const baseBtnSize = width * 0.13; // Tamanho padronizado (aprox 70px)

        const defaultStyleOptions = {
            width: baseBtnSize, // Largura padrão (pode ser sobrescrita)
            height: baseBtnSize, // Altura padrão (pode ser sobrescrita)
            fontSize: `${Math.floor(baseBtnSize * 0.55)}px`, // Aumentado para 55% para melhor preenchimento
            color: 0x1a1a1a,
            strokeColor: 0x333333,
            textColor: '#777777',
            callback: () => {
                if (scene.scene.key === 'GameScene' && typeof scene.saveGame === 'function') {
                    scene.saveGame();
                }
                scene.scene.start(targetScene);
            }
        };

        const mergedOptions = { ...defaultStyleOptions, ...options };

        super(scene, x, y, text, mergedOptions);
    }
}