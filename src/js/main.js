import { SpriteSheet } from "../assets/spritesheet.js";
import { Ship } from "./models/entities/ship.js";
import { levels } from "./levels/index.js";
import { Red, Green, Blue, Yellow } from "./models/entities/enemies/index.js";
import { drawUI } from "./ui/hud.js";
import { handleCollisions } from "./systems/collisions.js";
import { displayVictoryScreen, displayGameOver } from "./ui/screens.js";
import { loadAllResources } from "./services/resourceLoader.js";
import { sounds } from "./services/soundManager.js";
import { displayStartMenu } from "./ui/menus.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const spriteSheets = {};
let entities = [], activeKeys = {};
let ship;
let score = 0, enemiesDestroyed = 0, timeElapsed = 0;
let currentLevelIndex = 0, gameOver = false;
let animationFrameId;


const keyboard = {
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
};
const scrollSpeed = 1;
let backgroundPosition = 0;

window.addEventListener("load", async () => {
    configureCanvas();
    await preloadFonts();
    setupInputListeners();
    showStartMenu();
});

function configureCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

async function preloadFonts() {
    const font = new FontFace('Pixel', 'url(../assets/Pixel-Regular.ttf)');
    const loadedFont = await font.load();
    document.fonts.add(loadedFont);
    return await document.fonts.ready;
}

function setupInputListeners() {
    window.addEventListener('keydown', e => activeKeys[e.keyCode] = true);
    window.addEventListener('keyup', e => activeKeys[e.keyCode] = false);

    canvas.addEventListener("click", () => {
        if (ship && ship.state !== "exploding") {
            ship.shoot();
        }
    });
}

function showStartMenu() {
    displayStartMenu(canvas, context, startGame);
}

function startGame() {
    loadAllResources(spriteSheets, () => {
        console.log("All resources loaded:", Object.keys(spriteSheets));
        ship = new Ship(canvas.width / 2 - 30, 
            canvas.height - 110, 
            spriteSheets['ship'], 
            canvas.width, 
            canvas.height,
            spriteSheets["bulletLifePowerup"]);
            
        entities.push(ship);
        startLevel(currentLevelIndex);
        gameLoop();
        sounds.backgroundMusic.play();
    });
}

function startLevel(index) {
    entities = [ship];
    levels[index].startLevel(spriteSheets);
}

function gameLoop() {
    if (gameOver) return;

    updateBackground();
    updateEntities();
    handleCollisions(entities, ship, sounds);
    renderScene();
    checkLevelCompletion();

    animationFrameId = requestAnimationFrame(gameLoop);
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
    context.clearRect(0, 0, canvas.width, canvas.height);
    entities.forEach(e => e.draw(context));
    drawUI(context, spriteSheets, ship, score, timeElapsed);
}

function checkLevelCompletion() {
    const hasEnemies = entities.some(e => e instanceof Red || e instanceof Green || e instanceof Yellow || e instanceof Blue);
    //console.log(`Checking level completion: ${hasEnemies ? 'Enemies present' : 'No enemies left'}`);
    if (!hasEnemies) {
        currentLevelIndex++;
        if (currentLevelIndex < levels.length) {
            startLevel(currentLevelIndex);
        } else {
            gameOver = true;
            sounds.victory.play();
            displayVictoryScreen(context, canvas, score, enemiesDestroyed);
        }
    }
}

export function triggerGameOver() {
    gameOver = true;
    cancelAnimationFrame(animationFrameId);
    sounds.backgroundMusic.pause();
    sounds.death.play();
    displayGameOver(context, canvas, score, enemiesDestroyed);
}

export function incrementScore(value) {
    score += value;
    enemiesDestroyed++;
}

export function setEntities(newEntities) {
    entities = newEntities;
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