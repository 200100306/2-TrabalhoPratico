import { getShip, setEntities, getGameEntities } from "../main.js";

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

  startLevel(spriteSheets) {
    console.log(`Iniciando nível ${this.levelNumber}: ${this.description}`);
    this.clearEntities();
    this.spawnEnemies(spriteSheets);
    this.spawnPowerUps(spriteSheets);
    this.reinsertShip();
  }

  clearEntities() {
    setEntities([]);
  }

  spawnEnemies(spriteSheets) {
    this.enemyConfig.forEach(({ type, count }) => {
      console.log(`Gerando ${count} inimigos do tipo ${type.name}`);
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
        getGameEntities().push(new type(x, y, spriteSheet, canvas.width, canvas.height));
      }
    });
  }

  spawnPowerUps(spriteSheets) {
    this.powerUpConfig.forEach(({ type, count }) => {
      const spriteKey = 'bulletLifePowerup';
      const sprite = spriteSheets[spriteKey];

      for (let i = 0; i < count; i++) {
        const x = Math.random() * canvas.width;
        const y = 0;
        const instance = new type(x, y, sprite, canvas.width, canvas.height);
        getGameEntities().push(instance);
      }
    });
  }

  reinsertShip() {
    const ship = getShip();
    if (ship) getGameEntities().push(ship);
  }
}
