import { PowerUp, LifePowerUp } from "../entities/powerups.js";
import { Red, Green, Yellow, Blue } from "../entities/enemies/index.js";
import { getShip, getGameEntities, removeEntity } from "../game/init.js";

/**
 * Representa um nível do jogo.
 * Gera inimigos e power-ups de acordo com a configuração recebida.
 */
export class Level {
  constructor(levelNumber, enemyConfig, powerUpConfig, description) {
    this.levelNumber = levelNumber;
    this.enemyConfig = enemyConfig;
    this.powerUpConfig = powerUpConfig;
    this.description = description;
  }

  startLevel() {
    this.clearEntities();
    this.spawnEnemies();
    this.spawnPowerUps();
    this.reinsertShip();
  }

  clearEntities() {
    window.entities = [];
  }

  spawnEnemies() {
    this.enemyConfig.forEach(({ type, count }) => {
      const spacing = canvas.width / (count + 1);
      const spriteKey = type.name.toLowerCase();
      const spriteSheet = spriteSheets[spriteKey];

      if (!spriteSheet) {
        console.warn(`Spritesheet não encontrada para: ${spriteKey}`);
        return;
      }

      for (let i = 0; i < count; i++) {
        const x = spacing * (i + 1);
        const y = 80;
        entities.push(new type(x, y, spriteSheet, canvas.width, canvas.height));
      }
    });
  }

  spawnPowerUps() {
    this.powerUpConfig.forEach(({ type, count }) => {
      const spriteKey = 'bulletLifePowerup';
      const sprite = spriteSheets[spriteKey];

      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = 0;
        const instance = new type(x, y, sprite, canvas.width, canvas.height);
        entities.push(instance);
      }
    });
  }

  reinsertShip() {
    const ship = getShip();
    if (ship) entities.push(ship);
  }
}
