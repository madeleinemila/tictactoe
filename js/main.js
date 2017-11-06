




$(document).ready(function () {
  // create flag for which turn, and initialise to start with X
  let xTurn = true;
  // get number of cells
  const numCells = $('.xo').length;



  // ******** POPULATE CELL FUNCTION ************
  const populateCell = function ( cellNum ) {
    // if cell is used, exit
    if ($('.xo').eq( cellNum ).text()) {
      console.log( `That cell is taken` );
      return;
    }
    // else
    if (xTurn) { // put an X
      $('.xo').eq( cellNum ).text('X');
      xTurn = false;
    } else { // put a O
      $('.xo').eq( cellNum ).text('O');
      xTurn = true;
    }
  };


  // *********** EVENT HANDLERS *************
  for (let i = 0; i < numCells; i++) {
    $('.cell').eq(i).on( 'click', populateCell.bind(null, i) );
  }
























});  // end document ready
