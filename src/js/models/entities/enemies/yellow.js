import { Entity } from "./entity.js";

/**
 * Representa um inimigo do tipo Amarelo.
 * Move-se em zig-zag vertical com ondulação horizontal visual.
 */
export class Yellow extends Entity {
  /**
   * @param {number} x - Posição inicial X
   * @param {number} y - Posição inicial Y
   * @param {SpriteSheet} spriteSheet - Spritesheet associada
   * @param {number} canvasWidth - Largura do canvas
   * @param {number} canvasHeight - Altura do canvas
   */
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

    this.translateOffset = 0;
  }

  /**
   * Atualiza o inimigo: movimento com efeito visual ou animação de explosão.
   */
  update() {
    super.update();
    if (!this.exploding) {
      this.updateMovement();
    } else {
      this.updateExplosion();
    }
  }

  /**
   * Movimento em zig-zag vertical com efeito ondulante horizontal.
   */
  updateMovement() {
    this.x += this.vx;
    this.y += this.vy * this.directionY;
    this.translateOffset = Math.sin(this.x * 0.05) * 10;

    const hitVerticalBound = this.y + this.height >= this.canvasHeight || this.y <= 0;
    if (hitVerticalBound) {
      this.directionY *= -1;
      this.y = Math.max(0, Math.min(this.y, this.canvasHeight - this.height));
    }

    this.screenWrap();
  }

  /**
   * Anima a sequência de explosão do inimigo.
   */
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

  /**
   * Desenha o inimigo com translação ondulante.
   * @param {CanvasRenderingContext2D} context
   */
  draw(context) {
    context.save();
    context.translate(this.translateOffset, 0);
    this.spriteSheet.drawFrame(context, this.spriteName, this.x, this.y);
    context.restore();
  }
}
