

// *********** EVENT HANDLERS *************


// *** Functions ***

// creates listeners for if a game cell is clicked
const updateListeners = function ( num ) {
  for (let i = 0; i < num; i++) {
    $('.cell').eq(i).on( 'click', takeTurn.bind(null, i) );
  }
};

// removes listeners, to disable clicking or for board upscale process
const removeListeners = function ( num ) {
  for (let i = 0; i < num; i++) {
    $('.cell').eq(i).off();  // no args = remove all listeners
  }
};

// *************

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
