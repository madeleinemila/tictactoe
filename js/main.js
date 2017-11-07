



// $(document).ready(function () { TODO uncomment when finished TODO turn all this into a game object



  // flag for which turn, and initialise to start with X
  let xTurn = true;
  // flag for won game
  let gameOver = false;
  // variable for draw handling
  let numCellsFilled = 0;
  // variable for current level
  let level = 1;
  // init display to show first level num
  $('#level-num').text( level );

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
    level ++;
    $('#level-num').text( level );
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

  const takeTurn = function ( cellNum ) {
    if (gameOver) return;
    if ($('.xo').eq( cellNum ).text()) { // if cell is taken
      return;
    }
    // else
    populateCell( cellNum );
    checkForWin();
    if (gameOver) {
      $('.player-console>p').text(`GAME OVER - "${ lastMove.toUpperCase() }" TAKES THE WIN!`);
      $('.replay').removeClass('hidden');
      $('.level-up').removeClass('hidden');
      return;
    }
    checkForDraw();
    if ( checkForDraw === true ) return;
    // AI turn
    const aiMove = ai.choose();
    console.log( aiMove );
    populateCell( aiMove );
    checkForWin();
    if (gameOver) { // TODO refactor this bit same as above
      $('.player-console>p').text(`GAME OVER - "${ lastMove.toUpperCase() }" TAKES THE WIN!`);
      $('.replay').removeClass('hidden');
      $('.level-up').removeClass('hidden');
      return;
    }
    checkForDraw();
  };



  const populateCell = function ( cell ) {
    if (xTurn) { // put an X
      $('.xo').eq( cell ).text('x');
      lastMove = 'x';
      numCellsFilled ++;
      xTurn = false;
    } else { // put a O
      $('.xo').eq( cell ).text('o');
      lastMove = 'o';
      numCellsFilled ++;
      xTurn = true;
    }
    // update last row/cell variables
    lastRow = ( $('.xo').eq( cell ).parent().parent().index() ) - 1; // -1 to discount game header
    lastCol = cell % numRows;
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
      return true;
    }
    // return false; // do i need this? cos return undefined is falsey?
  };

  // *********** EVENT HANDLERS *************

  const updateListeners = function ( num ) {
    for (let i = 0; i < num; i++) {
      $('.cell').eq(i).on( 'click', takeTurn.bind(null, i) );
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
