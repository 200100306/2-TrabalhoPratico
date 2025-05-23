/**
 * Classe responsável por representar uma spritesheet com múltiplos frames.
 * Permite desenhar frames individuais com base no nome definido no JSON.
 */
export class SpriteSheet {
  /**
   * @param {string} imagePath - Caminho da imagem da spritesheet.
   * @param {Object} frameData - Dados dos frames no formato gerado por JSON (TexturePacker, etc).
   * @param {Function} onLoad - Função callback executada após o carregamento da imagem.
   */
  constructor(imagePath, frameData, onLoad) {
    this.image = new Image();
    this.frameData = frameData;
    this.image.onload = onLoad;
    this.image.src = imagePath;
  }

  /**
   * Desenha um frame específico no contexto gráfico.
   *
   * @param {CanvasRenderingContext2D} ctx - Contexto 2D do canvas.
   * @param {string} frameName - Nome do frame a ser desenhado (deve existir em frameData).
   * @param {number} x - Posição horizontal no canvas.
   * @param {number} y - Posição vertical no canvas.
   */
  drawFrame(ctx, frameName, x, y) {
    const frame = this.frameData.frames[frameName]?.frame;
    if (!frame) {
      console.warn(`Frame '${frameName}' não encontrado na spritesheet.`);
      return;
    }

    ctx.drawImage(
      this.image,
      frame.x, frame.y, frame.w, frame.h,
      x, y, frame.w, frame.h
    );
  }
}
