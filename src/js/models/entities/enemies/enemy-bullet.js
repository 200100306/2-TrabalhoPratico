import { Bullet } from "../bullet.js";

export class EnemyBullet extends Bullet {
  constructor(x, y, spriteSheet, canvasWidth, canvasHeight, vx = 0, vy = -10) {
    super(x, y, spriteSheet, canvasWidth, canvasHeight, vx, vy);
  }
}