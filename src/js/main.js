import { SpriteSheet } from "../assets/spritesheet.js";
import { Ship } from "./models/entities/ship.js";
import { levels } from "./levels/index.js";
import { Red, Green, Blue, Yellow } from "./models/entities/enemies/index.js";
import { drawUI } from "./ui/hud.js";
import { handleCollisions } from "./systems/collisions.js";
import { displayVictoryScreen, displayGameOver } from "./ui/screens.js";
import { loadAllResources } from "./services/resourceLoader.js";
import { sounds } from "./services/soundManager.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const spriteSheets = {};
let entities = [], activeKeys = {};
let ship;
let score = 0, enemiesDestroyed = 0, timeElapsed = 0;
let currentLevelIndex = 0, gameOver = false;

const keyboard = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
};
const scrollSpeed = 1;
let backgroundPosition = 0;

window.addEventListener("load", () => {
    configureCanvas();
    preloadFonts();
    setupInputListeners();
    showStartMenu();
});

function configureCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function preloadFonts() {
    const font = new FontFace('Pixel', 'url(./assets/fonts/pixel.ttf)');
    font.load().then(loadedFont => document.fonts.add(loadedFont));
}

function setupInputListeners(){
    window.addEventListener('keydown', e => activeKeys[e.keyCode] = true);
    window.addEventListener('keyup', e => activeKeys[e.keyCode] = false);
}

function showStartMenu() {
    // TODO: Implementar a função para exibir o menu inicial
    // renderiza menu e adiciona evento de click para iniciar o jogo
    // (delega para startGame se clicado no botão Start)
}

function startGame() {
    loadAllResources(spriteSheets, () => {
        ship = new Ship(canvas.width / 2 - 30, canvas.height - 110, spriteSheets['ship'], canvas.width, canvas.height);
        entities.push(ship);
        startLevel(currentLevelIndex);
        gameLoop();
        sounds.backgroundMusic.play();
    });
}

function startLevel(index) {
  entities = [ship];
  levels[index].startLevel();
}

function gameLoop() {
  if (gameOver) return;

  updateBackground();
  updateEntities();
  handleCollisions(entities, ship, sounds);
  renderScene();
  checkLevelCompletion();

  requestAnimationFrame(gameLoop);
}

function updateBackground() {
  backgroundPosition += scrollSpeed;
  if (backgroundPosition >= window.innerHeight) backgroundPosition = 0;
  canvas.style.backgroundPosition = `0px ${backgroundPosition}px`;
}

function updateEntities() {
  if (activeKeys[keyboard.LEFT] || activeKeys[65]) ship.move(ship.direction.LEFT);
  if (activeKeys[keyboard.RIGHT] || activeKeys[68]) ship.move(ship.direction.RIGHT);
  if (activeKeys[keyboard.UP] || activeKeys[87]) ship.move(ship.direction.UP);
  if (activeKeys[keyboard.DOWN] || activeKeys[83]) ship.move(ship.direction.DOWN);

  entities.forEach(e => e.update());
  entities = entities.filter(e => !e.remove);
  timeElapsed += 1 / 60;
}

function renderScene() {
  drawingSurface.clearRect(0, 0, canvas.width, canvas.height);
  entities.forEach(e => e.draw(drawingSurface));
  drawUI(drawingSurface, spriteSheets, ship, score, timeElapsed);
}

function checkLevelCompletion() {
  const hasEnemies = entities.some(e => e instanceof Red || e instanceof Green || e instanceof Yellow || e instanceof Blue);
  if (!hasEnemies) {
    currentLevelIndex++;
    if (currentLevelIndex < levels.length) {
      startLevel(currentLevelIndex);
    } else {
      gameOver = true;
      sounds.victory.play();
      displayVictoryScreen(drawingSurface, canvas, score, enemiesDestroyed);
    }
  }
}

export function triggerGameOver() {
  gameOver = true;
  sounds.backgroundMusic.pause();
  sounds.death.play();
  displayGameOver(drawingSurface, canvas, score, enemiesDestroyed);
}

export function incrementScore(value) {
  score += value;
  enemiesDestroyed++;
}

export function getGameEntities() {
  return entities;
}

export function getShip() {
  return ship;
}

export function removeEntity(entity) {
  const index = entities.indexOf(entity);
  if (index !== -1) entities.splice(index, 1);
}