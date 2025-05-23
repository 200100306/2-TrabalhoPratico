export class Entity {

  /**
   * Classe base para todas as entidades do jogo.
   * Esta classe define as propriedades e métodos comuns a todas as entidades.
   * 
   * @param {number} x - Posição x da entidade
   * @param {number} y - Posição y da entidade
   * @param {number} width - Largura da entidade 
   * @param {number} height - Altura da entidade
   * @param {SpriteSheet} spriteSheet - Objeto SpriteSheet para desenhar a entidade
   * @param {number} canvasWidth - Largura do canvas
   * @param {number} canvasHeight - Altura do canvas
   */
  constructor(x, y, width = 40, height = 32, spriteSheet, canvasWidth, canvasHeight) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.spriteSheet = spriteSheet;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
  }

  /**
   * Este método deve ser sobrescrito pelas subclasses para implementar a lógica de atualização da entidade.
   * Ele é chamado a cada quadro do jogo.
   */
  update() { }

  /**
   * Método genérico para desenhar uma entidade usando o nome do arquivo de sprite fornecido pelas subclasses.
   * 
   * @param {CanvasRenderingContext2D} context - O contexto de renderização do canvas
   */
  draw(context) {
    this.spriteSheet.drawFrame(context, this.spriteName, this.x, this.y);
  }

  /**
   * Verifica se esta entidade colide com outra entidade.
   * 
   * @param {Entity} other - Outra entidade para verificar a colisão
   * @returns {boolean} - Retorna true se houver colisão, caso contrário, false
   */
  collidesWith(other) {
    return this.x < other.x + other.width &&
      this.x + this.width > other.x &&
      this.y < other.y + other.height &&
      this.y + this.height > other.y;
  }

  /**
   * Previne que a entidade saia da tela e a reposiciona do outro lado.
   * Isso cria um efeito de "wrap" onde a entidade reaparece do outro lado da tela.
   */
  screenWrap() {
    if (this.x < -this.width) this.x = this.canvasWidth;
    else if (this.x > this.canvasWidth) this.x = 0;

    if (this.y < 0) this.y = this.canvasHeight;
    else if (this.y > this.canvasHeight) this.y = 0;
  }

}