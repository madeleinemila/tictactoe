


// what does the ai need to do

// needs to choose next position
// and then populate cell
// then handover next turn



const ai = {

  // ai toggle, init to on
  on: true,

  inProgress: false,

  speak: function () {
    console.log( `I'm alive! ALIVE!` );
  },


  choose: function () {
    let choice = -1;
    let xPresent = false;
    // let holdingBay = {
    //   o: [],
    //   x: [],
    //   empty: []
    // };
    // if AI (O) has a row with numRows - 1 X's....

    // go in that space

    // if X has a row with numRows - 1 X's....

    // go in that space


    // poll all cells with o's
    // const oCells = [];
    // for (let i = 0; i < numCells; i++) {
    //   if ( 'o' === $('.xo').eq( i ).text() ) {
    //     console.log(i);
    //   }
    // }



    // GET STATUS OF ALL CELLS ON BOARD
    // for (let i = 0; i < numRows; i++) {
    //   for (let j = 0; j < numRows; j++) {
    //     switch ( $(`.row:eq( ${ i } ) .xo:eq(${ j })`).text() ) {
    //       case 'o':
    //         holdingBay.o.push( numRows * i + j );
    //         break;
    //       case 'x':
    //         holdingBay.x.push( numRows * i + j );
    //         break;
    //       default:
    //         holdingBay.empty.push( numRows * i + j );
    //     }
    //   }
    // }


    // favour centre-ish squares
    let centre;
    if ( numRows % 2 === 1 ) {
      centre = Math.floor( numCells / 2 );
    } else {
      centre = numCells / 2 + 1;
    }
    if ( !$('.xo').eq(centre).text() ) { // if there's nothing in centre-ish square
      choice = centre;
      return choice;
    }



    // check for ROW 0 with just o's





      // for (let i = 0; i < numRows; i++) {
      //   if ( $(`.row:eq(${ 0 }) .xo:eq(${ i })`).text() === 'x' ) {
      //     console.log(`cell ${i} is an x`);
      //     break;
      //   }
      // }


      //   if ( $(`.row:eq(${ 0 }) .xo:eq(${ i })`).text() === 'o' ) continue;
      //   if ( $(`.row:eq(${ 0 }) .xo:eq(${ i })`).text() === '' ) {
      //     choice = numRows * 0 + i; // i.e. cell num
      //     return choice;
      //   }
      // }


    // check for COLS with just o's
    // for (let i = 0; i < numRows; i++) {
    //   for (let j = 0; j < numRows; j++) {  // numRows works for number of cols too as game board is square
    //     if ( $(`.row:eq(${ j }) .xo:eq(${ j })`).text() === 'x' ) {
    //       break;
    //     }
    //     if ( $(`.row:eq(${ j }) .xo:eq(${ i })`).text() === 'o' ) continue;
    //     if ( $(`.row:eq(${ j }) .xo:eq(${ i })`).text() === '' ) {
    //       choice = numRows * i + j; // i.e. cell num
    //       console.log(choice);
    //       return choice;
    //     }
    //   }
    // }



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































//**
