const form = document.querySelector('.form');
const startGameBtn = document.getElementById('startGameBtn');
const gameForm = document.getElementById('gameForm');
const gameBoard = document.getElementById('gameBoard');
let player_turn = document.querySelector('.turn');

let player_1 = "";
let player_2 = "";

startGameBtn.addEventListener('click', () => {
    player_1 = form.player1.value;
    player_2 = form.player2.value;

    // Hide the form and show the game board
    gameForm.style.display = 'none';
    gameBoard.style.display = 'grid';

    player_turn.textContent = `${player_1}, you're up`;
});

let turn = 1;
let boardState = ['', '', '', '', '', '', '', '', '']; // Represents the state of each cell on the board

const cells = document.querySelectorAll('.board .cell');

cells.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (boardState[index] === '' && !checkWinner()) {
            if (turn % 2 === 1) {
                player_turn.textContent = `${player_1}, you're up`;
                cell.textContent = "X";
                boardState[index] = 'X';
            } else {
                player_turn.textContent = `${player_2}, you're up`;
                cell.textContent = "O";
                boardState[index] = 'O';
            }
            turn++;

            if (checkWinner()) {
                player_turn.textContent = `${turn % 2 === 0 ? player_1 : player_2} congratulations, you won!`;
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

    // Check for a tie
    if (!boardState.includes('')) {
        player_turn.textContent = 'It\'s a tie!';
        return true;
    }

    return false;
}
