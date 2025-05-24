/**
 * Exibe o menu inicial com título, botão de início e instruções, replicando
 * com fidelidade visual e funcional o layout original.
 *
 * @param {HTMLCanvasElement} canvas 
 * @param {CanvasRenderingContext2D} ctx 
 * @param {Function} onStartGame - Callback chamado ao clicar em "Start Game"
 */
export function displayStartMenu(canvas, ctx, onStartGame) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const titleGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  titleGradient.addColorStop("0", "cyan");
  titleGradient.addColorStop("1", "darkblue");

  const buttonGradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  buttonGradient.addColorStop("0", "magenta");
  buttonGradient.addColorStop("1", "blue");

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(canvas.width / 5, canvas.height / 3.7 - 80, canvas.width / 1.6, canvas.height / 2.3);

  ctx.fillStyle = titleGradient;
  ctx.font = '64px Pixel, Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Space Invaders', canvas.width / 2, canvas.height / 2.5 - 80);

  ctx.fillStyle = buttonGradient;
  ctx.font = '48px Pixel, Arial';
  ctx.fillText('Start Game', canvas.width / 2, 2 * canvas.height / 3.3 - 80);

  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(canvas.width / 3 - 60, 2 * canvas.height / 2.8 - 70, canvas.width / 3 + 150, 250);

  const imgA = new Image();
  imgA.src = './assets/wasdKey.png';
  imgA.onload = () => ctx.drawImage(imgA, canvas.width / 2.9 - 15, 2 * canvas.height / 2.7 - 60, 100, 80);

  const M1 = new Image();
  M1.src = './assets/M1.png';
  M1.onload = () => ctx.drawImage(M1, canvas.width / 2.9 - 10, 2 * canvas.height / 2.3 - 70, 100, 100);

  ctx.fillStyle = 'white';
  ctx.font = '24px Pixel, Arial';
  ctx.fillText('MOVEMENT', canvas.width / 1.6, 2 * canvas.height / 2.5 - 70);
  ctx.fillText('SHOOT', canvas.width / 1.6, 2 * canvas.height / 2.15 - 70);

  canvas.onclick = function(event) {
    const x = event.pageX - canvas.offsetLeft;
    const y = event.pageY - canvas.offsetTop;
    const rect = {
      x: canvas.width / 4,
      y: canvas.height / 3,
      width: canvas.width / 2,
      height: canvas.height / 3
    };

    const isInside = x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height;
    if (isInside) {
      canvas.onclick = null;
      onStartGame();
    }
  };
}
