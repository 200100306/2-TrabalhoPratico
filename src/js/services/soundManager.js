/**
 * Gere os efeitos sonoros e música do jogo.
 */

export const sounds = {
  backgroundMusic: new Audio('./assets/sounds/space_music.mp3'),
  death: new Audio('./assets/sounds/death.mp3'),
  buttons: new Audio('./assets/sounds/button.mp3'),
  shot: new Audio('./assets/sounds/shot.mp3'),
  levelUp: new Audio('./assets/sounds/levelup.mp3'),
  enemyDeath: new Audio('./assets/sounds/enemydeath.mp3'),
  victory: new Audio('./assets/sounds/victory.mp3'),
  lifeLost: new Audio('./assets/sounds/life_lost.mp3'),
};

Object.values(sounds).forEach(audio => audio.load());
