/*----- constants -----*/
const BOARD_LENGTH = 3;

/*----- app's state (variables) -----*/
let players = {
    one: 'O',
    two: 'X',
}
let board = [];
let player1Turn = true;
let messageArr = ['Player \'O\' Turn', 'Player \'X\' Turn', 'Tie Game!', 'Player \'O\' Won!', 'Player \'X\' Won!'];
let gameFinished = false;
let gameStateArr = ['tie', 'X', 'O'];
let gameState = '';
let messageBox = '';

/*----- cached element references -----*/
let myGrid = document.getElementById('board');
let squares = document.querySelectorAll('.square');
let resetBtn = document.getElementById('reset');
let message = document.querySelector('.message');


/*----- event listeners -----*/

myGrid.addEventListener('click', (e) => {
    let coord = convertIdToCoordinate(e.target.id);
    if (gameFinished) return;
    if (board[coord[0]][coord[1]] !== '') return;
    e.target.classList.remove('hover');
    playSound();
    if (player1Turn) {
        board[coord[0]][coord[1]] = players.one;
        player1Turn = false;
    } else {
        board[coord[0]][coord[1]] = players.two;
        player1Turn = true;
    }
    if (checkWinner(coord) || checkTie()) gameFinished = true;
    updateMessage();
    render();
});

myGrid.addEventListener('mouseover', (e) => {
    let coord = convertIdToCoordinate(e.target.id);
    if (gameFinished) return;
    if (e.target.id === 'board') return;
    if (board[coord[0]][coord[1]] !== '') return;
    e.target.classList.add('hover');
    if (player1Turn) {
        e.target.textContent = players.one;
    } else {
        e.target.textContent = players.two;
    }
});

myGrid.addEventListener('mouseout', (e) => {
    let coord = convertIdToCoordinate(e.target.id);
    if (gameFinished) return;
    if (e.target.id === 'board') return;
    if (board[coord[0]][coord[1]] !== '') return;
    e.target.classList.remove('hover');
    if (player1Turn) {
        e.target.textContent = "";
    } else {
        e.target.textContent = "";
    }
});

reset.addEventListener('click', (e) => {
    board = [];
    gameFinished = false;
    initializeBoard(board);
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
    updateMessage();
    render();
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
    renderMessage();
    renderBoard();
}

function renderBoard() {
    squares.forEach((square) => {
        let coord = convertIdToCoordinate(square.id);
        square.textContent = board[coord[0]][coord[1]];
    });
}

function renderMessage() {
    message.textContent = messageBox;
}

function checkWinner(coord) {
    let player = board[coord[0]][coord[1]];
    if (checkHorizontal(coord, player) || checkVertical(coord, player) || checkDiagonal(player)) {
        gameState = player;
        return true;
    }
    return false;
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
    gameState = gameStateArr[0];
    return true;
}

function updateMessage() {
    if (!gameFinished) {
        if (player1Turn) messageBox = messageArr[0];
        else messageBox = messageArr[1];
    } else {
        switch (gameState) {
            case 'X':
                messageBox = messageArr[4];
                break;
            case 'O':
                messageBox = messageArr[3];
                break;
            case 'tie':
                messageBox = messageArr[2];
                break;
        }
    }
}

function playSound() {
    const clickSound = new Audio('/media/click.wav');
    clickSound.play();
}

function startGame() {
    initializeBoard(board);
    render();
}

/*-- Start Game --*/
startGame();

