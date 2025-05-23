# Projeto: Galactic Firestorm

## 1. Nome do Jogo

**Galactic Firestorm**  
*Subtítulo: Domina os céus, esquiva-te e destrói para sobreviver!*

## 2. Visão Geral do Jogo

### 2.1. Conceito

O jogador controla uma nave espacial com a missão de destruir objetos inimigos enquanto se esquiva de disparos. Os disparos podem sair de ambos os lados — do jogador e dos inimigos. Os objetos inimigos têm movimentos laterais e comportamentos variados, criando uma experiência dinâmica e competitiva. No nível final, o jogador enfrenta o poderoso boss “Estrela da Morte”.

### 2.2. Género

Jogo de ação/arcade 2D com nave espacial, disparos laterais e batalhas contra bosses.

### 2.3. Público-Alvo

Jogadores casuais e fãs de jogos arcade com desafios progressivos e elementos de competição.

### 2.4. Fluxo de Jogo

- Página inicial com instruções de controlo
- Início de jogo
- Progressão por níveis
- Encontro com boss final
- Ecrã de vitória/derrota com possibilidade de replay
- Painel de melhores pontuações

### 2.5. Estética

Estilo moderno e sci-fi com sprites de naves, explosões, lasers e cenários espaciais. Efeitos visuais envolventes, boss final imponente e música ambiente de ação futurista.

## 3. Jogabilidade e Mecânicas

### 3.1. Progressão

- Níveis com dificuldade crescente
- Inimigos com padrões de movimento e disparo variados
- Power-ups distribuídos ao longo dos níveis
- Nível final com boss: “Estrela da Morte”

### 3.2. Estrutura de Desafios

- Esquivar de disparos e obstáculos
- Eliminar inimigos com precisão
- Utilização estratégica de power-ups
- Batalha intensa contra boss final

### 3.3. Objetivos

- Sobreviver e destruir o maior número de inimigos
- Atingir o fim de cada nível com a maior pontuação possível
- Derrotar o boss final
- Entrar no painel de melhores pontuações

### 3.4. Mecânicas

- Disparo bidirecional (esquerda/direita)
- Movimento lateral e vertical (↑↓←→ ou W/S/A/D)
- Colisões com disparos ou inimigos resultam em dano
- Barra de integridade
- Power-ups:
  - **Agilidade**: aumenta a velocidade da nave temporariamente
  - **Escudo Protetor**: garante invencibilidade por alguns segundos
- Mensagem de transição entre níveis
- Painel de pontuações após o jogo

## 4. História e Personagens

### 4.1. História

No futuro distante, uma nave defensora da última colónia humana entra em missão para eliminar ameaças cibernéticas no espaço profundo. A sua jornada culmina num confronto épico com a “Estrela da Morte”, uma superestrutura controlada por uma inteligência hostil.

### 4.2. Mundo do Jogo

- Cenários espaciais com estrelas, nebulosas e campos de asteroides
- Planetas e meteoritos em rotação no fundo
- Boss zone especial com ambiente mais sombrio e intenso

### 4.3. Nave Principal

- Nome: Orion
- Aparência: Personalizável (sprites diferentes)
- Ações: disparar, mover, esquivar, recolher e usar power-ups

### 4.4. Boss Final - Estrela da Morte

- Tamanho superior aos inimigos normais
- Padrões de ataque variados
- Fases de combate com mecânicas distintas
- Vulnerabilidades temporárias

## 5. Níveis

### Nível 1: Zona de Entrada

- Inimigos com padrão simples
- Apresentação dos controlos e primeiros power-ups

### Nível 2: Campo de Asteroides

- Inimigos com movimentação lateral
- Disparos aleatórios
- Obstáculos físicos no cenário

### Nível 3: Encontro na Nebulosa

- Inimigos mais rápidos e resistentes
- Power-ups estratégicos
- Aumento de dificuldade

### Nível 4: Estrela da Morte

- Combate contra o boss final
- Várias fases com ataques distintos
- Ambiente tenso com música climática

## 6. Interface

### 6.1. Sistema Visual

- HUD com:
  - Barra de integridade
  - Contador de inimigos destruídos
  - Power-up ativo
  - Nível atual
  - Pontuação total
- Página inicial com instruções claras
- Ecrã de melhores pontuações

### 6.2. Sistema de Controlo

- Teclas A/D: Mover lateralmente
- Teclas W/S: Mover verticalmente
- Tecla Espaço: Disparar
- Tecla E: Ativar power-up (quando disponível)

### 6.3. Áudio

- Sons de disparo, colisão, explosões, recolha de power-ups
- Música ambiente espacial com intensificação nos níveis superiores
- Faixa épica durante o confronto com o boss

## 7. Técnicos

### 7.1. Hardware

- Executável em qualquer browser moderno

### 7.2. Software

- HTML5 Canvas
- JavaScript com orientação a objetos
- Framework extend.js
- Sistema de armazenamento local para painel de pontuações

## 8. Arte do Jogo

- Estilo: Sci-fi moderno
- Recursos:
  - Sprites de naves, explosões, lasers
  - Boss visualmente imponente
  - Ícones de power-ups
- Fontes e assets de domínio livre (Kenney.nl, OpenGameArt)

---

## ✅ Checklist de Desenvolvimento - Galactic Firestorm

### 🔹 Entidades / Personagens

- [ ] Animações da nave (idle, mover, disparar)
- [ ] Disparo bidirecional
- [ ] Sprites variados para diferentes fases
- [ ] Animações e lógica da Estrela da Morte

### 🔹 Mundo Virtual

- [ ] Fundo animado com estrelas e planetas
- [ ] Movimento contínuo horizontal/vertical
- [ ] Design especial da zona do boss

### 🔹 Lógica de Jogo

- [ ] Movimento completo da nave (WASD)
- [ ] Detecção e resposta às colisões
- [ ] Dificuldade progressiva
- [ ] Sistema de níveis com mensagem de transição
- [ ] Combate contra boss com múltiplas fases
- [ ] Replay
- [ ] Power-ups funcionais (agilidade, escudo protetor)

### 🔹 Som

- [ ] Música de fundo dinâmica
- [ ] Sons de disparo e explosão
- [ ] Efeitos sonoros dos power-ups e boss
