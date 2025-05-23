/**
 * Serviço responsável por carregar os recursos gráficos (spritesheets).
 */

import { SpriteSheet } from "../assets/spritesheet.js";

/**
 * Carrega todos os sprites necessários para o jogo e executa um callback ao final.
 * @param {Object} spriteSheets - Objeto de destino para armazenar os sprites carregados
 * @param {Function} callback - Função a ser chamada após todos os recursos estarem prontos
 */
export function loadAllResources(spriteSheets, callback) {
  const resourcesToLoad = [
    { type: "ship", image: "./assets/player/ship.png", json: "./assets/enemies/ship.json" },
    { type: "bulletLifePowerup", image: "./assets/objects/bullet_life_powerup.png", json: "./assets/objects/bullet_life_powerup.json" },
    { type: "red", image: "./assets/enemies/red.png", json: "./assets/enemies/red.json" },
    { type: "green", image: "./assets/enemies/green.png", json: "./assets/enemies/green.json" },
    { type: "yellow", image: "./assets/enemies/yellow.png", json: "./assets/enemies/yellow.json" },
    { type: "blue", image: "./assets/enemies/blue.png", json: "./assets/enemies/blue.json" }
  ];

  let loaded = 0;
  resourcesToLoad.forEach(({ type, image, json }) => {
    fetch(json)
      .then(res => res.json())
      .then(data => {
        spriteSheets[type] = new SpriteSheet(image, data, () => {
          loaded++;
          if (loaded === resourcesToLoad.length) callback();
        });
      });
  });
}