class Yellow extends Entity {
    constructor(x, y, spriteSheet, canvasWidth, canvasHeight) {
        super(x, y, undefined, undefined, spriteSheet, canvasWidth, canvasHeight);
        this.vx = 3;
        this.vy = 3;
        this.directionY = 1;
        this.spriteName = "yellow.png";
        this.exploding = false;
        this.explosionFrame = 0;
        this.explosionDelay = 0;
        this.explosionMaxDelay = 10;
        this.translateOffset = 0;  // Inicializa um deslocamento de translação
    }

    update() {
        super.update();
        if (!this.exploding) {
            this.x += this.vx;
            this.y += this.vy * this.directionY;

            // Atualiza a translação visual sem mudar a posição lógica
            this.translateOffset = (Math.sin(this.x * 0.05) * 10);  // Cria um efeito de ondulação

            if (this.y + this.height >= this.canvasHeight || this.y <= 0) {
                this.directionY *= -1;
                this.y = Math.max(0, Math.min(this.y, this.canvasHeight - this.height));
            }

            this.screenWrap();
        } else {
            this.updateExplosion();
        }
    }

    draw(context) {
        context.save();  // Salva o contexto atual
        context.translate(this.translateOffset, 0);  // Aplica uma translação horizontal baseada no offset
        this.spriteSheet.drawFrame(context, this.spriteName, this.x, this.y);
        context.restore();  // Restaura o contexto para o estado anterior
    }

    updateExplosion() {
        if (this.explosionFrame < 4) {
            if (this.explosionDelay >= this.explosionMaxDelay) {
                this.spriteName = `YELLOW_EXPLODIR_${this.explosionFrame + 1}.png`;
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
        this.vy = 0;
        this.explosionFrame = 0;
        this.explosionDelay = 0;
    }
}
