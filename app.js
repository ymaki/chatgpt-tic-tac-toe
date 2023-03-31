const squares = document.querySelectorAll('.square');
const startFirstButton = document.querySelector('#start-first');
const startSecondButton = document.querySelector('#start-second');
const giveUpButton = document.querySelector('#give-up');
let humanPlayer = 'X';
let aiPlayer = 'O';
let currentPlayer = humanPlayer;
let gameState = 'pre-game';

const messageDiv = document.querySelector('#game-message');

startFirstButton.addEventListener('click', startFirst);
startSecondButton.addEventListener('click', startSecond);
giveUpButton.addEventListener('click', giveUp);

squares.forEach((square) => {
  square.addEventListener('click', handleClick);
});

function startFirst() {
  clearBoard();
  humanPlayer = 'X';
  aiPlayer = 'O';
  currentPlayer = humanPlayer;
  gameState = 'in-game';
  messageDiv.textContent = 'あなたが先攻です。';
}

function startSecond() {
  clearBoard();
  humanPlayer = 'O';
  aiPlayer = 'X';
  currentPlayer = aiPlayer;
  gameState = 'in-game';
  messageDiv.textContent = 'AIが先攻です。';
  makeAiMove();
}

function giveUp() {
  messageDiv.textContent = 'あなたは諦めました。';
  gameState = 'game-over';
}

function clearBoard() {
  squares.forEach((square) => {
    square.textContent = '';
  });
}

function handleClick(event) {
  const square = event.target;
    if (gameState === 'in-game' && square.textContent === "") {
        square.textContent = currentPlayer;
        if (checkForWinner(Array.from(squares), currentPlayer)) {
            endGame(`${currentPlayer}の勝利です！`);
            gameState = 'game-over';
            return;
        }
        if (checkForDraw()) {
            endGame('引き分けです。');
            gameState = 'game-over';
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        if (currentPlayer === aiPlayer) {
            makeAiMove();
        }
    } else if (gameState === 'in-game') {
      messageDiv.textContent = 'このマス目には既にコマが置かれています。別のマス目を選択してください。';
    } else {
        return
    }
}

function checkForWinner(board, player) {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横列
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // 縦列
      [0, 4, 8], [2, 4, 6]             // 斜め列
    ];
    
    return winningCombinations.some(combination => {
      return combination.every(index => board[index].textContent === player);
    });
  }
  

function checkForDraw() {
  return Array.from(squares).every(square => square.textContent !== '');
}

function endGame(message) {
    messageDiv.textContent = message;
  }
  

  function makeAiMove() {
    if (gameState !== 'in-game') {
      return;
    }
    
    const [bestScore, bestMove] = minimax(Array.from(squares), aiPlayer, -Infinity, Infinity);
    squares[bestMove].textContent = aiPlayer;
    if (checkForWinner(Array.from(squares), aiPlayer)) {
      endGame(`${aiPlayer}の勝利です！`);
      gameState = 'game-over';
      return;
    }
    if (checkForDraw()) {
      endGame('引き分けです。');
      gameState = 'game-over';
      return;
    }
    currentPlayer = humanPlayer;
  }

function getEmptySquares(board) {
    const squaresArr = Array.from(board);
    return squaresArr.filter((square) => square.textContent === "");
  }

function minimax(newBoard, player, alpha, beta) {
    const emptySquares = getEmptySquares(newBoard);
  
    if (checkForWinner(newBoard, humanPlayer)) {
        return [-10, null];
    } else if (checkForWinner(newBoard, aiPlayer)) {
        return [10, null];
    } else if (emptySquares.length === 0) {
        return [0, null];
    }
      
    let moves = [];
    let score;
      
    for (let i = 0; i < emptySquares.length; i++) {
        let move = {};
        move.index = newBoard.indexOf(emptySquares[i]);
        newBoard[move.index].textContent = player;
      
        if (player === aiPlayer) {
            score = minimax(newBoard, humanPlayer, alpha, beta)[0]; //変更点
            if (score > alpha) {
                alpha = score;
            }
        } else {
            score = minimax(newBoard, aiPlayer, alpha, beta)[0];
            if (score < beta) {
                beta = score;
            }
        }
      
        newBoard[move.index].textContent = '';
        move.score = score;
        moves.push(move);
      
        if (alpha >= beta) {
            break;
        }
    }
      
    let bestMove;
    if (player === aiPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return [moves[bestMove].score, moves[bestMove].index];
} 