class LifePowerUp extends Entity {
    constructor(x, y, spriteSheet, canvasWidth, canvasHeight) {
        super(x, y, 19, 22, spriteSheet, canvasWidth, canvasHeight);
        this.vy = 1.5; // Velocidade de queda do power-up
        this.spriteName = "life.png"; // Nome do sprite para a nova vida
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

    applyEffect() {
        ship.lives++; // Adiciona uma vida à nave
    }
}