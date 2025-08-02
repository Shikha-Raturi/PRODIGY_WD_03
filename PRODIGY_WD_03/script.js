const cells = document.querySelectorAll('[data-cell]');
const messageBox = document.getElementById('message');
const winnerMessage = document.getElementById('winnerMessage');
const restartButton = document.getElementById('restartButton');
const currentTurnSpan = document.getElementById('currentTurn');

let isXTurn = true;

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

startGame();

function startGame() {
  isXTurn = true;
  updateTurnIndicator();
  cells.forEach(cell => {
    cell.classList.remove('X', 'O');
    cell.textContent = '';
    cell.addEventListener('click', handleClick, { once: true });
  });
  messageBox.classList.add('hide');
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'X' : 'O';
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    updateTurnIndicator();
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.textContent = currentClass;
}

function swapTurns() {
  isXTurn = !isXTurn;
}

function updateTurnIndicator() {
  currentTurnSpan.textContent = isXTurn ? 'X' : 'O';
}

function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('X') || cell.classList.contains('O');
  });
}

function endGame(draw) {
  if (draw) {
    winnerMessage.textContent = "🤝 It's a Draw!";
  } else {
    winnerMessage.textContent = `🎉 ${isXTurn ? 'X' : 'O'} Wins!`;
  }
  messageBox.classList.remove('hide');
}

restartButton.addEventListener('click', startGame);
