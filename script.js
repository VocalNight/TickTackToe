const Cell = () => {
    let value = '';

    const setValue = (symbol) => {
        value = symbol;
    }

    const getValue = () => value;

    return {setValue, getValue};
}



const gameboard = (() => {
    const columns = 3;
    const rows = 3;
    const board = [];

    const getBoard = () => board;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const addSymbol = (row, column, player) => {
        if (board[row][column].getValue() === '') {
            board[row][column].setValue(player.symbol);
        } else {
            return;
        }
    }

    const showBoard = () => {
        console.log('hi')
    }

    return {
        getBoard, addSymbol, showBoard
    }
})();


const Player = (username, symbol) => {
    const getUsername = () => username;
    const getSymbol = () => symbol;

    return {username, symbol};
}


const Game = () => {

    const players = [
        {
            username: 'a',
            symbol: 'X'
        },
        {
            username: 'b',
            symbol: 'O'
        }
    ];

    let activePlayer = players[0];

    const setActivePlayer = () => {
       activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer

    const playGame = (row, column) => {
        gameboard.addSymbol(row, column, activePlayer);

        setActivePlayer();
    }
    
    return {
        playGame, getActivePlayer 
    }
}


const gameboardGraphicController = (() => {
    const game = Game();

    const boardDiv = document.querySelector('.board')

    const updateScreen = () => {
        boardDiv.textContent = '';

        gameboard.getBoard().forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const buttonDiv = document.createElement('button');
                buttonDiv.classList.add('cell');
    
                buttonDiv.dataset.column = columnIndex;
                buttonDiv.dataset.row = rowIndex;
                buttonDiv.textContent = cell.getValue() === undefined ? '' : cell.getValue();;
                boardDiv.appendChild(buttonDiv);
            })
        })


        checkDiagonals();
        checkHorizontals()
        checkVerticals()
    }

    function clickHandlerBoard(e) {
        const selectedColumn = e.target.dataset.column;
        const selectedRow = e.target.dataset.row;
        // Make sure I've clicked a column and not the gaps in between
        if (!selectedColumn) return;
        
        game.playGame(selectedRow, selectedColumn, game.getActivePlayer);
        updateScreen();
      }
      boardDiv.addEventListener("click", clickHandlerBoard);

      updateScreen();

})

gameboardGraphicController();


function checkDiagonals() { 
    let boardCheck = gameboard.getBoard();

    let firstDiag = boardCheck[0][0].getValue();
    let secondDiag = boardCheck[0][2].getValue();


    if ((firstDiag === 'X' || firstDiag === 'O') && (boardCheck[1][1].getValue() === firstDiag && boardCheck[2][2].getValue() === firstDiag)
        ||    (secondDiag === 'X' || secondDiag === 'O') && (boardCheck[1][1].getValue() === secondDiag && boardCheck[2][0].getValue() === secondDiag)) {
            announceWinner();
    }
}


function announceWinner() {
    const boardDiv = document.querySelector('.board')
    boardDiv.textContent = 'Player won'
}

function checkHorizontals() {
    let boardCheck = gameboard.getBoard();
    let firstValue = '';
    let sameValue = 0;

    for (let i = 0; i < boardCheck.length; i++) {

        if (sameValue === 3) {
            announceWinner();
            break;
        }

        sameValue = 0;

        for (let j = 0; j < boardCheck.length; j++) {
            
            if(boardCheck[i][j].getValue() === '') {
                break;
            }
            if (firstValue === '') {
                firstValue = boardCheck[i][j].getValue();
            } 

            if (firstValue !== boardCheck[i][j].getValue()) {
                break;
            }

            sameValue += 1;         
        }
    }
}

function checkVerticals() {
    let boardCheck = gameboard.getBoard();
    let firstValue = '';
    let sameValue = 0;

    for (let i = 0; i < boardCheck.length; i++) {

        if (sameValue === 3) {
            announceWinner();
            break;
        }

        sameValue = 0;

        for (let j = 0; j < boardCheck.length; j++) {
            
            if(boardCheck[j][i].getValue() === '') {
                break;
            }
            if (firstValue === '') {
                firstValue = boardCheck[j][i].getValue();
            } 

            if (firstValue !== boardCheck[j][i].getValue()) {
                break;
            }

            sameValue += 1;
            console.log(sameValue);         
        }
    }
}
