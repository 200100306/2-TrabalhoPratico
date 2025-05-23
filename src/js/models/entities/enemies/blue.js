import { Entity } from "../entity.js";

/**
 * Representa um inimigo do tipo Azul.
 * Move-se de forma aleatória e explode ao colidir ou ser atingido.
 */
export class Blue extends Entity {
  /**
   * @param {number} x - Posição inicial X
   * @param {number} y - Posição inicial Y
   * @param {SpriteSheet} spriteSheet - Spritesheet do inimigo
   * @param {number} canvasWidth - Largura do canvas
   * @param {number} canvasHeight - Altura do canvas
   */
  constructor(x, y, spriteSheet, canvasWidth, canvasHeight) {
    super(x, y, undefined, undefined, spriteSheet, canvasWidth, canvasHeight);

    this.vx = 1.5;
    this.vy = 1.5;

    this.changeDirectionInterval = 60;
    this.changeDirectionCounter = 0;

    this.spriteName = "blue.png";
    this.exploding = false;
    this.explosionFrame = 0;
    this.explosionDelay = 0;
    this.explosionMaxDelay = 10;
  }

  /**
   * Atualiza o estado do inimigo a cada frame.
   * Alterna entre movimentação e animação de explosão.
   */
  update() {
    if (!this.exploding) {
      this.updateMovement();
    } else {
      this.updateExplosion();
    }
  }

  /**
   * Lógica de movimentação aleatória com inversão nas bordas.
   */
  updateMovement() {
    super.update();
    this.changeDirectionCounter++;

    if (this.changeDirectionCounter >= this.changeDirectionInterval) {
      this.changeDirectionCounter = 0;
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = (Math.random() - 0.5) * 4;
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x <= 0 || this.x + this.width >= this.canvasWidth) {
      this.vx = -this.vx;
    }
    if (this.y <= 0 || this.y + this.height >= this.canvasHeight) {
      this.vy = -this.vy;
    }

    this.screenWrap();
  }

  /**
   * Anima a explosão do inimigo em frames.
   */
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

  /**
   * Inicia o estado de explosão.
   */
  explode() {
    this.exploding = true;
    this.vx = 0;
    this.vy = 0;
    this.explosionFrame = 0;
    this.explosionDelay = 0;
  }
}
