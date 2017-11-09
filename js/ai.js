


// what does the ai need to do

// needs to choose next position
// and then populate cell
// then handover next turn



const ai = {

  // ai toggle, init to on
  on: true,

  // inProgress: false,

  speak: function () {
    console.log( `I'm alive! ALIVE!` );
  },

  cellIsFree: function ( n ) {
    if ( $('.xo').eq( n ).text() === '') {
      return true; // learnt not to return n, cos 0 is falsey
    }
  },

  cellIsX: function ( n ) {
    if ( $('.xo').eq( n ).text() === 'x') {
      return true;
    }
  },

  cellIsO: function ( n ) {
    if ( $('.xo').eq( n ).text() === 'o') {
      return true;
    }
  },

  checkForPossWin: function () {  // I.E. CHECKING WHERE TO BLOCK X FROM WIN
    let blockCell;

    // for each cell number
    for (let i = 0; i < numCells; i++) {

        // if that cell number is taken, skip to next one
        if ( !this.cellIsFree( i ) ) {
          console.log( `${i} cell is taken` );
          continue;
        }

        // if it's blank, let's run the win tests if that cell is an X
        // $('.xo').eq( i ).addClass('hidden');
        $('.xo').eq( i ).text('x');

        // check FIRST ROW for win
        for (let j = 0; j < numRows; j++) {
          let cn = numRows * 0 + j; // cell number
          console.log(cn);
          // debugger;
          if ( this.cellIsO( cn ) || this.cellIsFree( cn ) ) { // i.e. it is not a win combo for x
            // remove simulation
            $('.xo').eq( i ).text('');
            $('.xo').eq( i ).removeClass('hidden');
            break;
          }
          if (j === numRows - 1) { // i.e. we've finished iterating and it didn't break so it must be a line with only x's
            blockCell = i;
            console.log( `blockCell = ${blockCell}` );
            // remove simulation
            $('.xo').eq( i ).text('');
            $('.xo').eq( i ).removeClass('hidden');
            return blockCell;
          }
        }
        // // check COLUMN for win
        // for (let i = 0; i < numRows; i++) {
        //   if ( $(`.row:eq(${ i }) .xo:eq(${ lastCol })`).text() !== lastMove ) {
        //     break;
        //   }
        //   if (i === numRows - 1) {
        //     // DO SOMETHING
        //     return;
        //   }
        // }
        // // check NEGATIVE DIAG for win
        // for (let i = 0; i < numRows; i++) {
        //   if ( $(`.row:eq(${ i }) .xo:eq(${ i })`).text() !== lastMove ) {
        //     break;
        //   }
        //   if (i === numRows - 1) {
        //     // DO SOMETHING
        //     return;
        //   }
        // }
        // // check POSITIVE DIAG for win
        // for (let i = 0; i < numRows; i++) {
        //     if ( $(`.row:eq(${ i }) .xo:eq(${ numRows - 1 - i })`).text() !== lastMove ) {
        //       break;
        //     }
        //   if (i === numRows - 1) {
        //     // DO SOMETHING
        //     return;
        //   }
        // }



      } // end for each cell number


  },





  choose: function () {
    let choice = -1;
    let possChoice = [];
    let possFreeChoice = [];
    // let xPresent = false;

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


    if ( 2 < numCellsFilled ) { // if not the first turn

      // for row 0
      // for (let i = 0; i < numRows; i++) {
      //   let cellValue = $(`.row:eq(${ r }) .xo:eq(${ i })`).text();
      //   if ( 'x' === cellValue ) {
      //
      //   }
      // }


      choice = this.checkForPossWin();
      console.log( `Choice after poss win f call: ${choice}` );
      if ( choice !== undefined ) return choice;





      } // end if 2 < numCellsFilled


      // if ( possChoice ) {
      //   choice = possChoice[ 0 ];
      //   console.log(`AI thinks this one: ${choice}`);
      //   return choice;
      // }



      // second attempt
      // for (let r = 0; r < numRows; r++) {
      //     for (let i = 0; i < numRows; i++) {
      //       let cellValue = $(`.row:eq(${ r }) .xo:eq(${ i })`).text();
      //       console.log( `r ${r} i ${i} cellValue ${cellValue} ` );
      //       if (cellValue === 'x') {
      //         console.log( `Row ${ r } is a bad idea` );
      //         possChoice = []; // so remove all the other poss places that you stored
      //         break;
      //       }
      //       if (cellValue === '' || cellValue === 'o') {
      //         let cellNumber = numRows * r + i;
      //         console.log(` poss choice here, o or blank ${cellNumber}`);
      //         possChoice.push( cellNumber );
      //         console.log( 'Poss choices: ' + possChoice );
      //         if ( possChoice.length === numRows ) {
      //           possFreeChoice = possChoice.filter( this.cellIsFree );
      //           console.log( `possFreeChoice s = ${ possFreeChoice }` );
      //           return possFreeChoice[ Math.floor( Math.random() * possFreeChoice.length ) ];
      //         }
      //       }
      //     }
      //   }









// first attempt
      // for (let r = 0; r < numRows; r++) {
      //     for (let i = 0; i < numRows; i++) {
      //       let cellValue = $(`.row:eq(${ r }) .xo:eq(${ i })`).text();
      //       console.log( `r ${r} i ${i} cellValue ${cellValue} ` );
      //       if (cellValue === 'x') {
      //         console.log( `Row ${ r } is a bad idea` );
      //         possChoice = []; // so remove all the other poss places that you stored
      //         break;
      //       }
      //       if (cellValue === 'o') continue;
      //       if (cellValue === '') {
      //         let cellNumber = numRows * r + i;
      //         console.log(` poss choice here ${cellNumber}`);
      //         possChoice.push( cellNumber );
      //         console.log( 'Poss choices: ' + possChoice );
      //       }
      //     }
      //   }
      // if ( possChoice ) {
      //   choice = possChoice[ 0 ];
      //   console.log(`AI thinks this one: ${choice}`);
      //   return choice;
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
