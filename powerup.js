class PowerUp extends Entity {
    constructor(x, y, spriteSheet, canvasWidth, canvasHeight) {
        super(x, y, 18, 20, spriteSheet, canvasWidth, canvasHeight);
        this.vy = 1.5; // Velocidade de queda do power-up
        this.spriteName = "powerup.png"; // Define o nome do sprite para uso no método draw
    }

    update() {
        super.update();
        this.y += this.vy; // Faz o power-up cair
        if (this.y > this.canvasHeight) {this.removeFromGame();}
    }

    draw(context) {
        super.draw(context); // Chamada ao método de desenho da superclasse
    }

    removeFromGame() {
        const index = entities.indexOf(this);
        if (index > -1) {
            entities.splice(index, 1); // Remove o power-up da lista de entidades
        }
    }
}