const font = new FontFace('Pixel', 'url(./assets/Pixel-Regular.ttf)');
font.load().then(function(loadedFont) { document.fonts.add(loadedFont); });

let canvas, drawingSurface;
let spriteSheets = {}, entities = [];
let activeKeys = {};
let ship = undefined, yellow = undefined, green = undefined, red = undefined, bullet = undefined;
let gameOver = false, currentLevelIndex = 0, contador = 0;
let score = 0, enemiesDestroyed = 0;
let keyboard = {LEFT: 37, RIGHT: 39, UP: 38, DOWN: 40 };
let scrollSpeed = 1; // Velocidade de scrolling
let currentPosition = 0; // Posição inicial do fundo
let timeElapsed = 0;
let baseScore = 1000; // Pontuação base para cálculo da pontuação final

function updateBackgroundPosition() {
    currentPosition += scrollSpeed;
    document.querySelector("canvas").style.backgroundPosition = `0px ${currentPosition}px`;
    if (currentPosition >= window.innerHeight) {
        currentPosition = 0; // Reset a posição quando alcança o final da tela
    }
}

setInterval(updateBackgroundPosition, 20); // Atualiza a posição do background a cada 20ms

function init() {
    canvas = document.querySelector("canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawingSurface = canvas.getContext("2d");

    backgroundMusic = new Audio('./assets/space_music.mp3');
    deathSound = new Audio('./assets/death.mp3');
    buttonsSound = new Audio('./assets/button.mp3');
    shotSound = new Audio('./assets/shot.mp3');
    levelUpSound = new Audio('./assets/levelup.mp3');
    enemyDeathSound = new Audio('./assets/enemydeath.mp3');
    victorySound = new Audio('./assets/victory.mp3');
    lifeLostSound = new Audio('./assets/life_lost.mp3');
    backgroundMusic.load(); deathSound.load(); buttonsSound.load(); shotSound.load(); levelUpSound.load();
    enemyDeathSound.load(); victorySound.load(); // Pré-carrega os audios
    displayStartMenu(); // Exibe o menu de início

    // Adiciona o evento de clique ao canvas para disparar
    canvas.addEventListener('click', function() {
        if (ship && ship.state !== "exploding") {
            ship.shoot();
        }
    });
}

window.addEventListener("load", init, false);

window.addEventListener("keydown", function(event) {
    activeKeys[event.keyCode] = true;
    event.preventDefault(); // Previne o comportamento padrão para manter o foco do jogo
});

window.addEventListener("keyup", function(event) {
    activeKeys[event.keyCode] = false;
    event.preventDefault(); // Previne o comportamento padrão para manter o foco do jogo
});

function displayStartMenu() {
    drawingSurface.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    // Cria um gradiente para o título e botão
    let titleGradient = drawingSurface.createLinearGradient(0, 0, canvas.width, 0);
    titleGradient.addColorStop("0", "cyan");
    titleGradient.addColorStop("1", "darkblue");

    let buttonGradient = drawingSurface.createLinearGradient(0, 0, canvas.width, 0);
    buttonGradient.addColorStop("0", "magenta");
    buttonGradient.addColorStop("1", "blue");

    // Desenha o fundo semi-transparente para o título e botão
    drawingSurface.fillStyle = 'rgba(0, 0, 0, 0.7)';
    drawingSurface.fillRect(canvas.width / 5, canvas.height / 3.7 - 80, canvas.width / 1.6, canvas.height / 2.3);

    // Configurações do título do jogo
    drawingSurface.fillStyle = titleGradient;
    drawingSurface.font = '64px Pixel, Arial';
    drawingSurface.textAlign = 'center';
    drawingSurface.textBaseline = 'middle';
    drawingSurface.fillText('Space Invaders', canvas.width / 2, canvas.height / 2.5 - 80);

    // Configurações do botão 'Start Game'
    drawingSurface.fillStyle = buttonGradient;
    drawingSurface.font = '48px Pixel, Arial';
    drawingSurface.fillText('Start Game', canvas.width / 2, 2 * canvas.height / 3.3 - 80);

    // Desenha o fundo semi-transparente para as imagens e descrição
    drawingSurface.fillStyle = 'rgba(0, 0, 0, 0.7)';
    drawingSurface.fillRect(canvas.width / 3 - 60, 2 * canvas.height / 2.8 - 70, canvas.width / 3 + 150, 250);

    // Imagens instruções jogo 
    let imgA = new Image();
    imgA.src = './assets/Akey.jpg';
    imgA.onload = function() {
        drawingSurface.drawImage(imgA, canvas.width / 2.9 - 50, 2 * canvas.height / 2.7 - 60, 60, 60);
    }

    let imgD = new Image();
    imgD.src = './assets/Dkey.jpg';
    imgD.onload = function() {
        drawingSurface.drawImage(imgD, canvas.width / 2.4 - 50, 2 * canvas.height / 2.7 - 60, 60, 60);
    }

    let M1 = new Image();
    M1.src = './assets/M1.png';
    M1.onload = function() {
        drawingSurface.drawImage(M1, canvas.width / 2.9 - 10, 2 * canvas.height / 2.3 - 60, 100, 100);
    }

    // Adiciona intruções
    drawingSurface.fillStyle = 'white';
    drawingSurface.font = '24px Pixel, Arial';
    drawingSurface.fillText('MOVEMENT', canvas.width / 1.6, 2 * canvas.height / 2.5 - 70);

    drawingSurface.fillStyle = 'white';
    drawingSurface.font = '24px Pixel, Arial';
    drawingSurface.fillText('SHOOT', canvas.width / 1.6, 2 * canvas.height / 2.15 - 40);

    canvas.onclick = function(event) {
        let x = event.pageX - canvas.offsetLeft,
            y = event.pageY - canvas.offsetTop;
        let rect = { x: canvas.width / 4, y: canvas.height / 3, width: canvas.width / 2, height: canvas.height / 3 };

        if (x >= rect.x && x <= rect.x + rect.width && y >= rect.y && y <= rect.y + rect.height) {
            canvas.removeEventListener('click', arguments.callee); canvas.onclick = null;
            buttonsSound.play(); // Remove o listener para evitar varios inicios e toca o som de inicio
            loadResources(); // Função para carregar recursos e iniciar o jogo
            backgroundMusic.play(); // Inicia a música após o clique
        }
    };
}



function loadResources() {
    function loadSpriteSheet(path, jsonFile, type) {
        fetch(jsonFile)
            .then(response => response.json())
            .then(spriteData => {
                let spriteSheet = new SpriteSheet(path, spriteData, () => {
                    spriteLoaded(type, spriteSheet);
                });
            });
    }

    loadSpriteSheet("./assets/ship.png", './assets/ship.json', 'ship');
    loadSpriteSheet("./assets/bullet_life_powerup.png", './assets/bullet_life_powerup.json', 'bulletLifePowerup'); // Carregar nova spritesheet
    loadSpriteSheet("./assets/red.png", './assets/red.json', 'red');
    loadSpriteSheet("./assets/green.png", './assets/green.json', 'green');
    loadSpriteSheet("./assets/yellow.png", './assets/yellow.json', 'yellow');
    loadSpriteSheet("./assets/blue.png", './assets/blue.json', 'blue');
}

function spriteLoaded(type, spriteSheet) {
    contador++;
    spriteSheets[type.toLowerCase()] = spriteSheet;

    if (contador === 6) { 
        startLevel(currentLevelIndex);  // Inicia o nível antes de adicionar a nave
        ship = new Ship(canvas.width / 2 - 30, canvas.height - 110, spriteSheets['ship'], canvas.width, canvas.height);
        entities.push(ship);  // Adiciona a nave
        gameLoop();
    }
}

function startLevel(index) {
    entities = []; // Limpa todas as entidades
    entities.push(ship); // Adiciona a nave existente ao array de entidades
    levels[index].startLevel();
}

function gameLoop() {
    if (!gameOver) {
        drawingSurface.clearRect(0, 0, canvas.width, canvas.height);

        // Verifica o estado das teclas e chama as funções apropriadas
        if (activeKeys[keyboard.LEFT] || activeKeys[65]) { // Seta Esquerda & A
            ship.move(ship.direction.LEFT);
        }
        if (activeKeys[keyboard.RIGHT] || activeKeys[68]) { // Seta Direita & D
            ship.move(ship.direction.RIGHT);
        }


        entities.forEach(entity => entity.update());
        entities = entities.filter(entity => !entity.remove); 
        handleCollisions();
        checkLevelCompletion();
        entities.forEach(entity => entity.draw(drawingSurface)); 
        drawScore(); // Desenha a pontuação na tela
        drawLives(); // Desenha as vidas na tela
        drawTime(); // Desenha o tempo decorrido na tela
        timeElapsed += 1 / 60; // Incrementa o tempo decorrido em segundos 
        requestAnimationFrame(gameLoop);
    }
}

function drawTime() {
    drawingSurface.save();
    drawingSurface.fillStyle = "gold";
    drawingSurface.font = '24px Pixel, Arial';
    drawingSurface.textAlign = 'right';
    drawingSurface.fillText(`Time: ${timeElapsed.toFixed(2)}s`, canvas.width - 20, 40);
    drawingSurface.restore();
}

function drawScore() {
    drawingSurface.save();
    drawingSurface.fillStyle = "gold";
    drawingSurface.font = '24px Pixel, Arial';
    drawingSurface.textAlign = 'left';
    drawingSurface.fillText(`Score: ${score}`, 20, 40);
    drawingSurface.restore();
}

function drawLives() {
    const frame = spriteSheets['ship'].frameData.frames['MOVER_1.png'].frame;
    for (let i = 0; i < ship.lives; i++) {
        drawingSurface.drawImage(
            spriteSheets['ship'].image,
            frame.x, frame.y, frame.w, frame.h,
            20 + i * 40, 60, 30, 30
        );
    }
}

function handleCollisions() {
    handleBulletCollisions();
    handlePowerUpCollisions();
    handleShipCollisions();
}

function handleBulletCollisions() {
    entities.forEach((entity, i) => {
        if (entity instanceof Bullet) {
            entities.forEach((other, j) => {
                if (i !== j && (other instanceof Red || other instanceof Green || other instanceof Yellow || other instanceof Blue) && entity.collidesWith(other)) {
                    entity.remove = true;
                    if (!other.exploding) {
                        enemyDeathSound.play();
                        other.explode(); // Inicia a animação de explosão
                        score += Math.floor(baseScore / timeElapsed); // Pontuação depende do tempo decorrido
                        enemiesDestroyed++;
                    }
                }
            });
        }
    });
}

function handlePowerUpCollisions() {
    entities.forEach((entity, i) => {
        if ((entity instanceof PowerUp || entity instanceof LifePowerUp) && ship.collidesWith(entity)) {
            levelUpSound.play();
            if (entity instanceof LifePowerUp) {
                entity.applyEffect(); // Aplica o efeito de ganhar uma vida
            } else {
                ship.upgrade(); // Aplica o efeito de upgrade padrão
            }
            entity.removeFromGame();
        }
    });
}

function handleShipCollisions() {
    entities.forEach(entity => {
        if ((entity instanceof Red || entity instanceof Green || entity instanceof Yellow) && ship.collidesWith(entity)) {
            ship.explode(); // Inicia a animação de explosão
        }
    });
}

function applyPowerUpEffect() {
    ship.upgrade();
}

function checkLevelCompletion() {
    if (!entities.some(entity => entity instanceof Red || entity instanceof Green || entity instanceof Yellow || entity instanceof Blue)) {
        currentLevelIndex++;
        if (currentLevelIndex < levels.length) {
            startLevel(currentLevelIndex);
        } else {
            displayVictoryScreen(); // Chama a tela de vitória quando todos os níveis forem completados
            backgroundMusic.pause();
            victorySound.play();
            gameOver = true; // Define o jogo como terminado
        }
    }
}

function displayGameOver() {
    if (!gameOver) return;
    drawingSurface.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    canvas.onclick = null;

    // Desenha o fundo semi-transparente
    drawingSurface.fillStyle = 'rgba(0, 0, 0, 0.7)';
    drawingSurface.fillRect(canvas.width / 4, canvas.height / 3, canvas.width / 2, canvas.height / 3);
    
    // Configura o gradiente para o texto
    let gradient = drawingSurface.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop("0", "blue");
    gradient.addColorStop("1", "lightblue");
    
    // Configurações do texto 'Game Over'
    drawingSurface.fillStyle = gradient;
    drawingSurface.font = '64px Pixel, Arial';  // Tamanho maior para o título
    drawingSurface.fillText('Game Over', canvas.width / 2, canvas.height / 3 + 70);
    
    // Configurações para a pontuação e inimigos destruídos
    drawingSurface.font = '36px Pixel, Arial';  // Tamanho menor para os detalhes
    drawingSurface.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 3 + 150);
    drawingSurface.fillText(`Enemies Destroyed: ${enemiesDestroyed}`, canvas.width / 2, canvas.height / 3 + 200);
    
    // Pausa a música e Reinicia a música para o começo
    backgroundMusic.pause(); deathSound.play()
    
    // Aguarda 3 segundos e reinicia o jogo automaticamente ou retorna ao menu principal
    setTimeout(() => {restartGame();}, 3000);
}

