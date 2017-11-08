



// $(document).ready(function () { TODO uncomment when finished TODO could refactor as a game object



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
    $('.xo').removeClass('win');
    gameOver = false;
    xTurn = true;
    $('.player-console>p').text('');
    $('.replay').addClass('hidden');
    numCellsFilled = 0;
    $('.level-up').addClass('hidden');
  };

  const takeTurn = function ( cellNum ) {
    // checks
    if (gameOver) return;
    if ($('.xo').eq( cellNum ).text()) { // if cell is taken
      return;
    }
    $('.ai-toggle').fadeOut( 350 );

    // gameplay start
    populateCell( cellNum );
    checkForWin();
    if (gameOver) {
      renderGameOver();
      return;
    }
    checkForDraw();
    if ( checkForDraw === true ) return;
    if ( false === ai.on ) return;
    // AI turn
    const aiMove = ai.choose();
    console.log( aiMove );
    populateCell( aiMove );
    checkForWin();
    if (gameOver) {
      renderGameOver();
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
      if ( true === ai.on ) {
        $('.xo').eq( cell ).fadeOut( function () {
          $('.xo').eq( cell ).text('o').fadeIn( 1000 ); // had to put inside fadeout function to work
        } );
      } else {
        $('.xo').eq( cell ).text('o')
      }
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
      if ( $(`.row:eq(${ lastRow }) .xo:eq(${ i })`).text() !== lastMove ) { // i.e. if anything cell in row in question does not match last move...
        break;
      }
      if (i === numRows - 1) { // i.e. we've finished iterating and it didn't break so it must be game over so before we exit
        gameOver = true;
        // change color of winning combo
        for (let i = 0; i <numRows; i++) {
          $(`.row:eq(${ lastRow }) .xo:eq(${ i })`).addClass('win');
        }
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
        // change color of winning combo
        for (let i = 0; i <numRows; i++) {
          $(`.row:eq(${ i }) .xo:eq(${ lastCol })`).addClass('win');
        }
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
        // change color of winning combo
        for (let i = 0; i <numRows; i++) {
          $(`.row:eq(${ i }) .xo:eq(${ i })`).addClass('win');
        }
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
        // change color of winning combo
        for (let i = 0; i <numRows; i++) {
          $(`.row:eq(${ i }) .xo:eq(${ numRows - 1 - i })`).addClass('win');
        }
        return;
      }
    }
  };

  const renderGameOver = function () {
      $('.player-console>p').text(`${ lastMove.toUpperCase() } TAKES THE WIN!`);
      // show buttons for next game
      if ( true === ai.on ) {
        if ( 'x' === lastMove ) { // i.e. if human won
          $('.level-up').removeClass('hidden'); // show level up button
        }
      }
      if ( false === ai.on) {     // or if 2 humans playing
        $('.level-up').removeClass('hidden'); // show level up button
      }
      $('.replay').removeClass('hidden');
      // show AI toggle
      $('.ai-toggle').fadeIn( 1000 );
  };

  const checkForDraw = function () {
    if ( numCellsFilled === numCells ) {
      $('.player-console>p').text("It's a draw");
      $('.level-up').removeClass('hidden'); // show level up button
      $('.replay').removeClass('hidden');
      $('.ai-toggle').fadeIn( 1000 );
      return true;
    }
    // return false; // do i need this? cos return undefined is falsey?
  };

  // *********** EVENT HANDLERS *************

  // creates listeners for if a game cell is clicked
  const updateListeners = function ( num ) {
    for (let i = 0; i < num; i++) {
      $('.cell').eq(i).on( 'click', takeTurn.bind(null, i) );
    }
  };

  // removes listeners for board upscale process
  const removeListeners = function ( num ) {
    for (let i = 0; i < num; i++) {
      $('.cell').eq(i).off();  // no args = remove all listeners
    }
  };

  // CREATE INITIAL LISTENERS
  updateListeners( numCells );

  // if replay button is clicked
  $('.replay').on( 'click', restartGame );

  // if level up button is clicked
  $('.level-up').on( 'click', levelUp );

  // if ai toggle is clicked
  $('.ai-toggle').on( 'click', function () {
    ai.on === true ? ai.on = false : ai.on = true;  // toggle true/false state
    if ( true === ai.on ) {
      $(this).text( 'Toggle AI Off' );
      $('#game-mode').html('&nbsp;&nbsp;AI MODE');
    } else {
      $(this).text( 'Toggle AI On' );
      $('#game-mode').text('');
    }
    $(this).toggleClass('green');
  } );
























// });  // end document ready
