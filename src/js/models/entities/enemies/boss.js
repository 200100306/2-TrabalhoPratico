import { Entity } from "../entity.js";
import { EnemyBullet } from "./index.js";
import { getGameEntities } from "../../../main.js";
import { displayVictoryScreen, displayGameOver } from "../../../ui/screens.js";

export class Boss extends Entity {
  constructor(x, y, spriteSheet, canvasWidth, canvasHeight) {
    super(x, y, 1, 1, spriteSheet, canvasWidth, canvasHeight);

    this.vx = 1;
    this.vy = 0.5;
    this.maxHealth = 1000;   // Vida máxima do boss
    this.health = this.maxHealth;

    this.state = "moving"; // "moving", "attacking", "exploding"
    this.animationFrame = 0;
    this.animationTimer = 0;
    this.maxAnimationTime = 10;

    this.explosionFrame = 0;
    this.explosionDelay = 0;
    this.explosionMaxDelay = 6;

    this.fireTimer = 0;
    this.fireInterval = 60;

    this.spriteName = this._getFrameName("moving", 0);
    this._applyCurrentFrameSize();
  }

  _getFrameName(state, subIndex) {
    let index = 0;
    switch (state) {
      case "moving":
        index = subIndex;          // 0..3 → boss_spritesheet-0..3.png
        break;
      case "exploding":
        index = 6 + subIndex;      // 6..10 → boss_spritesheet-6..10.png
        break;
    }
    return `boss_spritesheet-${index}.png`;
  }

  _findFrameData() {
    return this.spriteSheet.frameData.frames[this.spriteName];
  }

  _applyCurrentFrameSize() {
    const f = this._findFrameData();
    if (!f) return;
    this.width = f.frame.w;
    this.height = f.frame.h;
  }

  update() {
    if (this.state === "moving") {
      this._updateMovement();
    }

    if (this.state !== "exploding") {
      this.fireTimer++;
      if (this.fireTimer >= this.fireInterval) {
        this.fireTimer = 0;
        this.state = "attacking";
        this.animationFrame = 0;
        this.animationTimer = this.maxAnimationTime; // força troca imediata
      }
    }

    this.animationTimer++;
    if (this.animationTimer > this.maxAnimationTime) {
      this.animationTimer = 0;
      this.animationFrame++;

      if (this.state === "moving") {
        this.animationFrame %= 4;
        this.spriteName = this._getFrameName("moving", this.animationFrame);
      }

      if (this.state === "attacking") {
        this.animationFrame %= 3; // três estágios: [4,4,shoot]
        if (this.animationFrame < 2) {
          this.spriteName = "boss_spritesheet-4.png";
        } else {
          this._shootBullet();
          this.state = "moving";
          this.animationFrame = 0;
          this.spriteName = this._getFrameName("moving", this.animationFrame);
        }
      }

      if (this.state === "exploding") {
        if (this.explosionFrame < 5) {
          this.spriteName = this._getFrameName("exploding", this.explosionFrame);
          this.explosionFrame++;
        } else {
          this.remove = true;
        }
      }

      this._applyCurrentFrameSize();
    }

    if (this.state === "exploding") {
      this._updateExplosion();
    }
  }

  _updateMovement() {
    this.x += this.vx;
    this.y += Math.sin(this.x * 0.05) * this.vy;
    if (this.x <= 0 || this.x + this.width >= this.canvasWidth) {
      this.vx *= -1;
    }
  }

  takeDamage(damage = 10) {
    this.health -= damage;
    console.log(`Boss health: ${this.health}`);
    if (this.health <= 0 && this.state !== "exploding") {
      this._startExplosion();
    }
  }

    explode() {
    if (this.state === "exploding") return; // já está explodindo
    this._startExplosion();
    //displayVictoryScreen(); //
  }

  _startExplosion() {
    this.state = "exploding";
    this.animationFrame = 0;
    this.explosionFrame = 0;
    this.animationTimer = this.maxAnimationTime;
    this.explosionDelay = 0;
    this.spriteName = this._getFrameName("exploding", 0);
    this._applyCurrentFrameSize();
  }

  _updateExplosion() {
    this.explosionDelay++;
    if (this.explosionDelay >= this.explosionMaxDelay) {
      this.explosionDelay = 0;
      this.animationTimer = this.maxAnimationTime;
    }
  }

  _shootBullet() {
    const bulletWidth = 12;
    const bulletX = this.x + this.width / 2 - bulletWidth / 2;
    const bulletY = this.y + this.height;
    const bullet = new EnemyBullet(
      bulletX,
      bulletY,
      this.spriteSheet,
      this.canvasWidth,
      this.canvasHeight,
      0,
      5
    );
    getGameEntities().push(bullet);
  }

  draw(ctx) {
    // Desenha barra de vida acima do boss (usa largura atual do sprite)
    const barWidth = this.width;
    const barHeight = 8;
    const healthPct = Math.max(this.health, 0) / this.maxHealth;
    const greenWidth = barWidth * healthPct;

    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y - barHeight - 4, barWidth, barHeight);
    ctx.fillStyle = "lime";
    ctx.fillRect(this.x, this.y - barHeight - 4, greenWidth, barHeight);

    const f = this._findFrameData();
    if (!f) return;
    const sx = f.frame.x,
          sy = f.frame.y,
          sw = f.frame.w,
          sh = f.frame.h;
    ctx.drawImage(
      this.spriteSheet.image,
      sx, sy, sw, sh,
      this.x, this.y, sw, sh
    );
  }
}
