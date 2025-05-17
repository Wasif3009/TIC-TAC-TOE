//SELECTING ELEMENTS
const board = document.querySelector(".boxes");
const square = document.querySelectorAll(".box");
const resetbtn = document.querySelector(".reset-button");
const players = ["X", "O"];
let currentPlayer = players[0];
//ADDING NEW ADDING TO STOP THE GAME AFTER WINNING
let gameActive = true;

// board: Selects the container holding the boxes.
// square: Selects all the 9 tic-tac-toe boxes.
// resetbtn: Selects the reset button.
// players: Array for the two players (X and O).
// currentPlayer: Keeps track of whose turn it is, starting with X.
//////////////////////////////////////////////////////////////////////////////////////
//CREATING MESSAGE VIA H2 TAG
const message = document.createElement("h2");
//WAHA PE YE LINE ISLIYE LIKHE H KI AGAR GAME CHALU NAHI HUA HO TOH FIR NHI "X's Turn" LIKH KE AANA CHAIYE
message.textContent = "X's Turn";
message.classList.add("h2");
board.after(message); //APPENDING TO DOM BUT AFTER BOXES
// Creates an <h2> element to display game status (whose turn, winner, or tie).
// Initially shows "X's Turn".
// Adds a CSS class h2 to it.
// Places the message after the .boxes container in the DOM.
//////////////////////////////////////////////////////////////////////////////////////
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
//Main Game Logic - Adding Click Event to Each Box

for (let i = 0; i < square.length; i++) {
  square[i].addEventListener("click", () => {
    //YAHA PE YE H KI AGAR SAARE BOX FILLED H YA FIR gameActive FALSE HOGA TOH RETURN HOJAYEGA AUR USKE AAGE KA KUCH BHI NAHI CHALEGA
    if (square[i].textContent !== "" || !gameActive) {
      return;
    }
    square[i].textContent = currentPlayer;
    //CHECKING FOR WIN
    if (checkWin(currentPlayer)) {
      message.textContent = `GAME OVER ${currentPlayer} WINS`;
      gameActive = false;
      return;
    }
    if (checkTie()) {
      message.textContent = `GAME IS TIED`;
      gameActive = false;
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
// Adds a click event to each box.
// If box is already filled, it exits.
// Marks the box with currentPlayer’s symbol.
// Checks for a win:
// If currentPlayer has won, updates message and stops further action.
// Checks for a tie:
// If all boxes filled with no winner, updates message.
// Switches player:
// Alternates between X and O.
// Updates message to show whose turn it is next.
//////////////////////////////////////////////////////////////////////////////////////

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
// Iterates over all winning combinations.
// Checks if the 3 squares in a combination are filled by the same player.
// Returns true if a win is found.
//////////////////////////////////////////////////////////////////////////////////////

//CREATING FUNCTION TO CHECK TIE

function checkTie() {
  for (let i = 0; i < square.length; i++) {
    if (square[i].textContent === "") {
      return false;
    }
  }
  return true;
}
// Loops through all squares.
// If any square is empty, it's not a tie.
// If all squares are filled, returns true (tie).
//////////////////////////////////////////////////////////////////////////////////////

// Inside reset function:
function reset() {
  for (let i = 0; i < square.length; i++) {
    square[i].textContent = "";
  }
  message.textContent = "X's Turn";
  currentPlayer = players[0];
}

resetbtn.addEventListener("click", reset);
// Clears all squares (empties text content).
// Resets message to "X's Turn".
// Sets currentPlayer back to X.
// Adds an event listener to reset button to trigger this function.
