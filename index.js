// Game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Winning combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle form submission on names.html
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('name-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const player1 = document.getElementById('player1').value || 'Player 1';
            const player2 = document.getElementById('player2').value || 'Player 2';
            localStorage.setItem('player1', player1);
            localStorage.setItem('player2', player2);
            window.location.href = './game.html';
        });
    }

    // Load player names on game.html
    const player1NameSpan = document.getElementById('player1-name');
    const player2NameSpan = document.getElementById('player2-name');
    if (player1NameSpan && player2NameSpan) {
        const player1 = localStorage.getItem('player1') || 'Player 1';
        const player2 = localStorage.getItem('player2') || 'Player 2';
        player1NameSpan.textContent = `${player1} (X)`;
        player2NameSpan.textContent = `${player2} (O)`;
    }
});

// Handle cell clicks
function makeMove(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementById(`cell-${index}`).textContent = currentPlayer;
        checkWinner();
        if (gameActive) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updateStatus();
        }
    }
}

// Check for a winner or draw
function checkWinner() {
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            const winner = currentPlayer === 'X' ? localStorage.getItem('player1') : localStorage.getItem('player2');
            showWinnerPopup(`${winner} wins!`);
            return;
        }
    }
    if (!gameBoard.includes('')) {
        gameActive = false;
        showWinnerPopup("It's a draw!");
    }
}

// Update game status
function updateStatus() {
    const currentPlayerName = currentPlayer === 'X' ? localStorage.getItem('player1') : localStorage.getItem('player2');
    document.getElementById('game-status').textContent = `${currentPlayerName}'s turn (${currentPlayer})`;
}

// Restart the game
function restartGame() {
    currentPlayer = 'X';
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    document.getElementById('game-status').textContent = `${localStorage.getItem('player1')}'s turn (X)`;
    for (let i = 0; i < 9; i++) {
        document.getElementById(`cell-${i}`).textContent = '';
    }
    closePopup(); // Close popup if open
}

// Show winner popup
function showWinnerPopup(message) {
    const popup = document.getElementById('winner-popup');
    const winnerMessage = document.getElementById('winner-message');
    winnerMessage.textContent = message;
    popup.classList.remove('hidden');
    popup.classList.add('show');
}

// Close winner popup
function closePopup() {
    const popup = document.getElementById('winner-popup');
    popup.classList.remove('show');
    popup.classList.add('hidden');
}