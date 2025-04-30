class Red extends Entity {
    constructor(x, y, spriteSheet, canvasWidth, canvasHeight) {
        super(x, y, undefined, undefined, spriteSheet, canvasWidth, canvasHeight);
        this.vx = (Math.random() < 0.5 ? 1 : -1) * (2 + Math.random() * 2);
        this.spriteName = "red.png";
        this.exploding = false;
        this.explosionFrame = 0;
        this.explosionDelay = 0;
        this.explosionMaxDelay = 10;
        this.rotation = 0;  // Inicia o ângulo de rotação como 0
    }

    update() {
        if (!this.exploding) {
            super.update();
            this.x += this.vx;
            this.rotation += 0.05;  // Incrementa o ângulo de rotação

            if (this.x <= 0 || this.x + this.width >= this.canvasWidth || Math.random() < 0.01) {
                this.vx = -this.vx;
            }

            this.screenWrap();
        } else {
            this.updateExplosion();
        }
    }

    draw(context) {
        context.save();  // Salva o estado atual do contexto
        context.translate(this.x + this.width / 2, this.y + this.height / 2);  // Muda o centro de rotação para o centro do sprite
        context.rotate(this.rotation);  // Aplica a rotação
        context.translate(-this.width / 2, -this.height / 2);  // Corrige a posição após rotação
        this.spriteSheet.drawFrame(context, this.spriteName, 0, 0);  // Desenha o sprite com novas coordenadas
        context.restore();  // Restaura o estado original do contexto
    }

    updateExplosion() {
        if (this.explosionFrame < 4) {
            if (this.explosionDelay >= this.explosionMaxDelay) {
                this.spriteName = `RED_EXPLODIR_${this.explosionFrame + 1}.png`;
                this.explosionFrame++;
                this.explosionDelay = 0;
            } else {
                this.explosionDelay++;
            }
        } else {
            this.remove = true;
        }
    }

    explode() {
        this.exploding = true;
        this.vx = 0;
        this.rotation = 0;  // Reseta a rotação na explosão
        this.explosionFrame = 0;
        this.explosionDelay = 0;
    }
}
