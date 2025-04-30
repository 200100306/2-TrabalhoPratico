class Bullet extends Entity {
    constructor(x, y, spriteSheet, canvasWidth, canvasHeight, vx = 0, vy = -10) {
        super(x, y, 16, 20, spriteSheet, canvasWidth, canvasHeight);
        this.vx = vx; // Velocidade horizontal adicionada para balas anguladas
        this.vy = vy; // Velocidade vertical padrão da bala (negativa para subir)
        this.canvasHeight = canvasHeight;
        this.spriteName = "bullet.png";
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.y + this.height < 0 || this.x < 0 || this.x > this.canvasWidth) {
            this.removeFromGame();
        }
    }

    draw(context) {
        super.draw(context);
    }

    removeFromGame() { // Remove a bala da lista de entidades
        const index = entities.indexOf(this);
        if (index > -1) {entities.splice(index, 1);}
    }
}
