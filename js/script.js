let receivedNumber = null;

function start() {
  askNumberOfCards();
}

function askNumberOfCards() {
  //prettier-ignore
  while (receivedNumber % 2 !== 0 || receivedNumber < 4 || receivedNumber > 14 ) {
    receivedNumber = parseInt(prompt("Com quantas cartas você quer jogar?"));
    }
}

start();
