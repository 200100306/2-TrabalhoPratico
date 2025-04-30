class Green extends Entity {
    constructor(x, y, spriteSheet, canvasWidth, canvasHeight) {
        super(x, y, undefined, undefined, spriteSheet, canvasWidth, canvasHeight);
        this.vx = 2;
        this.amplitude = 5;
        this.frequency = 0.05;
        this.spriteName = "green.png";
        this.exploding = false;
        this.explosionFrame = 0;
        this.explosionDelay = 0;
        this.explosionMaxDelay = 10;
    }

    update() {
        if (!this.exploding) {
            super.update();
            this.x += this.vx;
            this.y += this.amplitude * Math.sin(this.frequency * this.x);
            this.screenWrap();
        } else {
            this.updateExplosion();
        }
    }

    updateExplosion() {
        if (this.explosionFrame < 4) {
            if (this.explosionDelay >= this.explosionMaxDelay) {
                this.spriteName = `GREEN_EXPLODIR_${this.explosionFrame + 1}.png`;
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
        this.explosionFrame = 0;
        this.explosionDelay = 0;
    }
}