


// what does the ai need to do

// needs to choose next position
// and then populate cell
// then handover next turn



const ai = {
  speak: function () {
    console.log( `I'm alive! ALIVE!` );
  },


  choose: function () {
    let choice = -1;
    // find available cells
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


    // // if cell is used, exit
    // if ($('.xo').eq( cellNum ).text()) {
    //   return;
    // }
