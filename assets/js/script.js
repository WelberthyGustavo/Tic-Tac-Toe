const cells = document.querySelectorAll('div[id^="cell-"]');
let currentPlayer = 'X';

const restartButton = document.getElementById('restart-button');

const xClose = document.getElementById('xClose')
const modal = document.getElementById('modal')
const content = document.getElementById('content')

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

function checkWinner(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lines
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colluns
        [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (cells[a].textContent === player &&
            cells[b].textContent === player &&
            cells[c].textContent === player) {
            return true; // Player Won
        }
    }
    return false; // Nobody Won
}

function handleCellClick(event) {
    const clickedCell = event.currentTarget; 
    const paragraph = clickedCell.querySelector('p'); 

    if (!paragraph.textContent.trim()) {
        paragraph.textContent = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (checkWinner('X')) {
            showWinner('Player X');
        } else if (checkWinner('O')) {
            showWinner('Player O');
        } else if (isBoardFull()) {
            showWinner('Nobody');
        }
    }
}

function isBoardFull() {
    return Array.from(cells).every(cell => cell.querySelector('p').textContent.trim() !== '');
}

function showWinner(result) {
    setTimeout(() => {
        modal.style.setProperty('display', 'flex');
        content.textContent = `${result} Won!!!`;
    }, 100);
}

restartButton.addEventListener('click', function() {
    cells.forEach(cell => {
        const paragraph = cell.querySelector('p');
        paragraph.textContent = '';
    });

    currentPlayer = 'X';
});



/* Modal */

function handleClick() {
    modal.style.setProperty('display', 'none');
}

xClose.addEventListener('click', handleClick);