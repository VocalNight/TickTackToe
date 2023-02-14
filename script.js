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
                buttonDiv.textContent = cell.getValue();
                boardDiv.appendChild(buttonDiv);
            })
        })

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
console.log(gameboard.getBoard());
