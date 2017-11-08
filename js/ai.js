


// what does the ai need to do

// needs to choose next position
// and then populate cell
// then handover next turn



const ai = {

  // ai toggle, init to on
  on: true,

  speak: function () {
    console.log( `I'm alive! ALIVE!` );
  },


  choose: function () {
    let choice = -1;
    // if AI (O) has a row with numRows - 1 X's....

    // go in that space

    // if X has a row with numRows - 1 X's....

    // go in that space


    // poll all cells with o's
    const oCells = [];
    for (let i = 0; i < numCells; i++) {
      if ( 'o' === $('.xo').eq( i ).text() ) {
        console.log(i);
      }
    }



    // else find available cells
    const availCells = [];
    for (let i = 0; i < numCells; i++) {
      if ( ! ($('.xo').eq( i ).text()) ) {   // if there is NOT something in the cell
        availCells.push( i );
      }
    }
    // and pick one random cell of these avail cells
    const seed = Math.floor( Math.random() * availCells.length );
    choice = availCells[ seed ];
    return choice;
  }
};
