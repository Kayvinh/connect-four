"use strict";

/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;
const board = [];
let currPlayer = 1; // active player: 1 or 2
// array of rows, each row is array of cells  (board[y][x])

/** 
 *[
  [ null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null ],
  [ null, null, null, null, null, null, null ],
  ]
*/

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // TODO: set "board" to empty HEIGHT x WIDTH matrix array

  // switch i, x to y, x

  for (let y = 0; y < HEIGHT; y++) {
    const row = [];

    for (let x = 0; x < WIDTH; x++) {
      row.push(null);
    }

    board.push(row);
  }
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  const htmlBoard = document.getElementById('board');

  // TODO: Creating <tr> element and assigning id='column-top'
  // Also adding event listener to handleClick
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  // TODO: Creating <td> element and assigning id='top-i'

  // change the i, don't edit during code reivews for that reason

  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", `top-${x}`);
    top.append(headCell);
  }

  htmlBoard.append(top);

  // dynamically creates the main part of html board
  // uses HEIGHT to create table rows
  // uses WIDTH to create table cells for each row
  for (let y = 0; y < HEIGHT; y++) {
    // TODO: Create a table row element and assign to a "row" variable
    const newRow = document.createElement("tr");

    for (let x = 0; x < WIDTH; x++) {
      // TODO: Create a table cell element and assign to a "cell" variable
      const newCell = document.createElement("td");

      // TODO: add an id, c-y-x, to the above table cell element
      // you'll use this later, so make sure you use c-y-x
      newCell.setAttribute("id", `c-${y}-${x}`);

      // TODO: append the table cell to the table row
      newRow.appendChild(newCell);

    }
    // TODO: append the row to the html board
    htmlBoard.append(newRow);

  }
}

/** findSpotForCol: given column x, return bottom empty y (null if filled) */

function findSpotForCol(x) {
  // TODO: write the real version of this, rather than always returning 5
  for (let y = board.length - 1; y >= 0; y--) { // change y to y
    // if board[5][x] !== null
    // if board[4][x] !== null
    if (board[y][x] === null) {
      return y;
    }
  }

  return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // TODO: make a div and insert into correct table cell
  const newPiece = document.createElement('div');
  newPiece.className = 'piece';

  if (currPlayer === 1) {
    newPiece.classList.add('p1');
  } else {
    newPiece.classList.add('p2');
  }
  {/* <td id="c-0-0"></td> */ }
  const currCell = document.getElementById(`c-${y}-${x}`);
  console.log(currCell);
  currCell.appendChild(newPiece);
}



/** endGame: announce game end */

function endGame(msg) {
  // TODO: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  const xId = evt.target.id; // don't call this x since it's not actually; the real x is defined later
  let x = Number(xId[xId.length - 1]);

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // TODO: add line to update in-memory board
  //console.log("y, x: ", y, x);
  placeInTable(y, x);
  board[y][x] = currPlayer;


  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // TODO: check if all cells in board are filled; if so call, call endGame
  // let isBoardFilled = board.every((item) => {
  //   return item === null;
  // });
  let isBoardFilled = false;  // move into its own function


  for (let row of board) {
    let isRowFilled = row.every((item) => {
      return item !== null;
    });

    if (!isRowFilled) {
      break;
    } else {
      isBoardFilled = true;
    }
  }

  // console.log(isBoardFilled);
  if (isBoardFilled) {
    alert("Game is a tie!");
  }

  // switch players
  // TODO: switch currPlayer 1 <-> 2
  // (currPlayer === 1) ? currPlayer = 2 : currPlayer = 1; <- should be if/else
  currPlayer = (currPlayer === 1) ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {

  /** _win:
   * takes input array of 4 cell coordinates [ [y, x], [y, x], [y, x], [y, x] ]
   * returns true if all are legal coordinates for a cell & all cells match
   * currPlayer
   */
  function _win(cells) {
    // console.log("cells: ", cells);

    // TODO: Check four cells to see if they're all legal & all color of current
    // player


    // iterate through cells
    // check each coordinate falls withing [7 high, 6 wide]
    // check value for matching player number
    return cells.every(([y, x]) => {
      return y < HEIGHT && WIDTH < 7 && board[y][x] === currPlayer; //use height and width variables
    })



    //   let y = cells[0][0];
    //   let x = cells[0][1];
    //   let cellPlayer = board[y][x];
    //   console.log("cellPlayer, y, x: ", cellPlayer, y, x);

    //   for (let i = 0; i = cells.length; i++) {
    //     y = cells[i][0];
    //     x = cells[i][1];
    //     if (cellPlayer !== board[y][x]) {
    //       return false;
    //     }
    //     if (!(y < 6) && !(x < 7)) {
    //       return false;
    //     }
    //   }
    //   return true;


  }

  // if board[5][0] === 1
  // if board[5][1] === 1
  // if board[5][2] === 1
  // if board[5][3] === 1

  // using HEIGHT and WIDTH, generate "check list" of coordinates
  // for 4 cells (starting here) for each of the different
  // ways to win: horizontal, vertical, diagonalDR, diagonalDL
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      // TODO: assign values to the below variables for each of the ways to win
      // horizontal has been assigned for you
      // each should be an array of 4 cell coordinates:
      // [ [y, x], [y, x], [y, x], [y, x] ]

      let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];

      // find winner (only checking each win-possibility as needed)
      if (_win(horiz) || _win(vert) || _win(diagDL) || _win(diagDR)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
