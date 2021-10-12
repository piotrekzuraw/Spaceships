import { Spaceship } from "./Spaceship.js";

class Game {
  #htmlElements = {
    spaceship: document.querySelector("[data-spaceship]"),
    container: document.querySelector("[data-container]"),
  };

  #ship = new Spaceship(
    this.#htmlElements.spaceship,
    this.#htmlElements.container
  );
  #checkPositionInterval = null;
  init() {
    this.#ship.init();
    this.#newGame();
  }
  #newGame() {
    this.#checkPositionInterval = setInterval(() => this.#checkPosition(), 1);
  }
  #checkPosition() {
    // checks if are there any Missiles outside visible browser area and deletes them from DOM and missiles array
    this.#ship.missiles.forEach((missile, missileIndex, missileArray) => {
      const missilePosition = {
        top: missile.element.offsetTop,
        right: missile.element.offsetLeft + missile.element.offsetWidth,
        bottom: missile.element.offsetTop + missile.element.offsetHeight,
        left: missile.element.offsetLeft,
      };
      if (missilePosition.bottom < 0) {
        missile.removeMissile();
        missileArray.splice(missileIndex, 1);
      }
    });
  }
}

window.onload = function () {
  const newGame = new Game();
  newGame.init();
};
