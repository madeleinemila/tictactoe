



// $(document).ready(function () { TODO uncomment when finished



  // flag for which turn, and initialise to start with X
  let xTurn = true;
  // flag for won game
  let gameOver = false;
  // variable for draw handling
  let numCellsFilled = 0;
  // variable for current level
  let level = 1;

  // get number of cells & rows
  let numCells = $('.xo').length;
  let numRows = $('.row').length;

  // variables to hold data of last cell clicked, init to -1 so it doesn't apply to any cell
  let lastRow = -1;
  let lastCol = -1;
  let lastMove = '';



  // ******** FUNCTIONS ************
  const levelUp = function () {
    // add an extra <div class="cell noselect"><div class="xo"></div></div> to each <div class="row">
    const newCell = $('<div class="cell noselect"><div class="xo"></div></div>');
    $('.row').append( newCell );
    // duplicate last whole row
    $('.row:last').clone().insertAfter('.row:last');
    // now update cell and row numbers
    numCells = $('.xo').length;
    numRows = $('.row').length;
    // *** remove old event listeners ***
    removeListeners( numCells );
    // console.log( `numCells ${ numCells } numRows ${ numRows }` );
    // now add new listeners
    updateListeners( numCells );
    restartGame();
    $('.level-up').addClass('hidden');
  };

  const restartGame = function () {
    $('.xo').text('');
    gameOver = false;
    xTurn = true;
    $('.player-console>p').text('');
    $('.replay').addClass('hidden');
    numCellsFilled = 0;
    $('.level-up').addClass('hidden');
  };

  const populateCell = function ( cellNum ) {
    console.log( cellNum );
    if (gameOver) {
      return;
    }
    // if cell is used, exit
    if ($('.xo').eq( cellNum ).text()) {
      return;
    }
    // else
    if (xTurn) { // put an X
      $('.xo').eq( cellNum ).text('x');
      lastMove = 'x';
      numCellsFilled ++;
      xTurn = false;
    } else { // put a O
      $('.xo').eq( cellNum ).text('o');
      lastMove = 'o';
      numCellsFilled ++;
      xTurn = true;
    }
    // update last row/cell variables
    lastRow = ( $('.xo').eq( cellNum ).parent().parent().index() ) - 1; // -1 to discount game header
    lastCol = cellNum % numRows;
    // console.log( `Row ${ lastRow } Col ${ lastCol }` );
    checkForWin();
    if (gameOver) {
      $('.player-console>p').text('Game over!');
      $('.replay').removeClass('hidden');
      $('.level-up').removeClass('hidden');
    }
    checkForDraw();
  };

  const checkForWin = function () {
    // check row for win
    for (let i = 0; i < numRows; i++) {  // numRows works for number of cols too as game board is square
      // console.log( lastRow, i);
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
    // check negative diag for win
    for (let i = 0; i < numRows; i++) {
      if ( $(`.row:eq(${ i }) .xo:eq(${ i })`).text() !== lastMove ) {
        break;
      }
      if (i === numRows - 1) {
        gameOver = true;
        return;
      }
    }
    // check positive diag for win
    for (let i = 0; i < numRows; i++) {
        if ( $(`.row:eq(${ i }) .xo:eq(${ numRows - 1 - i })`).text() !== lastMove ) {
          break;
        }
      if (i === numRows - 1) {
        gameOver = true;
        return;
      }
    }
  };

  const checkForDraw = function () {
    if ( numCellsFilled === numCells ) {
      $('.player-console>p').text("It's a draw");
      $('.replay').removeClass('hidden');
    }
  };

  // *********** EVENT HANDLERS *************

  const updateListeners = function ( num ) {
    for (let i = 0; i < num; i++) {
      $('.cell').eq(i).on( 'click', populateCell.bind(null, i) );
    }
  };

  const removeListeners = function ( num ) {
    for (let i = 0; i < num; i++) {
      $('.cell').eq(i).off();  // no args = remove all listeners
    }
  };

  // INIT FOR GAMEPLAY

  // if a game cell is clicked
  updateListeners( numCells );

  // if replay button is clicked
  $('.replay').on( 'click', restartGame );

  // if level up button is clicked
  $('.level-up').on( 'click', levelUp );
























// });  // end document ready
