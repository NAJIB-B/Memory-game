const images = document.querySelector(".images");
const moves = document.querySelector(".moves");
const startGameBtn = document.querySelector(".startGameBtn");
const script = document.querySelector(".script");
const inst = document.querySelector(".inst");

let suffelldArray;
const imagesArray = [
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

let sound = new Audio("audio/audio.mp3");
let matchSound = new Audio("audio/match.wav");

const suffleImages = function (array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 0));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  suffelldArray = array;
};

const start = function () {
  const imagesCopy = [...imagesArray];
  suffleImages(imagesCopy);
  imagesCopy.forEach((i) => {
    console.log(i);
    const html = `
    <div class="imgDiv"><img src="${i}" alt="" class="hidden"></div>
    `;
    images.insertAdjacentHTML("beforeend", html);
  });
};
start();
startGameBtn.addEventListener("click", function (e) {
  e.preventDefault();
  window.location.reload();
});

let movesCounter = 0;
let showingArray = [];
images.addEventListener("click", function (e) {
  sound.play();
  startGameBtn.classList.remove("hiddden");
  inst.classList.add("hiddden");
  movesCounter++;
  moves.textContent = `moves: ${movesCounter}`;
  const currImg = e.target.firstElementChild;
  currImg.classList.add("showing");
  currImg.closest("div").style.backgroundColor = "white";
  showingArray.push(currImg);

  if (showingArray.length <= 1) return;
  if (showingArray.length >= 1) {
    for (let i = 0; i < showingArray.length; i++) {
      if (showingArray.length <= 1) return;
      if (showingArray[i].src !== currImg.src) {
        showingArray[i].closest("div").style.backgroundColor = "green";
        showingArray[i].classList.remove("showing");
        showingArray.shift();
      } else {
        showingArray[i].classList.add("match");
        currImg.classList.add("match");
        matchSound.play();
        showingArray.shift();

        showingArray.shift();
      }
    }
  }
  if (document.querySelectorAll(".match").length === imagesArray.length) {
    moves.textContent = `You won with ${movesCounter} moves`;
  }
  //       console.log("removed showing from dog");
  //       x++;
  //       console.log(x);
  //       console.log(currentlyShowing);
  //       // if (document.getElementsByClassName("showing").length <= 1) return;
  //     } else {
  //       currentlyShowing[i].classList.add("match");

  //       currImg.classList.add("match");
  //     }
  //   }
  // }
});

// }
//   // moves++;
//   let curr = event.currentTarget.children
//   let currImg = curr[0]
//  var currentlyshowing = document.getElementsByClassName('showimg');
//   currentlyshowing = document.getElementsByClassName('showimg');
//   let flag=0;
//   if(currentlyshowing.length >= 1){
//       for(let i=0;i<currentlyshowing.length;i++)
//       {
//           if(currentlyshowing[i].src != currImg.src)
//           currentlyshowing[i].classList.remove('showimg');
//           else{
//               currentlyshowing[i].classList.add('match');
//               currImg.classList.add('match')
//               flag=1;
//           }
//       }
//   }

// e.target.firstElementChild.classList.remove("hidden");
//     e.target.firstElementChild.classList.add("showing");
//     const currentShowing = document.querySelectorAll(".showing");
//     console.log(currentShowing);
//     currentShowing.forEach((cs) => {
//       for (let i = currentShowing.length - 1; i >= 1; i--) {
//         if (cs.src !== currImg.src) {
//           cs.classList.remove("showing");
//           cs.classList.add("hidden");
//         } else {
//           currImg.classList.remove("showing");
//           currImg.classList.add("match");
//           cs.classList.remove("showing");
//           cs.classList.add("match");
//         }
//       }

// const hi = document.getElementsByClassName("hi");
// let hey = document.getElementsByClassName("hey");
// it will return an html collection with <p class="hey"> one</p> as the only element
// then if i add hey class to hi
// hi.classList.add("hey")
//add i getElementsByClassName("hey")
// hey = document.getElementsByClassName("hey");
//then it will return an html collection with
//  <p class="hi hey"> two </p>  as the first item
// and <p class="hey"> one</p> as the second item

// my question is that is it possible for <p class="hey"> one</p> to be the first item since it
// was the first element to have the class name hey
// and <p class="hi hey"> two </p> to be the second item
