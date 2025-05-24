import { Entity } from "./entity.js";

/**
 * Power-up genérico que cai na tela e pode ser apanhado pela nave.
 */
export class PowerUp extends Entity {
  constructor(x, y, spriteSheet, canvasWidth, canvasHeight) {
    super(x, y, 18, 20, spriteSheet, canvasWidth, canvasHeight);
    this.vy = 1.5;
    this.spriteName = "powerup.png";
  }

  /** Atualiza a posição do power-up. Remove-o se sair da tela. */
  update() {
    super.update();
    this.y += this.vy;
    if (this.y > this.canvasHeight) {
      this.markForRemoval();
    }
  }

  /** Marca este power-up para remoção. */
  markForRemoval() {
    this.remove = true;
  }

  draw(context) {
    super.draw(context);
  }
}

/**
 * Power-up específico que adiciona uma vida ao jogador.
 */
export class LifePowerUp extends Entity {
  constructor(x, y, spriteSheet, canvasWidth, canvasHeight) {
    super(x, y, 19, 22, spriteSheet, canvasWidth, canvasHeight);
    this.vy = 1.5;
    this.spriteName = "life.png";
  }

  update() {
    super.update();
    this.y += this.vy;
    if (this.y > this.canvasHeight) {
      this.markForRemoval();
    }
  }

  markForRemoval() {
    this.remove = true;
  }

  /** Aplica o efeito de adicionar uma vida à nave. */
  applyEffect() {
    const ship = window.ship;
    if (ship) ship.lives++;
  }

  draw(context) {
    super.draw(context);
  }
}
