const Game = require('./game');
const GameView = require('./game_view');
const Avatar = require('./avatar');
const ModalManager = require('./modal');

document.addEventListener("DOMContentLoaded", function(){
  const canvasEl = document.getElementById("game-canvas");
  const game = new Game();

  canvasEl.width = Game.DIM_X;
  canvasEl.height = Game.DIM_Y;

  const ctx = canvasEl.getContext("2d");
  new GameView({ game, ctx }).start();
});

document.addEventListener("click", function() {
  new ModalManager().closeModal();
})
