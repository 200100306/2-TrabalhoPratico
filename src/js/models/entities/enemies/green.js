import { Entity } from "../entity.js";

/**
 * Representa um inimigo do tipo Verde.
 * Move-se horizontalmente com padrão senoidal no eixo vertical.
 */
export class Green extends Entity {
  /**
   * @param {number} x - Posição inicial X
   * @param {number} y - Posição inicial Y
   * @param {SpriteSheet} spriteSheet - Spritesheet associada
   * @param {number} canvasWidth - Largura do canvas
   * @param {number} canvasHeight - Altura do canvas
   */
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

  /**
   * Atualiza o comportamento do inimigo.
   * Alterna entre movimento senoidal e animação de explosão.
   */
  update() {
    if (!this.exploding) {
      this.updateMovement();
    } else {
      this.updateExplosion();
    }
  }

  /**
   * Aplica movimento horizontal com variação vertical senoidal.
   */
  updateMovement() {
    super.update();
    this.x += this.vx;
    this.y += this.amplitude * Math.sin(this.frequency * this.x);
    this.screenWrap();
  }

  /**
   * Atualiza a animação de explosão frame a frame.
   */
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

  /**
   * Inicia o estado de explosão do inimigo.
   */
  explode() {
    this.exploding = true;
    this.vx = 0;
    this.explosionFrame = 0;
    this.explosionDelay = 0;
  }
}
