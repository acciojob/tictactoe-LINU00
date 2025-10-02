let player1 = '';
let player2 = '';
let turn = 'X';
let board = Array(9).fill('');

const submitBtn = document.getElementById('submit');
const playerForm = document.querySelector('.player-form');
const gameBoard = document.querySelector('.game-board');
const messageDiv = document.querySelector('.message');
const cells = document.querySelectorAll('.cell');

submitBtn.addEventListener('click', () => {
    player1 = document.getElementById('player-1').value.trim();
    player2 = document.getElementById('player-2').value.trim();

    if (player1 === '' || player2 === '') {
        alert('Please enter both player names!');
        return;
    }

    playerForm.style.display = 'none';
    gameBoard.style.display = 'block';
    updateMessage();
});

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const id = cell.id - 1;
        if (board[id] !== '') return;

        board[id] = turn;
        cell.textContent = turn;

        if (checkWinner()) {
            messageDiv.textContent = `${turn === 'X' ? player1 : player2}, congratulations you won!`;
            cells.forEach(c => c.style.pointerEvents = 'none');
            return;
        }

        if (!board.includes('')) {
            messageDiv.textContent = "It's a tie!";
            return;
        }

        turn = turn === 'X' ? 'O' : 'X';
        updateMessage();
    });
});

function updateMessage() {
    messageDiv.textContent = `${turn === 'X' ? player1 : player2}, you're up`;
}

function checkWinner() {
    const winCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    return winCombos.some(combo => {
        const [a, b, c] = combo;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}
