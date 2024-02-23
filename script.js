const form = document.querySelector('.form');
const startGameBtn = document.getElementById('startGameBtn');
const gameForm = document.getElementById('gameForm');
const gameBoard = document.getElementById('gameBoard');
let player_turn = document.querySelector('.turn');

let player_1 = "";
let player_2 = "";
let currentPlayer = ""; // New variable to track the current player

startGameBtn.addEventListener('click', () => {
    player_1 = form.player1.value;
    player_2 = form.player2.value;

    // Hide the form and show the game board
    gameForm.style.display = 'none';
    gameBoard.style.display = 'grid';

    currentPlayer = player_1; // Set the current player to player 1
    player_turn.textContent = `${player_1}, you're up`;
});

let boardState = ['', '', '', '', '', '', '', '', ''];

const cells = document.querySelectorAll('.board .cell');

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (boardState[index] === '' && !checkWinner()) {
            cell.textContent = currentPlayer === player_1 ? "X" : "O";
            boardState[index] = currentPlayer === player_1 ? 'X' : 'O';

            if (checkWinner()) {
                player_turn.textContent = `${currentPlayer} congratulations, you won!`;
            } else if (!boardState.includes('')) {
                player_turn.textContent = 'It\'s a tie!';
            } else {
                currentPlayer = (currentPlayer === player_1) ? player_2 : player_1; // Switch player turns
                player_turn.textContent = `${currentPlayer}, you're up`;
            }
        }
    });
});

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (boardState[a] !== '' && boardState[a] === boardState[b] && boardState[b] === boardState[c]) {
            return true; // We have a winner
        }
    }

    return false;
}
