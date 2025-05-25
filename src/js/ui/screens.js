/**
 * Interfaces para exibir os ecrãs de fim de jogo e vitória.
 */

export function displayGameOver(ctx, canvas, score, enemiesDestroyed) {



  setTimeout(() => {
    console.log("Displaying Game Over Screen");
    console.log(`ctx: ${ctx}, Enemies Destroyed: ${canvas}`);
    console.log(`Score: ${score}, Enemies Destroyed: ${enemiesDestroyed}`);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(canvas.width / 4, canvas.height / 3, canvas.width / 2, canvas.height / 3);

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "blue");
    gradient.addColorStop("1", "lightblue");

    ctx.fillStyle = gradient;
    ctx.font = '64px Pixel, Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 3 + 70);

    ctx.font = '36px Pixel, Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 3 + 150);
    ctx.fillText(`Enemies Destroyed: ${enemiesDestroyed}`, canvas.width / 2, canvas.height / 3 + 200);

    canvas.onclick = () => location.reload();
  }, 500);
}

export function displayVictoryScreen(ctx, canvas, score, enemiesDestroyed) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(canvas.width / 4, canvas.height / 3.2, canvas.width / 2, canvas.height / 2.2);

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop("0", "gold");
  gradient.addColorStop("1", "orange");

  ctx.fillStyle = gradient;
  ctx.font = '64px Pixel, Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Victory!', canvas.width / 2, canvas.height / 2 - 70);

  ctx.font = '36px Pixel, Arial';
  ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 3 + 135);
  ctx.fillText(`Enemies Destroyed: ${enemiesDestroyed}`, canvas.width / 2, canvas.height / 3 + 185);

  ctx.font = '48px Pixel, Arial';
  ctx.fillText('Click to Restart', canvas.width / 2, 2 * canvas.height / 2.9);

  canvas.onclick = () => location.reload();
}