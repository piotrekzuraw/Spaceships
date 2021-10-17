export class Enemy {
  constructor(container, intervalTime, enemyClass, explosionClass, lives = 1) {
    this.container = container;
    this.element = document.createElement("div");
    this.enemyClass = enemyClass;
    this.interval = null;
    this.intervalTime = intervalTime;
    this.lives = lives;
    this.explosionClass = explosionClass;
  }
  init() {
    this.#setEnemy();
    this.#updateEnemyPosition();
  }
  #setEnemy() {
    this.element.classList.add(this.enemyClass);
    this.container.appendChild(this.element);
    this.element.style.top = "0px";
    this.element.style.left = `${this.#randomPosition()}px`;
  }
  #randomPosition() {
    // generates random placement for Enemies
    return Math.floor(
      Math.random() * (window.innerWidth - this.element.offsetWidth)
    );
  }
  #updateEnemyPosition() {
    this.interval = setInterval(
      () => this.#setNewPosition(),
      this.intervalTime
    );
  }
  #setNewPosition() {
    this.element.style.top = `${this.element.offsetTop + 1}px`;
  }
  hit() {
    this.lives--;
    if (!this.lives) {
      this.removeEnemy();
    }
  }
  removeEnemy() {
    this.element.classList.remove(this.enemyClass);
    this.element.classList.add(this.explosionClass);
    clearInterval(this.interval);
    const animationTime = parseInt(
      getComputedStyle(document.documentElement).getPropertyValue(
        "--explosion-animation-duration"
      ),
      10
    );
    setTimeout(() => this.element.remove(), animationTime);
  }
}
