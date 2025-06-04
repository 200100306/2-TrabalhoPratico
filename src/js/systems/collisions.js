/**
 * Lógica de detecção e resolução de colisões entre entidades do jogo.
 */

import { Bullet } from "../models/entities/bullet.js";
import { PowerUp, LifePowerUp } from "../models/entities/powerups.js";
import { Red, Green, Blue, Yellow, Boss, EnemyBullet } from "../models/entities/enemies/index.js";
import { triggerGameOver, incrementScore, removeEntity } from "../main.js";

export function handleCollisions(entities, ship, sounds) {
  handleBulletHits(entities, sounds);
  handlePowerUpPickups(entities, ship, sounds);
  handleShipCrashes(entities, ship);
  handleShipHitByEnemyBullet(ship, entities, sounds);
}

function handleBulletHits(entities, sounds) {
  entities.forEach((entity, i) => {

    if (entity instanceof Bullet) {
      entities.forEach((other, j) => {
        if (i !== j && isEnemy(other) && entity.collidesWith(other)) {

          // se colidir com o boss reduzir vida dele
          if (other instanceof Boss) {
            other.takeDamage(); // Dano fixo de 100 por bala
          } else if (!other.exploding) {
            sounds.enemyDeath.play();
            other.explode();
            incrementScore(Math.floor(1000 / 1));
          }

          entity.remove = true;
        }
      });
    }
  });
}

function handlePowerUpPickups(entities, ship, sounds) {
  entities.forEach(entity => {
    if ((entity instanceof PowerUp || entity instanceof LifePowerUp) && ship.collidesWith(entity)) {
      sounds.levelUp.play();
      if (entity instanceof LifePowerUp) {
        entity.applyEffect();
      } else {
        ship.upgrade();
      }
      removeEntity(entity);
    }
  });
}

function handleShipCrashes(entities, ship) {
  if (ship.state === "exploding") return;

  entities.forEach(entity => {
    if (isEnemy(entity) && ship.collidesWith(entity)) {
      ship.explode();
    }
  });
}

function handleShipHitByEnemyBullet(ship, entities, sounds) {
  if (ship.state === "exploding") return; // Evita colisões enquanto a nave está explodindo

  entities.forEach(entity => {
    if (entity instanceof EnemyBullet && ship.collidesWith(entity)) {
      entity.remove = true; // Remove a bala inimiga
      ship.explode(); // Inicia a explosão da nave
    }

  });


};

function isEnemy(entity) {
  return entity instanceof Red || entity instanceof Green || entity instanceof Yellow || entity instanceof Blue || entity instanceof Boss;
}
