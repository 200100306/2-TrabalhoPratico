import { Entity } from "../entity.js";

/**
 * Representa um inimigo do tipo Vermelho.
 * Move-se lateralmente e gira continuamente. Inverte direção aleatoriamente.
 */
export class Red extends Entity {
  /**
   * @param {number} x - Posição inicial X
   * @param {number} y - Posição inicial Y
   * @param {SpriteSheet} spriteSheet - Spritesheet associada
   * @param {number} canvasWidth - Largura do canvas
   * @param {number} canvasHeight - Altura do canvas
   */
  constructor(x, y, spriteSheet, canvasWidth, canvasHeight) {
    super(x, y, undefined, undefined, spriteSheet, canvasWidth, canvasHeight);

    this.vx = (Math.random() < 0.5 ? 1 : -1) * (2 + Math.random() * 2);
    this.rotation = 0;

    this.spriteName = "red.png";
    this.exploding = false;
    this.explosionFrame = 0;
    this.explosionDelay = 0;
    this.explosionMaxDelay = 10;
  }

  /**
   * Atualiza o inimigo: gira e move lateralmente, ou explode.
   */
  update() {
    if (!this.exploding) {
      this.updateMovement();
    } else {
      this.updateExplosion();
    }
  }

  /**
   * Move o inimigo com rotação e possível inversão de direção.
   */
  updateMovement() {
    super.update();
    this.x += this.vx;
    this.rotation += 0.05;

    const hitEdge = this.x <= 0 || this.x + this.width >= this.canvasWidth;
    const randomFlip = Math.random() < 0.01;
    if (hitEdge || randomFlip) {
      this.vx = -this.vx;
    }

    this.screenWrap();
  }

  /**
   * Anima a sequência de explosão do inimigo.
   */
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

  /**
   * Inicia a explosão e reseta rotação.
   */
  explode() {
    this.exploding = true;
    this.vx = 0;
    this.rotation = 0;
    this.explosionFrame = 0;
    this.explosionDelay = 0;
  }

  /**
   * Desenha o inimigo com rotação aplicada.
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    context.save();
    context.translate(this.x + this.width / 2, this.y + this.height / 2);
    context.rotate(this.rotation);
    context.translate(-this.width / 2, -this.height / 2);
    this.spriteSheet.drawFrame(context, this.spriteName, 0, 0);
    context.restore();
  }
}
