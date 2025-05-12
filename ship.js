class Ship extends Entity {
    constructor(x, y, spriteSheet, canvasWidth, canvasHeight) {
        super(x, y, 68, 72, spriteSheet, canvasWidth, canvasHeight);
        this.vx = 5; // Velocidade horizontal
        this.powerLevel = 1; // Nível de power-up da nave
        this.maxPowerLevel = 7; // Nível máximo de power-ups
        this.direction = { LEFT: 'left', RIGHT: 'right' };
        this.spriteName = "ship.png"; // Define o nome padrão do sprite
        this.state = "idle"; // Corrige o estado inicial para corresponder aos nomes do JSON
        this.animationFrame = 0;
        this.animationTimer = 0;
        this.maxAnimationTime = 10; // Tempo para mudar frames de animação
        this.isMoving = false; // Adiciona flag para rastrear se a nave está se movendo
        this.isScaled = false; // Flag para verificar se a nave está escalada
        this.scaleDuration = 300; // Duração do efeito de escala em frames
        this.scaleTimer = 0; // Timer para controlar a duração do efeito de escala
        this.lives = 3; // Número de vidas
    }

    upgrade() {
        if (this.powerLevel < this.maxPowerLevel) {
            this.powerLevel++;
            this.applyScaleEffect(); // Aplica o efeito de escala
        }
    }

    applyScaleEffect() {
        this.isScaled = true;
        this.scaleTimer = this.scaleDuration;
    }

    update() {
        this.updateAnimation();
        this.checkMovementState();
        this.checkExplosionState();
        if (this.isScaled) {
            this.scaleTimer--;
            if (this.scaleTimer <= 0) {
                this.isScaled = false; // Remove o efeito de escala após o tempo
            }
        }
    }

    updateAnimation() {
        this.animationTimer++;
        if (this.animationTimer > this.maxAnimationTime) {
            this.animationFrame = (this.animationFrame + 1) % 3; // Assume que cada estado tem 3 frames
            this.animationTimer = 0;
        }
    }

    checkMovementState() {
        if (!this.isMoving && this.state === "moving") {
            this.state = "idle";
            this.animationFrame = 0;
        }
        this.isMoving = false; // Reset a flag isMoving para false a cada ciclo de update
    }

    checkExplosionState() {
        if (this.state === "exploding") {
            this.explosionTimer++;
            lifeLostSound.play()
            if (this.explosionTimer > this.explosionDuration) {
                this.explosionTimer = 0;
                this.lives--;
                
                if (this.lives > 0) {
                    this.resetPosition(); // Reinicia a posição da nave
                } else {
                    gameOver = true;  // Configura o jogo para acabar após a animação
                    displayGameOver(); // Chamada para mostrar tela de Game Over
                }
            }
            return; // Sai do update para não alterar o estado ou a animação
        }

        if (this.state === "shooting" && this.animationFrame === 2) {
            this.state = "idle";
        }
    }

    move(direction) {
        if (this.state === "exploding") return; // Ignora movimentos se a nave estiver explodindo
    
        this.isMoving = true;
        this.state = "moving";
        this.animationFrame = 0;
        if (direction === this.direction.LEFT) {
            this.x = Math.max(0, this.x - this.vx);
        } else if (direction === this.direction.RIGHT) {
            this.x = Math.min(this.canvasWidth - this.width, this.x + this.vx);
        }
    }

    shoot() {
        if (this.state === "exploding") return;

        this.state = "shooting";
        // Corrige a direção das balas para cima com um desvio baseado no power-level
        let baseAngle = 90; // Balas direcionadas diretamente para cima
        let spread = 15; // Dispersão de 10 graus para cada lado por nível de power-up

        for (let i = 0; i < this.powerLevel; i++) {
            let angle = baseAngle + (spread * (i - (this.powerLevel - 1) / 2));
            let radians = angle * Math.PI / 180;
            let bulletVx = Math.cos(radians) * 2; // Velocidade horizontal pequena para criar o efeito de dispersaõ
            let bulletVy = Math.sin(radians) * -10; // Velocidade vertical padrão das balas (negativa para subir)
            
            let bulletX = this.x + this.width / 2 - 9 + bulletVx; // Ajuste da posição inicial X com base no vetor de velocidade
            let bulletY = this.y; // Posição Y inicial é a mesma da nave
            let bullet = new Bullet(bulletX, bulletY, spriteSheets['bulletlifepowerup'], this.canvasWidth, this.canvasHeight, bulletVx, bulletVy); // Atualizado para usar a nova spritesheet
            entities.push(bullet);
        }
        shotSound.play();
    }

    explode() {
        this.state = "exploding";
        this.animationFrame = 0; // Inicia a animação de explosão
        this.explosionTimer = 0; // Adiciona um temporizador para controlar a duração da explosão
        this.explosionDuration = 10; // Define a duração da explosão (ajuste conforme necessário)
    }

    resetPosition() {
        this.x = this.canvasWidth / 2 - this.width / 2;
        this.y = this.canvasHeight - this.height - 35;
        this.state = "idle";
    }

    draw(context) {
        context.save();  // Salva o estado atual do contexto para poder restaurar depois
        if (this.isScaled) {
            // Translada o contexto para o centro do sprite antes de escalar
            context.translate(this.x + this.width / 2, this.y + this.height / 2);
            context.scale(1.25, 1.25);  // Escala o sprite
            context.translate(-this.width / 2, -this.height / 2);  // Translada de volta para que a escala ocorra em torno do centro
        } else {
            // Simplesmente translada para a posição original sem escalar
            context.translate(this.x, this.y);
        }
    
        // Seleciona o frame correto com base no estado
        let framePrefix;
        switch (this.state) {
            case "idle": framePrefix = "PARADO"; break;
            case "moving": framePrefix = "MOVER"; break;
            case "shooting": framePrefix = "DISPARAR"; break;
            case "exploding": framePrefix = "EXPLODIR"; break;
            default: framePrefix = "PARADO"; break;
        }
    
        let frameName = `${framePrefix}_${this.animationFrame + 1}.png`;
        if (this.spriteSheet.frameData.frames[frameName]) {
            // Desenha o frame na posição ajustada e escalada
            this.spriteSheet.drawFrame(context, frameName, 0, 0);  // As coordenadas são ajustadas para 0 porque o translate já foi aplicado
        }
    
        context.restore();  // Restaura o estado do contexto para não afetar outros desenhos
    }
}
