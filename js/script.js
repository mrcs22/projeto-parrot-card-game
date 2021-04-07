const container = document.querySelector(".container");
//prettier-ignore
const imageNames = ["bobross","explody","fiesta","metal","revertit","triplets","unicorn"];
let receivedNumber = null;
let lastSelectedCard = null;
let isBoardLocked = false;
let victoryTrack = 0;
let moves = 0;

function start() {
  askNumberOfCards();
  resizeContainer();
  renderCards(receivedNumber);
}

start();

function askNumberOfCards() {
  //prettier-ignore
  while (receivedNumber % 2 !== 0 || receivedNumber < 4 || receivedNumber > 14 ) {
    receivedNumber = parseInt(prompt("Com quantas cartas você quer jogar?"));
    }
}

function resizeContainer() {
  let sizingClass = "";
  console.log(receivedNumber);
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
  if (sizingClass) {
    container.classList.add(sizingClass);
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

  return randomImageNames;
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
  frontImage.setAttribute("src", "./img/front.jpeg");

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
  const victory = receivedNumber / 2;
  if (victoryTrack === victory) {
    isBoardLocked = true;
    alert(`Você ganhou em ${moves} jogadas!`);
  }
}
