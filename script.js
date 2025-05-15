//SELECTING ELEMENTS
const board = document.querySelector(".boxes");
const square = document.querySelectorAll(".box");
const resetbtn = document.querySelector(".reset-button");
const players = ["X", "O"];
let currentPlayer = players[0];

//CREATING MESSAGE VIA H2 TAG
const message = document.createElement("h2");
message.textContent = "X's Turn";
message.classList.add("h2");
board.after(message); //APPENDING TO DOM BUT AFTER BOXES

//CREATING WINNING COMBINATIONS
const winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//USING ALL THE CREATED FUNCTIONS CREATED BELOW

for (let i = 0; i < square.length; i++) {
  square[i].addEventListener("click", () => {
    if (square[i].textContent != "") {
      return;
    }
    //CHECKING FOR WIN
    square[i].textContent = currentPlayer;
    if (checkWin(currentPlayer)) {
      message.textContent = `GAME OVER ${currentPlayer} WINS`;
      return;
    }
    if (checkTie()) {
      message.textContent = `GAME IS TIED`;
      return;
    }
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    if (currentPlayer === players[0]) {
      message.textContent = "X's TURN";
    } else {
      message.textContent = "O's TURN";
    }
  });
}

//CREATING FUNCTION TO CHECK WIN
function checkWin(currentPlayer) {
  for (let i = 0; i < winningCombo.length; i++) {
    //DESTRUCTURING WINNING COMBO VALUES INTO A,B,C
    const [a, b, c] = winningCombo[i];
    if (
      square[a].textContent === currentPlayer &&
      square[b].textContent === currentPlayer &&
      square[c].textContent === currentPlayer
    ) {
      return true;
    }
  }
  return false;
}

//CREATING FUNCTION TO CHECK TIE

function checkTie() {
  for (let i = 0; i < square.length; i++) {
    if (square[i].textContent === "") {
      // Fixed here
      return false;
    }
  }
  return true;
}

// Inside reset function:
function reset() {
  for (let i = 0; i < square.length; i++) {
    square[i].textContent = "";
  }
  message.textContent = "X's Turn";
  currentPlayer = players[0];
}

resetbtn.addEventListener("click", reset);
