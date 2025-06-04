import { Level } from "./level.js";
import { PowerUp, LifePowerUp } from "../models/entities/powerups.js";
import { Red, Green, Blue, Yellow, Boss } from "../models/entities/enemies/index.js";

export const levels = [
  new Level(1, [{ type: Red, count: 5 }], [{ type: PowerUp, count: 1 }], "Nível 1: Introdução básica ao jogo."),
  new Level(2, [{ type: Red, count: 8 }, { type: Yellow, count: 4 }], [{ type: PowerUp, count: 1 }], "Nível 2: Introdução de inimigos amarelos com movimentos mais dinâmicos."),
  new Level(3, [{ type: Red, count: 12 },{ type: Yellow, count: 8 },{ type: Green, count: 4 }], [{ type: PowerUp, count: 1 },{ type: LifePowerUp, count: 1 }
  ], "Nível 3: Aumento da diversidade e quantidade de inimigos."),
  new Level(4, [
    { type: Red, count: 16 },
    { type: Yellow, count: 12 },
    { type: Green, count: 6 },
    { type: Blue, count: 5 }
  ], [{ type: PowerUp, count: 1 }], "Nível 4: Dificuldade elevada com um número maior de inimigos."),
  new Level(5, [
    { type: Red, count: 20 },
    { type: Yellow, count: 15 },
    { type: Green, count: 8 },
    { type: Blue, count: 7 }
  ], [
    { type: PowerUp, count: 1 },
    { type: LifePowerUp, count: 1 }
  ], "Nível 5: Teste final com o máximo de inimigos e power-ups."),
  new Level(6, [
    { type: Red, count: 15 },
    { type: Yellow, count: 10 },
    { type: Green, count: 10 },
    { type: Blue, count: 10 }
  ], [{ type: PowerUp, count: 2 }], "Nível 6: Tu Não Vais Sobreviver."),
  new Level(7, [
    { type: Red, count: 20 },
    { type: Yellow, count: 15 },
    { type: Green, count: 10 },
    { type: Blue, count: 10 },
    { type: Boss, count: 1 }
  ], [{ type: PowerUp, count: 2 }], "Nível 7: Estrela da morte."),
];
