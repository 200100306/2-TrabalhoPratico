import { Entity } from "./entity.js";
import { Bullet } from "./bullet.js";
import { getGameEntities, triggerGameOver } from "../../main.js";
import { sounds } from "../../services/soundManager.js";

const ShipConfig = {
  width: 68,
  height: 72,
  velocity: 5,
  maxPowerLevel: 7,
  scaleDuration: 300,
  lives: 3,
  maxAnimationTime: 10,
  spriteName: "ship.png",
};

const Directions = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down',
};

const State = {
  IDLE: "idle",
  MOVING: "moving",
  SHOOTING: "shooting",
  EXPLODING: "exploding",
};

export class Ship extends Entity {
   /**
   * Esta classe representa a nave do jogador.
   * Ela herda da classe Entity e adiciona funcionalidades específicas para a nave.
   * 
   * @param {number} x - Posição x da nave
   * @param {number} y - Posição y da nave
   * @param {SpriteSheet} spriteSheet - Objeto SpriteSheet para desenhar a nave
   * @param {number} canvasWidth - Largura do canvas
   * @param {number} canvasHeight - Altura do canvas
   */
  constructor(x, y, spriteSheet, canvasWidth, canvasHeight, bulletSpriteSheet) {
    super(x, y, ShipConfig.width, ShipConfig.height, spriteSheet, canvasWidth, canvasHeight);

    this.bulletSpriteSheet = bulletSpriteSheet;
    this.vx = ShipConfig.velocity;
    this.powerLevel = 1;
    this.maxPowerLevel = ShipConfig.maxPowerLevel;
    this.direction = Directions;
    this.state = State.IDLE;

    this.animationFrame = 0;
    this.animationTimer = 0;

    this.isMoving = false;
    this.isScaled = false;
    this.scaleTimer = 0;

    this.lives = ShipConfig.lives;
    this.scaleDuration = ShipConfig.scaleDuration;
    this.maxAnimationTime = ShipConfig.maxAnimationTime;
    this.explosionDuration = 10; // ✅ move aqui a duração da explosão
  }

  upgrade() {
    if (this.powerLevel < this.maxPowerLevel) {
      this.powerLevel++;
      this.activateScale();
    }
  }

  activateScale() {
    this.isScaled = true;
    this.scaleTimer = this.scaleDuration;
  }

  update() {
    this.updateAnimation();
    this.updateMovementState();
    this.updateExplosionState();
    this.updateScale();
  }

  updateAnimation() {
    this.animationTimer++;
    if (this.animationTimer > this.maxAnimationTime) {
      this.animationFrame = (this.animationFrame + 1) % 3;
      this.animationTimer = 0;
    }
  }

  updateMovementState() {
    if (!this.isMoving && this.state === State.MOVING) {
      this.state = State.IDLE;
      this.animationFrame = 0;
    }
    this.isMoving = false;
  }

  updateScale() {
    if (this.isScaled) {
      this.scaleTimer--;
      if (this.scaleTimer <= 0) {
        this.isScaled = false;
      }
    }
  }

  updateExplosionState() {
    if (this.state === State.EXPLODING) {
      this.explosionTimer++;
      sounds.lifeLost.play();

      if (this.explosionTimer > this.explosionDuration) {
        console.log("Explosão concluída");
        this.lives--;
        this.explosionTimer = 0;

        if (this.lives > 0) {
          this.resetPosition();
          this.state = State.IDLE;
        } else {
          triggerGameOver();
        }
      }
      return;
    }

    if (this.state === State.SHOOTING && this.animationFrame === 2) {
      this.state = State.IDLE;
    }
  }

  move(direction) {
    this.isMoving = true;

    switch (direction) {
      case this.direction.LEFT:
        if (this.x - this.vx > 0) this.x -= this.vx;
        break;
      case this.direction.RIGHT:
        if (this.x + this.vx + this.width < this.canvasWidth) this.x += this.vx;
        break;
      case this.direction.UP:
        if (this.y - this.vx > 0) this.y -= this.vx;
        break;
      case this.direction.DOWN:
        if (this.y + this.vx + this.height < this.canvasHeight) this.y += this.vx;
        break;
    }

    this.state = State.MOVING;
  }

  shoot() {
    if (this.state === State.EXPLODING) return;

    this.state = State.SHOOTING;

    const baseAngle = 90;
    const spread = 15;

    for (let i = 0; i < this.powerLevel; i++) {
      const angle = baseAngle + spread * (i - (this.powerLevel - 1) / 2);
      const radians = angle * Math.PI / 180;
      const bulletVx = Math.cos(radians) * 2;
      const bulletVy = Math.sin(radians) * -10;

      const bulletX = this.x + this.width / 2 - 9 + bulletVx;
      const bulletY = this.y;

      const bullet = new Bullet(
        bulletX,  bulletY, this.bulletSpriteSheet, this.canvasWidth, this.canvasHeight,
        bulletVx, bulletVy
      );

      getGameEntities().push(bullet);
    }

    sounds.shot.play();
  }

  explode() {
    this.state = State.EXPLODING;
    this.animationFrame = 0;
    this.explosionTimer = 0;
  }

  resetPosition() {
    this.x = this.canvasWidth / 2 - this.width / 2;
    this.y = this.canvasHeight - this.height - 35;
    this.state = State.IDLE;
  }

  draw(context) {
    context.save();

    if (this.isScaled) {
      context.translate(this.x + this.width / 2, this.y + this.height / 2);
      context.scale(1.25, 1.25);
      context.translate(-this.width / 2, -this.height / 2);
    } else {
      context.translate(this.x, this.y);
    }

    const framePrefix = {
      [State.IDLE]: "PARADO",
      [State.MOVING]: "MOVER",
      [State.SHOOTING]: "DISPARAR",
      [State.EXPLODING]: "EXPLODIR",
    }[this.state] || "PARADO";

    const frameName = `${framePrefix}_${this.animationFrame + 1}.png`;

    if (this.spriteSheet.frameData.frames[frameName]) {
      this.spriteSheet.drawFrame(context, frameName, 0, 0);
    }

    context.restore();
  }
}