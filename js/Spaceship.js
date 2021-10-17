import { Missile } from "./Missile.js";

export class Spaceship {
  missiles = [];
  #modifier = 10;
  #leftArrow = false;
  #rightArrow = false;
  constructor(element, container) {
    // recives htmlElement.spaceship and htmlElement.container
    this.element = element;
    this.container = container;
  }
  init() {
    this.setPosition();
    this.#eventListeners();
    this.#gameLoop();
  }
  setPosition() {
    // for spaceship initial positioning
    this.element.style.bottom = "0px";
    this.element.style.left = `${
      window.innerWidth / 2 - this.#getPosition()
    }px`;
  }
  #getPosition() {
    // helper function for setting up spaceship movement boundaries
    return this.element.offsetLeft + this.element.offsetWidth / 2;
  }
  #eventListeners() {
    // setting Listeners for arrow left and right - spaceship movement
    window.addEventListener("keydown", ({ code }) => {
      switch (code) {
        case "ArrowLeft":
          this.#leftArrow = true;
          break;
        case "ArrowRight":
          this.#rightArrow = true;
          break;
      }
    });
    window.addEventListener("keyup", ({ code }) => {
      switch (code) {
        case "ArrowLeft":
          this.#leftArrow = false;
          break;
        case "ArrowRight":
          this.#rightArrow = false;
          break;
        case "Space":
          this.#shot();
          break;
      }
    });
  }
  #gameLoop = () => {
    // fixing keydown standard behaviour (short pause after first letter) - refining spaceship movement animation
    this.#isKey();
    requestAnimationFrame(this.#gameLoop);
  };
  #isKey() {
    if (this.#leftArrow && this.#getPosition() > 12) {
      // 12 - width of the missile, prevents bug when spaceship is on the right edge
      this.element.style.left = `${
        parseInt(this.element.style.left, 10) - this.#modifier
      }px`;
    }
    if (this.#rightArrow && this.#getPosition() + 12 < window.innerWidth) {
      this.element.style.left = `${
        parseInt(this.element.style.left, 10) + this.#modifier
      }px`;
    }
  }
  #shot() {
    // creates new Missile object with starting coordinates exactly above Spaceship current location and pushes it to an array
    const missile = new Missile(
      this.#getPosition(),
      this.element.offsetTop,
      this.container
    );
    missile.init();
    this.missiles.push(missile);
  }
}
