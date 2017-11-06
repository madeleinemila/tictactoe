$(document).ready(function () {



  // flag for which turn, and initialise to start with X
  let xTurn = true;
  // flag for won game
  let gameOver = false;

  // get number of cells & rows
  const numCells = $('.xo').length;
  const numRows = $('.row').length;

  // variables to hold data of last cell clicked, init to -1 so it doesn't apply to any cell
  let lastRow = -1;
  let lastCol = -1;
  let lastMove = '';



  // ******** FUNCTIONS ************
  const restartGame = function () {
    $('.xo').text('');
    gameOver = false;
    xTurn = true;
    $('.restart').addClass('hidden');
  };


  const populateCell = function ( cellNum ) {
    // if cell is used, exit
    if ($('.xo').eq( cellNum ).text()) {
      console.log( `That cell is taken` );
      return;
    }
    // else
    if (xTurn) { // put an X
      $('.xo').eq( cellNum ).text('x');
      lastMove = 'x';
      xTurn = false;
    } else { // put a O
      $('.xo').eq( cellNum ).text('o');
      lastMove = 'o';
      xTurn = true;
    }
    // update last row/cell variables
    lastRow = $('.xo').eq( cellNum ).parent().parent().index();
    lastCol = cellNum % numRows;

    checkForWin();
    if (gameOver) {
      console.log(`Game over!`);
      $('.restart').removeClass('hidden');
    }
  };


  const checkForWin = function () {
    // check row for win
    for (let i = 0; i < numRows; i++) {  // numRows works for number of cols too as game board is square
      if ( $(`.row:eq(${ lastRow }) .xo:eq(${ i })`).text() !== lastMove ) {
        break;
      }
      if (i === numRows - 1) { // i.e. we've finished iterating but before we exit
        gameOver = true;
        return;
      }
    }
    // check column for win
    for (let i = 0; i < numRows; i++) {
      if ( $(`.row:eq(${ i }) .xo:eq(${ lastCol })`).text() !== lastMove ) {
        break;
      }
      if (i === numRows - 1) {
        gameOver = true;
        return;
      }
    }
    // check positive diag for win
    for (let i = 0; i < numRows; i++) {
      if ( $(`.row:eq(${ i }) .xo:eq(${ i })`).text() !== lastMove ) {
        break;
      }
      if (i === numRows - 1) {
        gameOver = true;
        return;
      }
    }
    // check negative diag for win
    for (let i = numRows - 1; i < 0; i--) {
      if ( $(`.row:eq(${ i }) .xo:eq(${ i })`).text() !== lastMove ) {
        break;
      }
      if (i === 0) {
        gameOver = true;
        return;
      }
    }
  };




  // *********** EVENT HANDLERS *************
  // if a game cell is clicked
  for (let i = 0; i < numCells; i++) {
    $('.cell').eq(i).on( 'click', populateCell.bind(null, i) );
  }

  // if restart button is clicked
  $('.restart').on( 'click', restartGame );

























});  // end document ready
