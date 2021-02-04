const allPossibleWinningSquares = [
  // By row
  [ [0,0], [0, 1], [0, 2] ],
  [ [1,0], [1, 1], [1, 2] ],
  [ [2,0], [2, 1], [2, 2] ],
  // By column
  [ [0,0], [1, 0], [2, 0] ],
  [ [0,1], [1, 1], [2, 1] ],
  [ [0,2], [1, 2], [2, 2] ],
  // By diagonal
  [[0, 0], [1, 1], [2, 2]],
  [[2, 0], [1, 1], [0, 2]],
];

function areWinningSquares(board, squares) {
  const [fr, fc] = squares[0]
  const firstCellVal = board[fr][fc]
  if (!firstCellVal) {
    return false
  }
  for (const cell of squares.slice(1)) {
    const r = cell[0]
    const c = cell[1]
    if (board[r][c] !== firstCellVal) {
      return false
    }
  }
  return true
}

export function getWinningSquares(board) {
  for (const winningSquares of allPossibleWinningSquares) {
    if (areWinningSquares(board, winningSquares)) {
      return winningSquares;
    }
  }
  return [];
}

export function isAllFilled(board) {
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      if (!board[i][j]) {
        return false;
      }
    }
  }
  return true;
}

export function getNewBoard() {
  return [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined]
  ];
}