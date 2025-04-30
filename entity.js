class Entity {
    constructor(x, y, width, height, spriteSheet, canvasWidth, canvasHeight) {
        this.x = x;
        this.y = y;
        this.width = width || 40; // valor padrão do json
        this.height = height || 32; // valor padrão do json
        this.spriteSheet = spriteSheet;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
    }

    update() {
        // Método que será sobreescrito pelas subclasses
    }

    draw(context) {// Método genérico para desenhar uma entidade usando o nome do arquivo de sprite fornecido pelas subclasses
        this.spriteSheet.drawFrame(context, this.spriteName, this.x, this.y);
    }

    collidesWith(other) {
        return this.x < other.x + other.width &&
                this.x + this.width > other.x &&
                this.y < other.y + other.height &&
                this.y + this.height > other.y;
    }

    screenWrap() {
        if (this.x < -this.width) this.x = this.canvasWidth;
        else if (this.x > this.canvasWidth) this.x = 0;

        if (this.y < 0) this.y = this.canvasHeight;
        else if (this.y > this.canvasHeight) this.y = 0;
    }
}