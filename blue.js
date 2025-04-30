class Blue extends Entity {
    constructor(x, y, spriteSheet, canvasWidth, canvasHeight) {
        super(x, y, undefined, undefined, spriteSheet, canvasWidth, canvasHeight);
        this.vx = 1.5;
        this.vy = 1.5;
        this.changeDirectionInterval = 60; // Intervalo para mudar de direção
        this.changeDirectionCounter = 0; // Contador para controlar o intervalo
        this.spriteName = "blue.png";
        this.exploding = false;
        this.explosionFrame = 0;
        this.explosionDelay = 0;
        this.explosionMaxDelay = 10;
    }

    update() {
        if (!this.exploding) {
            super.update();

            // Alterar a direção em intervalos aleatórios
            this.changeDirectionCounter++;
            if (this.changeDirectionCounter >= this.changeDirectionInterval) {
                this.changeDirectionCounter = 0;
                this.vx = (Math.random() - 0.5) * 4; // Nova velocidade aleatória x
                this.vy = (Math.random() - 0.5) * 4; // Nova velocidade aleatória y
            }

            this.x += this.vx;
            this.y += this.vy;

            // Limites de tela
            if (this.x <= 0 || this.x + this.width >= this.canvasWidth) {
                this.vx = -this.vx;
            }
            if (this.y <= 0 || this.y + this.height >= this.canvasHeight) {
                this.vy = -this.vy;
            }

            this.screenWrap();
        } else {
            this.updateExplosion();
        }
    }

    updateExplosion() {
        if (this.explosionFrame < 4) {
            if (this.explosionDelay >= this.explosionMaxDelay) {
                this.spriteName = `BLUE_EXPLODIR_${this.explosionFrame + 1}.png`;
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
