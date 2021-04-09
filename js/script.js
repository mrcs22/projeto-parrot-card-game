const timerHtmlElemnt = document.getElementById("timer");
const container = document.querySelector(".container");
//prettier-ignore
const imageNames = ["bobross","explody","fiesta","metal","revertit","triplets","unicorn"];

let timer = null;
let receivedNumber = null;
let lastSelectedCard = null;
let isBoardLocked = false;
let victoryTrack = 0;
let moves = 0;

start();

function start() {
  askNumberOfCards();
  resizeContainer();
  renderCards(receivedNumber);
  startTimer();
}

function askNumberOfCards() {
  //prettier-ignore
  while (receivedNumber % 2 !== 0 || receivedNumber < 4 || receivedNumber > 14 ) {
    receivedNumber = parseInt(prompt("Com quantas cartas você quer jogar?"));
    }
}

function resizeContainer() {
  let sizingClass = null;

  switch (receivedNumber) {
    case 4:
      sizingClass = "mini";
      break;
    case 6:
      sizingClass = "small";
      break;
    case 8:
      sizingClass = "normal";
      break;
    case 10:
      sizingClass = "large";
      break;
    case 12:
      sizingClass = "xlarge";
      break;
  }

  if (sizingClass !== null) {
    container.classList.toggle(sizingClass);
  }
}

function renderCards() {
  const imageNames = getRandomImageNames();

  imageNames.forEach((imageName) => renderCardDiv(imageName));
}

function getRandomImageNames() {
  let randomImageNames = [];

  while (randomImageNames.length < receivedNumber / 2) {
    const randomIndex = parseInt(Math.random() * 7);
    const name = imageNames[randomIndex];

    if (randomImageNames.indexOf(name) === -1) {
      randomImageNames.push(name);
    }
  }

  randomImageNames = [...randomImageNames, ...randomImageNames];
  randomImageNames.sort(comparador);

  return randomImageNames;
}
function comparador() {
  return Math.random() - 0.5;
}

function renderCardDiv(name) {
  const div = document.createElement("div");
  div.classList.add("card");
  div.setAttribute("id", name);
  div.addEventListener("click", () => handleCardSelection(div));

  const backImage = document.createElement("img");
  backImage.classList.add("back-card");
  backImage.setAttribute("src", `./img/${name}parrot.gif`);

  const frontImage = document.createElement("img");
  frontImage.setAttribute("src", "./img/front.png");

  div.appendChild(backImage);
  div.appendChild(frontImage);

  container.appendChild(div);
}
function handleCardSelection(selectedCard) {
  const isCardLocked = selectedCard.classList.contains("locked");

  if (isCardLocked || isBoardLocked) {
    return;
  }

  selectedCard.classList.add("flipped", "locked");

  if (lastSelectedCard === null) {
    lastSelectedCard = selectedCard;
  } else if (selectedCard.id === lastSelectedCard.id) {
    victoryTrack++;
    lastSelectedCard = null;
  } else {
    isBoardLocked = true;

    setTimeout(() => {
      selectedCard.classList.remove("flipped", "locked");

      lastSelectedCard.classList.remove("flipped", "locked");
      lastSelectedCard = null;

      isBoardLocked = false;
    }, 1000);
  }

  moves++;
  checkForVictory();
}
function checkForVictory() {
  const time = parseInt(timerHtmlElemnt.innerHTML);
  const victory = receivedNumber / 2;
  if (victoryTrack === victory) {
    isBoardLocked = true;

    clearInterval(timer);

    setTimeout(() => {
      alert(`Você ganhou em ${moves} jogadas e levou ${time} segundos!`);
      askForNewGame();
    }, 200);
  }
}
function askForNewGame() {
  const answer = window.confirm("Deseja jogar novamente?");

  if (answer) {
    container.innerHTML = "";
    resizeContainer();

    receivedNumber = null;
    isBoardLocked = false;
    lastSelectedCard = null;
    victoryTrack = 0;
    moves = 0;
    timerHtmlElemnt.innerHTML = "000";

    start();
  }
}

function startTimer() {
  timer = setInterval(() => {
    let time = parseInt(timerHtmlElemnt.innerHTML);
    time++;
    if (time < 10) {
      time = `00${time}`;
    } else {
      time = `0${time}`;
    }

    timerHtmlElemnt.innerHTML = time;
  }, 1000);
}
