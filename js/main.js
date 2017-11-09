



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

// flag for alternating final level messages
let altMsg = 0;



// ******** FUNCTIONS **********************************************************



const levelUp = function () {
  // add an extra CELL with an XO dive
  const newCell = $('<div class="cell noselect"><div class="xo"></div></div>');
  $('.row').append( newCell );
  // duplicate last whole row
  $('.row:last').clone().insertAfter('.row:last');
  // now update cell and row numbers
  numCells = $('.xo').length;
  numRows = $('.row').length;
  // *** remove old event listeners *********
  removeListeners( numCells );
  // now add new listeners
  updateListeners( numCells );
  restartGame();
  $('.level-up').addClass('hidden');
  level ++;
  $('#level-num').text( level );
  // final round msg for level 10
  if ( 10 === level ) {
    $('#level-num').text( `${ level } | FINAL ROUND` );
  }
  // ** adjust X O vert alignment for smaller boxes
  if ( 3 < level ) {
    $('.xo').css( { 'margin-top': '-10px', 'font-size': '60px' } );
  }
  if ( 5 < level) {
    $('.xo').css( 'font-size', '50px' );
  }
  if ( 8 < level) {
    $('.xo').css( 'font-size', '40px' );
  } // ** end adjust
};


const restartGame = function () {
  updateListeners( numCells );
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
    renderGameWon();
    return;
  }
  checkForDraw();
  if ( checkForDraw() === true ) return;
  if ( false === ai.on ) return;
  // AI turn
  const aiMove = ai.choose();
  populateCell( aiMove ); // <<<<<< ** check for win and draw is INSIDE this **
};


const populateCell = function ( cell ) {
  if (xTurn) { // put an X
    $('.xo').eq( cell ).text('x');
    lastMove = 'x';
    numCellsFilled ++;
    xTurn = false;
  } else { // put a O
    if ( true === ai.on ) {
      $('.xo').eq( cell ).fadeOut( 10, function () {
        $('.xo').eq( cell ).text('o');  // change the text
        $('.xo').eq( cell ).fadeIn( 400 );
        checkForWin();      // <<<
        if (gameOver) {     // <<<
          renderGameWon(); // <<<
          return;           // <<<
        }                   // <<<
        checkForDraw();     // <<<
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
  // check ROW for win
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
  // check COLUMN for win
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
  // check NEGATIVE DIAG for win
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
  // check POSITIVE DIAG for win
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


const renderGameWon = function () {
    if ( 10 === level ) {
      $('.player-console>p').css( 'font-size', '15px' );
      if ( altMsg % 2 === 0 ) {
        $('.player-console>p').text(`Do you really need more tic tac toe in your life now?`);
      } else {
        $('.player-console>p').text(`So much tic tac toe, so little time.`);
      }
      altMsg++;
      $('.replay').removeClass('hidden');
      $('.ai-toggle').fadeIn( 1000 );
      return;
    }
    // show winner console message
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
  } // don't need anything else bc undefined is falsey
  // IF STALEMATE REACHED
  if ( checkForStalemate() ) {
    // stop further moves being made
    removeListeners( numCells );
    $('.player-console>p').text("Stalemate");
    $('.level-up').removeClass('hidden'); // show level up button
    $('.replay').removeClass('hidden');
    $('.ai-toggle').fadeIn( 1000 );
    return true;
  }
};


const checkForStalemate = function () {

    let rowsStale = new Array( numRows ).fill( false );
    let colsStale = new Array( numRows ).fill( false );
    let negDiagStale = false;
    let posDiagStale = false;


    // check rows
    for (let r = 0; r < numRows; r++) {
      let xs = [];
      let os = [];
      for (let i = 0; i < numRows; i++) {
        let cn = numRows * r + i; // cell num
        if ( ai.cellIsX( cn ) ) {
          xs.push( i );
        }
        if ( ai.cellIsO( cn ) ) {
          os.push( i );
        }
      }
      if ( xs.length > 0 && os.length > 0 ) {
        rowsStale[r] = true;
        console.log(`rowsStale[${r}]` + rowsStale[r]);
      }
    }

    // check cols
    for (let cl = 0; cl < numRows; cl++) {
      let xs = [];
      let os = [];
      for (let i = 0; i < numRows; i++) {
        let cn = numRows * i + cl; // cell num
        if ( ai.cellIsX( cn ) ) {
          xs.push( i );
        }
        if ( ai.cellIsO( cn ) ) {
          os.push( i );
        }
      }
      if ( xs.length > 0 && os.length > 0 ) {
        colsStale[cl] = true;
        console.log(`colsStale[${cl}]` + colsStale[cl]);
      }
    }


    // check NEG DIAG
    let xs = [];
    let os = [];
    for (let d = 0; d < numRows; d++) {
      let cn = (numRows + 1) * d; // cell num
      if ( ai.cellIsX( cn ) ) {
        xs.push( d );
      }
      if ( ai.cellIsO( cn ) ) {
        os.push( d );
      }
    }
    if ( xs.length > 0 && os.length > 0 ) {
      negDiagStale = true;
      console.log(`negDiagStale ` + negDiagStale);
    }
    // check POS DIAG
    xs = [];
    os = [];
    for (let d = 0; d < numRows; d++) {
      let cn = ( d + 1 ) * ( numRows - 1 ); // cell num
      if ( ai.cellIsX( cn ) ) {
        xs.push( d );
      }
      if ( ai.cellIsO( cn ) ) {
        os.push( d );
      }
    }
    if ( xs.length > 0 && os.length > 0 ) {
      posDiagStale = true;
      console.log(`posDiagStale ` + posDiagStale);
    }

    // check if all rows, cols and diags are true for stale
    const isTrue = function (x) {
      return x === true;
    };
    console.log( `rowsStale.every( isTrue ) ${rowsStale.every( isTrue )}` );
    console.log( `colsStale.every( isTrue ) ${colsStale.every( isTrue )}` );
    if ( rowsStale.every( isTrue ) &&  colsStale.every( isTrue ) && negDiagStale === true && posDiagStale === true ) {
      console.log( `Stalemate reached` );
      return true;
    }
};










//**
