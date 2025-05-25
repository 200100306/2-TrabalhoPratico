import { Entity } from "../entity.js";

export class Boss extends Entity {
  constructor(x, y, spriteSheet, canvasWidth, canvasHeight) {
    super(x, y, 120, 120, spriteSheet, canvasWidth, canvasHeight);
    this.vx = 1;
    this.vy = 0.5;
    this.health = 100;
    this.state = "moving"; // moving, attacking, exploding
    this.animationFrame = 0;
    this.animationTimer = 0;
    this.maxAnimationTime = 10;
    this.explosionFrame = 0;
    this.explosionDelay = 0;
    this.explosionMaxDelay = 6;
    this.spriteName = "Boss-5.png"; // inicial
  }

  update() {
    switch (this.state) {
      case "moving":
        this.updateMovement();
        break;
      case "attacking":
        this.updateAttack();
        break;
      case "exploding":
        this.updateExplosion();
        break;
    }

    this.animationTimer++;
    if (this.animationTimer > this.maxAnimationTime) {
      this.animationFrame = (this.animationFrame + 1) % 4;
      this.animationTimer = 0;
    }
  }

  updateMovement() {
    this.x += this.vx;
    this.y += Math.sin(this.x * 0.05) * this.vy;

    if (this.x <= 0 || this.x + this.width >= this.canvasWidth) {
      this.vx *= -1;
    }

    this.spriteName = `Boss-${5 + this.animationFrame}.png`; // movimentos
  }

  updateAttack() {
    this.spriteName = `Boss-${13 + this.animationFrame}.png`; // ataque
    // lógica de ataque extra futura
  }

  takeDamage(damage = 10) {
    this.health -= damage;
    if (this.health <= 0 && this.state !== "exploding") {
      this.explode();
    }
  }

  explode() {
    this.state = "exploding";
    this.explosionFrame = 0;
    this.explosionDelay = 0;
  }

  updateExplosion() {
    if (this.explosionDelay++ >= this.explosionMaxDelay) {
      this.spriteName = `Boss-${this.explosionFrame}.png`; // usa Boss-0 a Boss-4
      this.explosionFrame++;
      this.explosionDelay = 0;
    }

    if (this.explosionFrame > 4) {
      this.remove = true;
    }
  }

  draw(ctx) {
    const frame = this.spriteSheet.frameData.frames[this.spriteName]?.frame;
    if (!frame) return;

    ctx.drawImage(
      this.spriteSheet.image,
      frame.x, frame.y, frame.w, frame.h,
      this.x, this.y, frame.w, frame.h
    );
  }
}
