const squares = document.querySelectorAll('.square');
let currentPlayer = 'X';

squares.forEach((square) => {
  square.addEventListener('click', handleClick);
});

function handleClick(event) {
  const square = event.target;
  square.textContent = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  checkForWinner();
}

function checkForWinner() {
  const winningCombinations = [    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    const squareA = squares[a];
    const squareB = squares[b];
    const squareC = squares[c];

    if (squareA.textContent === squareB.textContent && squareB.textContent === squareC.textContent && squareA.textContent !== '') {
        alert(`${squareA.textContent}の勝利です！`);
        location.reload();
    }
  }
}
