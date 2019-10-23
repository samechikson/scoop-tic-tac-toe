
/**
 * Check if an array contains only 'x's or 'o's
 * @param line an array of the size of the game board
 */
function isGameWinner(line: any[]): boolean {
  return line.every(val => val === 'x') || line.every(val => val === 'o')
}

/**
 * See if any horizontal combinations are winners.
 * @param board the game board - a two-dimensional array of 'x', 'o' and nulls
 */
function isHorizontalWinner(board: any[][]): boolean {
  const rowTests = board.map(row => row.every(val => val === 'x') || row.every(val => val === 'o'));
  return rowTests.reduce((prevBool, currBool) => prevBool || currBool);
}

/**
 * See if any vertical combinations are winners
 * @param board the game board - a two-dimensional array of 'x', 'o' and nulls
 */
function isVerticalWinner(board: any[][]): boolean {
  const transposedBoard = transpose(board);
  return isHorizontalWinner(transposedBoard);
}

/**
 * Sourced from https://stackoverflow.com/questions/17428587/transposing-a-2d-array-in-javascript
 * @param arr a two-dimensional array
 */
function transpose(arr: any[][]): any[][] {
  return arr[0].map((col, i) => arr.map(row => row[i]));
}

/**
 * See if any diagonal lines are winners.
 * @param board the game board - a two-dimensional array of 'x', 'o' and nulls
 */
function isDiagonalWinner(board: any[][]): boolean {
  // let topLeftBottomRight = board.map((row, i) => row[i]);
  const topLeftBottomRight = [];
  const topRightBottomLeft = [];
  for (let i = 0; i < board.length; i++) {
    topLeftBottomRight.push(board[i][i])
    topRightBottomLeft.push(board[board.length - 1 - i][board.length - 1 - i])
  }
  return isGameWinner(topLeftBottomRight) || isGameWinner(topRightBottomLeft);
}

export function determineWinner(board: any[][]): boolean {
  const testFunctions = [
    isHorizontalWinner, 
    isVerticalWinner, 
    isDiagonalWinner
  ];

  // return testFunctions.reduce((prev, currFn) => prev || currFn(board));
  // return isHorizontalWinner(board) || isVerticalWinner(board) || isDiagonalWinner(board);
  return isDiagonalWinner(board);
}