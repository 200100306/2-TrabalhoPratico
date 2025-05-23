/**
 * Responsável por desenhar elementos da interface: pontuação, tempo e vidas.
 */

export function drawUI(ctx, spriteSheets, ship, score, timeElapsed) {
  drawScore(ctx, score);
  drawLives(ctx, spriteSheets, ship);
  drawTime(ctx, timeElapsed);
}

function drawScore(ctx, score) {
  ctx.save();
  ctx.fillStyle = "gold";
  ctx.font = '24px Pixel, Arial';
  ctx.textAlign = 'left';
  ctx.fillText(`Score: ${score}`, 20, 40);
  ctx.restore();
}

function drawTime(ctx, timeElapsed) {
  ctx.save();
  ctx.fillStyle = "gold";
  ctx.font = '24px Pixel, Arial';
  ctx.textAlign = 'right';
  ctx.fillText(`Time: ${timeElapsed.toFixed(2)}s`, ctx.canvas.width - 20, 40);
  ctx.restore();
}

function drawLives(ctx, spriteSheets, ship) {
  const frame = spriteSheets['ship'].frameData.frames['MOVER_1.png'].frame;
  for (let i = 0; i < ship.lives; i++) {
    ctx.drawImage(
      spriteSheets['ship'].image,
      frame.x, frame.y, frame.w, frame.h,
      20 + i * 40, 60, 30, 30
    );
  }
}
