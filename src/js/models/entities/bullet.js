import { Entity } from "./entity.js";
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
    const frameData = this.spriteSheet.frameData.frames[this.spriteName];
    if (!frameData) return;

    const sx = frameData.frame.x;
    const sy = frameData.frame.y;
    const sw = frameData.frame.w;
    const sh = frameData.frame.h;
    const dx = this.x;
    const dy = this.y;
    const dw = sw;
    const dh = sh;

    if (frameData.rotated) {
      // Se o frame estiver girado no atlas, desenha com rotação de -90°
      context.save();
      // Translada para o centro do destino (dx + dw/2, dy + dh/2)
      context.translate(dx + dw / 2, dy + dh / 2);
      // Roda -90 graus (−Math.PI/2)
      context.rotate(Math.PI / 2);
      // Ao desenhar, trocamos w⇄h, pois o atlas armazena o quadro rotacionado
      context.drawImage(
        this.spriteSheet.image,
        sx,    // origem x no atlas
        sy,    // origem y no atlas
        sw,    // largura no atlas (antes da rotação)
        sh,    // altura no atlas (antes da rotação)
        -dh / 2, // x no canvas rotacionado (metade da altura original)
        -dw / 2, // y no canvas rotacionado (metade da largura original)
        dh,    // desenha “largura” = altura original
        dw     // desenha “altura” = largura original
      );
      context.restore();
    } else {
      // Desenha normalmente
      super.draw(context);
    }
  }
}
