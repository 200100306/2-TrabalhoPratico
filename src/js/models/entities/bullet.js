/**
 * Representa um projétil disparado pela nave ou inimigos.
 * Move-se com velocidade definida e remove-se ao sair do ecrã.
 */
export class Bullet extends Entity {
  /**
   * @param {number} x - Posição inicial horizontal
   * @param {number} y - Posição inicial vertical
   * @param {SpriteSheet} spriteSheet - Spritesheet associada ao projétil
   * @param {number} canvasWidth - Largura do canvas
   * @param {number} canvasHeight - Altura do canvas
   * @param {number} [vx=0] - Velocidade horizontal
   * @param {number} [vy=-10] - Velocidade vertical
   */
  constructor(x, y, spriteSheet, canvasWidth, canvasHeight, vx = 0, vy = -10) {
    super(x, y, 16, 20, spriteSheet, canvasWidth, canvasHeight);
    this.vx = vx;
    this.vy = vy;
    this.spriteName = "bullet.png";
  }

  /**
   * Atualiza a posição do projétil. Remove-o se sair da área visível do canvas.
   */
  update() {
    this.x += this.vx;
    this.y += this.vy;

    const outsideVertical = this.y + this.height < 0;
    const outsideHorizontal = this.x < 0 || this.x > this.canvasWidth;

    if (outsideVertical || outsideHorizontal) {
      this.markForRemoval();
    }
  }

  /**
   * Marca o projétil para remoção do array de entidades.
   */
  markForRemoval() {
    this.remove = true;
  }

  /**
   * Renderiza o projétil no canvas.
   * @param {CanvasRenderingContext2D} context 
   */
  draw(context) {
    super.draw(context);
  }
}
