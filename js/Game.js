import { Spaceship } from "./Spaceship.js";

class Game {
  #htmlElements = {
    spaceship: document.querySelector("[data-spaceship]"),
  };

  #ship = new Spaceship(this.#htmlElements.spaceship);
  init() {
    this.#ship.init();
  }
}

window.onload = function () {
  const newGame = new Game();
  newGame.init();
};