function displayVictoryScreen() {
    drawingSurface.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    canvas.onclick = null; // Remove qualquer click handler anterior

    // Configura o gradiente para o texto de vitória
    let victoryGradient = drawingSurface.createLinearGradient(0, 0, canvas.width, 0);
    victoryGradient.addColorStop("0", "gold");
    victoryGradient.addColorStop("1", "orange");

    // Desenha o fundo semi-transparente
    drawingSurface.fillStyle = 'rgba(0, 0, 0, 0.7)';
    drawingSurface.fillRect(canvas.width / 4, canvas.height / 3.2, canvas.width / 2, canvas.height / 2.2);

    // Configurações do texto 'Victory'
    drawingSurface.fillStyle = victoryGradient;
    drawingSurface.font = '64px Pixel, Arial';
    drawingSurface.textAlign = 'center';
    drawingSurface.textBaseline = 'middle';
    drawingSurface.fillText('Victory!', canvas.width / 2, canvas.height / 2 - 70);

    // Configurações para a pontuação e inimigos destruídos
    drawingSurface.font = '36px Pixel, Arial';  // Tamanho menor para os detalhes
    drawingSurface.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 3 + 135);
    drawingSurface.fillText(`Enemies Destroyed: ${enemiesDestroyed}`, canvas.width / 2, canvas.height / 3 + 185);

    // Configuração para reiniciar o jogo
    drawingSurface.font = '48px Pixel, Arial';
    drawingSurface.fillText('Click to Restart', canvas.width / 2, 2 * canvas.height / 2.9);

    canvas.onclick = function() {
        restartGame(); // Reinicia o jogo quando clicado
    };
}

function restartGame() {
    entities = []; // Limpa todas as entidades
    score = 0;
    timeElapsed = 0;
    enemiesDestroyed = 0;
    currentLevelIndex = 0; // Define o índice do nível para 0, que é o primeiro nível
    contador = 0;  // Redefine o contador para o carregamento de sprites
    gameOver = false; // Redefine o estado do jogo
    ship = undefined; // Reinicializa a nave para garantir que não há duplicates
    init(); // Reinicia o jogo
}
