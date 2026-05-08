class GameEffects {
    /**
     * Efeito de "Salto/Relevo"
     * Retorna valores de escala (ex: 1.0 -> 1.2 -> 1.0)
     */
    static scale(scene, { onUpdate, delay = 0, duration = 200, power = 0.08 }) {
        return scene.tweens.addCounter({
            from: 1,
            to: 1 + power,
            duration: duration,
            yoyo: true,
            delay: delay,
            ease: 'Quad.easeOut',
            onUpdate: (tween) => onUpdate(tween.getValue())
        });
    }

    /**
     * Efeito de "Brilho/Flash"
     * Retorna valores de opacidade/intensidade
     */
    static flash(scene, { onUpdate, delay = 0, duration = 300 }) {
        return scene.tweens.addCounter({
            from: 0,
            to: 0.3,
            duration: duration,
            yoyo: true,
            delay: delay,
            onUpdate: (tween) => onUpdate(tween.getValue())
        });
    }
}