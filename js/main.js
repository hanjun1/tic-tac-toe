/*----- constants -----*/
const BOARD_LENGTH = 3;

/*----- app's state (variables) -----*/
let players = {
    one: 'O',
    two: 'X',
}
let board = [];
let player1Turn = true;
let gameFinished = false;


/*----- cached element references -----*/
let myGrid = document.getElementById('board');
let gameState = document.getElementById('message');
let squares = document.querySelectorAll('.square');
let resetBtn = document.getElementById('reset');


/*----- event listeners -----*/

myGrid.addEventListener('click', (e) => {
    let coord = convertIdToCoordinate(e.target.id);
    if (gameFinished) return;
    if (board[coord[0]][coord[1]] !== '') return;
    if (player1Turn) {
        board[coord[0]][coord[1]] = players.one;
        player1Turn = false;
    } else {
        board[coord[0]][coord[1]] = players.two;
        player1Turn = true;
    }
    if (checkWinner(coord) || checkTie()) gameFinished = true;
    render();
});

reset.addEventListener('click', (e) => {
    board = [];
    gameFinished = false;
    initializeBoard(board);
    console.log(board);
    render();
});

/*----- functions -----*/

function initializeBoard(board) {
    for (let i=0; i<BOARD_LENGTH; i++) {
        let row = [];
        for (let j=0; j<BOARD_LENGTH; j++) {
            row.push('');
        }
        board.push(row);
    }
}

function convertIdToCoordinate(id) {
    if (id < 3) {
        return [0, parseInt(id)];
    } else if (id < 6) {
        return [1, id-3];
    } else if (id < 9) {
        return [2, id-6];
    }
}

function render() {
    renderBoard();
}

function renderBoard() {
    squares.forEach((square) => {
        let coord = convertIdToCoordinate(square.id);
        square.textContent = board[coord[0]][coord[1]];
    });
}

function checkWinner(coord) {
    let player = board[coord[0]][coord[1]];
    return checkHorizontal(coord, player) || checkVertical(coord, player) || checkDiagonal(player);
}

function checkHorizontal(coord, player) {
    let winCond = player === 'X' ? 'XXX' : 'OOO';
    let result = '';
    for (let i = 0; i <BOARD_LENGTH; i++) {
        result += board[coord[0]][i];
    }
    if (winCond === result) return true;
    return false;
}

function checkVertical(coord, player) {
    let winCond = player === 'X' ? 'XXX' : 'OOO';
    let result = '';
    for (let i = 0; i <BOARD_LENGTH; i++) {
        result += board[i][coord[1]];
    }
    if (winCond === result) return true;
    return false;
}

function checkDiagonal(player) {
    let winCond = player === 'X' ? 'XXX' : 'OOO';
    let result1 = board[0][0] + board[1][1] + board[2][2];
    let result2 = board[2][0] + board[1][1] + board[0][2];

    return winCond === result1 || winCond === result2;
}

function checkTie() {
    for (let i = 0; i <BOARD_LENGTH; i++) {
        for (let j = 0; j <BOARD_LENGTH; j++) {
            if (board[i][j] === '') return false;
        }
    }
    return true;
}

initializeBoard(board);
renderBoard();

// -----------------------------
const table = document.querySelector('table');
table.addEventListener('click', (e) => {
    let column = e.target.cellIndex;
    let row = e.target.parentElement.rowIndex;
    console.log(row);
});