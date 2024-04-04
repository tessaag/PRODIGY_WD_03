const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let gameMode = ''; // 'player' or 'ai'

const winPatterns = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

function handleCellClick(event) {
  const cellIndex = event.target.dataset.index;
  if (boardState[cellIndex] === '' && gameActive) {
    boardState[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    if (gameMode === 'ai' && currentPlayer === 'O' && gameActive) {
      makeAIMove();
    }
  }
}

function makeAIMove() {
  let emptyCells = [];
  boardState.forEach((cell, index) => {
    if (cell === '') {
      emptyCells.push(index);
    }
  });
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const aiMove = emptyCells[randomIndex];
  boardState[aiMove] = 'O';
  cells[aiMove].textContent = 'O';
  checkWinner();
  currentPlayer = 'X';
}

function checkWinner() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
      message.textContent = `${boardState[a]} wins!`;
      gameActive = false;
      return;
    }
  }
  if (!boardState.includes('')) {
    message.textContent = 'It\'s a draw!';
    gameActive = false;
  }
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

// Determine the game mode
if (document.getElementById('playerButton')) {
  gameMode = 'player';
} else if (document.getElementById('aiButton')) {
  gameMode = 'ai';
}
