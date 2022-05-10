const images = document.querySelector(".images");
const moves = document.querySelector(".moves");
const startGameBtn = document.querySelector(".startGameBtn");
const resetGameBtn = document.querySelector(".resetGameBtn");
const script = document.querySelector(".script");
const inst = document.querySelector(".inst");

class App {
  #sound = new Audio("audio/audio.mp3");

  #matchSound = new Audio("audio/match.wav");

  #movesCounter = 0;

  #showingArray = [];

  #suffelldArray;

  #currImg;

  #imagesCopy;

  #state = false;

  #i;

  #imagesArray = [
    "img/cat.png",
    "img/cat.png",
    "img/elephant.png",
    "img/elephant.png",
    "img/dog.png",
    "img/dog.png",
    "img/croc.png",
    "img/croc.png",
    "img/horse.png",
    "img/horse.png",
    "img/lion.png",
    "img/lion.png",
    "img/rat.png",
    "img/rat.png",
    "img/panda.png",
    "img/panda.png",
  ];
  constructor() {
    this._start();

    images.addEventListener("click", this._playGame.bind(this));

    resetGameBtn.addEventListener("click", this._resetGame.bind(this));

    startGameBtn.addEventListener("click", this._startGame.bind(this));
  }
  _start() {
    this.#imagesCopy = [...this.#imagesArray];
    this._suffleImages(this.#imagesCopy);
    this.#imagesCopy.forEach((i) => {
      const html = `
      <div class="transition imgDiv">
      <img src="${i}" alt="" class="hidden dImg"></div>
      `;
      images.insertAdjacentHTML("beforeend", html);
    });
  }
  _showImg() {
    console.log("here");
    console.log(dImg);
  }
  _suffleImages(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * i);
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    this.#suffelldArray = array;
  }
  _playGame(e) {
    // check game state
    if (!this.#state) return;
    // play sound
    this.#sound.play();
    // clear instructions
    this._clearInst();
    // Assign current image
    this.#currImg = e.target.firstElementChild;

    // Add and display moves
    this._moves();
    // Display images
    this._displayImg();
    // Add game mechanics
    this._mechanics();
    // for win
    this._forWin();
  }
  _clearInst() {
    resetGameBtn.classList.remove("hiddden");
    inst.classList.add("hiddden");
  }
  _displayInst() {
    startGameBtn.classList.add("hiddden");
    inst.classList.remove("hiddden");
  }
  _moves() {
    this.#movesCounter++;
    moves.textContent = `moves: ${this.#movesCounter}`;
  }
  _displayImg() {
    this.#currImg.closest("div").classList.add("imgDivTrans");
    this.#currImg.classList.add("showing");
    this.#showingArray.push(this.#currImg);
  }
  _mechanics() {
    if (this.#showingArray.length <= 1) return;
    if (this.#showingArray.length >= 1) {
      for (this.#i = 0; this.#i < this.#showingArray.length; this.#i++) {
        if (this.#showingArray.length <= 1) return;
        if (this.#showingArray[this.#i].src !== this.#currImg.src)
          this._diffImg();
        else {
          this._sameImg();
        }
      }
    }
  }
  _diffImg() {
    this.#showingArray[this.#i].closest("div").classList.remove("imgDivTrans");
    this.#showingArray[this.#i].classList.remove("showing");
    this.#showingArray.shift();
  }
  _sameImg() {
    this.#showingArray[this.#i].classList.add("match");
    this.#currImg.classList.add("match");
    this.#matchSound.play();
    this.#showingArray.shift();
    this.#showingArray.shift();
  }
  _forWin() {
    if (
      document.querySelectorAll(".match").length === this.#imagesArray.length
    ) {
      moves.textContent = `You won with ${this.#movesCounter} moves`;
    }
  }
  _resetGame() {
    images.textContent = "";
    this.#state = false;
    resetGameBtn.classList.add("hiddden");
    startGameBtn.classList.remove("hiddden");
    moves.textContent = "";
    this.#movesCounter = 0;
    this.#showingArray = [];
    this._start();
  }
  _startGame() {
    this.#state = true;
    this._default();
    this.#imagesCopy.forEach((i) => {
      const html = `
      <div class="imgDivWhite"><img src="${i}" alt="" class="dImg"></div>
      `;
      images.insertAdjacentHTML("beforeend", html);
    });
    setTimeout(() => {
      this._default();
      this.#imagesCopy.forEach((i) => {
        const html = `
          <div class="imgDiv transition"><img src="${i}" alt="" class="hidden dImg"></div>
          `;
        images.insertAdjacentHTML("beforeend", html);
      });
    }, 3000);
    this._displayInst();
  }
  _default() {
    images.textContent = "";
    moves.textContent = "";
    this.#movesCounter = 0;
    this.#showingArray = [];
  }
}

const app = new App();
