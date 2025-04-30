class Level {
    constructor(levelNumber, enemyConfig, powerUpConfig, description) {
        this.levelNumber = levelNumber;
        this.enemyConfig = enemyConfig;
        this.powerUpConfig = powerUpConfig;
        this.description = description;
    }

    startLevel() {
        this.clearEntities();
        this.addEnemies();
        this.addPowerUps();
        this.resetShipPosition();
    }

    clearEntities() {
        entities = []; // Limpa todas as entidades
    }

    addEnemies() {
        this.enemyConfig.forEach(config => {
            let spacing = canvas.width / (config.count + 1);
            for (let i = 0; i < config.count; i++) {
                let xPosition = spacing * (i + 1);
                let yPosition = 80; // Posição vertical inicial dos inimigos
                let enemy = new config.type(xPosition, yPosition, spriteSheets[config.type.name.toLowerCase()], canvas.width, canvas.height);
                entities.push(enemy);
            }
        });
    }

    addPowerUps() {
        this.powerUpConfig.forEach(config => {
            for (let i = 0; i < config.count; i++) {
                let powerUp;
                if (config.type === LifePowerUp) {
                    powerUp = new LifePowerUp(Math.random() * canvas.width, 0, spriteSheets['bulletlifepowerup'], canvas.width, canvas.height); // Atualizado para usar a nova spritesheet
                } else {
                    powerUp = new PowerUp(Math.random() * canvas.width, 0, spriteSheets['bulletlifepowerup'], canvas.width, canvas.height); // Atualizado para usar a nova spritesheet
                }
                entities.push(powerUp);
            }
        });
    }

    resetShipPosition() {
        if (ship) {
            entities.push(ship);
        }
    }
}

// Definição dos níveis com descrições detalhadas
window.levels = [
    new Level(1, [{ type: Red, count: 5 }], [{ type: PowerUp, count: 1 }], "Nível 1: Introdução básica ao jogo."),
    new Level(2, [{ type: Red, count: 8 }, { type: Yellow, count: 4 }], [{ type: PowerUp, count: 1 }], "Nível 2: Introdução de inimigos amarelos com movimentos mais dinâmicos."),
    new Level(3, [{ type: Red, count: 12 }, { type: Yellow, count: 8 }, { type: Green, count: 4 }], [{ type: PowerUp, count: 1 }, { type: LifePowerUp, count: 1 }], "Nível 3: Aumento da diversidade e quantidade de inimigos."),
    new Level(4, [{ type: Red, count: 16 }, { type: Yellow, count: 12 }, { type: Green, count: 6 }, { type: Blue, count: 5 }], [{ type: PowerUp, count: 1 }], "Nível 4: Dificuldade elevada com um número maior de inimigos."),
    new Level(5, [{ type: Red, count: 20 }, { type: Yellow, count: 15 }, { type: Green, count: 8 }, { type: Blue, count: 7 }], [{ type: PowerUp, count: 1 }, { type: LifePowerUp, count: 1 }], "Nível 5: Teste final com o máximo de inimigos e power-ups."),
    new Level(6, [{ type: Red, count: 15 }, { type: Yellow, count: 10 }, { type: Green, count: 10 }, { type: Blue, count: 10 }], [{ type: PowerUp, count: 2 }], "Nível 6: Tu Não Vais Sobreviver.")
];
