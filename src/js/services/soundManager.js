/**
 * Gere os efeitos sonoros e música do jogo.
 */

export const sounds = {
  backgroundMusic: new Audio('./assets/space_music.mp3'),
  death: new Audio('./assets/death.mp3'),
  buttons: new Audio('./assets/button.mp3'),
  shot: new Audio('./assets/shot.mp3'),
  levelUp: new Audio('./assets/levelup.mp3'),
  enemyDeath: new Audio('./assets/enemydeath.mp3'),
  victory: new Audio('./assets/victory.mp3'),
  lifeLost: new Audio('./assets/life_lost.mp3'),
};

Object.values(sounds).forEach(audio => audio.load());
