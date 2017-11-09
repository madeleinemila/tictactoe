


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
    // console.log( `Inside cellIsFree for n ${n} >>${ $('.xo').eq( n ).text() }<<` );
    if ( $('.xo').eq( n ).text() === '') {
      return true; // learnt not to return n, cos 0 is falsey
    }
    return false;
  },

  cellIsX: function ( n ) {
    if ( $('.xo').eq( n ).text() === 'x') {
      return true;
    }
    return false;
  },

  cellIsO: function ( n ) {
    if ( $('.xo').eq( n ).text() === 'o') {
      return true;
    }
    return false;
  },

  checkForPossWin: function () {  // I.E. !!!! CHECKING WHERE TO BLOCK X FROM WIN
    let blockCell;

    // for each cell number
    for (let i = 0; i < numCells; i++) {

        // if that cell number is taken, skip to next one
        if ( !this.cellIsFree( i ) ) {
          // console.log( `${i} cell is taken` );
          continue;
        }
        // console.log( `******************** Pretending cell ${i} is an x...` );

        // if it's blank, let's run the win tests if that cell is an X
        $('.xo').eq( i ).addClass('hidden');
        $('.xo').eq( i ).text('x');
        // console.log( `Now in cell ${i}: ` + $('.xo').eq( i ).text() );

        // check ROW for win
        for (let r = 0; r < numRows; r++) {
          // console.log( `Examining row number ${r} and i/fake x is ${i}` );
          for (let j = 0; j < numRows; j++) {
            let cn = numRows * r + j; // cell num
            // console.log( `Examining cell ${ cn } and i/fake x is ${i}` );
            // console.log( `First condition - is an O:  ${this.cellIsO( cn )}` );
            // console.log( `Second condition - is blank:  ${this.cellIsFree( cn )}` );
            // console.log( `NOW IN CELL i ${i} BEFORE CHECK: ` + $('.xo').eq( i ).text() );
            // console.log( `NOW IN CELL cn ${cn} BEFORE CHECK: ` + $('.xo').eq( cn ).text() );
            if ( this.cellIsO( cn ) || this.cellIsFree( cn ) ) { // i.e. it is not a win combo for x
              // console.log( `Not an impending win combo` );
              break; // break out of J LOOP, start to check a new row
            }
            if (j === numRows - 1) { // i.e. we've finished iterating and it didn't break so it must be a line with only x's
              blockCell = i;
              // console.log( `blockCell = ${blockCell}` );
              // remove simulation
              $('.xo').eq( i ).text('');
              $('.xo').eq( i ).removeClass('hidden');
              return blockCell;
            }
          } // end iterating through cells (j loop)
        } // end iterating through ROWS (r loop)



        // check COLUMN for win
        for (let cl = 0; cl < numRows; cl++) {
          // console.log( `Examining col number ${cl} and i/fake x is ${i}` );
          for (let j = 0; j < numRows; j++) {
            let cn = numRows * j + cl; // cell num
            // console.log( `Examining cell ${ cn } and i/fake x is ${i}` );
            // debugger;
            // console.log( `First condition - is an O:  ${this.cellIsO( cn )}` );
            // console.log( `Second condition - is blank:  ${this.cellIsFree( cn )}` );
            // console.log( `NOW IN CELL i ${i} BEFORE CHECK: ` + $('.xo').eq( i ).text() );
            // console.log( `NOW IN CELL cn ${cn} BEFORE CHECK: ` + $('.xo').eq( cn ).text() );
            if ( this.cellIsO( cn ) || this.cellIsFree( cn ) ) { // i.e. it is not a win combo for x
              // console.log( `Not an impending win combo` );
              break; // break out of J LOOP, start to check a new row
            }
            if (j === numRows - 1) { // i.e. we've finished iterating and it didn't break so it must be a line with only x's
              blockCell = i;
              // console.log( `blockCell = ${blockCell}` );
              // remove simulation
              $('.xo').eq( i ).text('');
              $('.xo').eq( i ).removeClass('hidden');
              return blockCell;
            }
          } // end iterating through cells (j loop)
        } // end iterating through COLUMNS (cl loop)






        // if we haven't returned a blockCell, then remove simulation
        $('.xo').eq( i ).text('');
        // console.log( `Simulated X removed` );
        $('.xo').eq( i ).removeClass('hidden');






      } // end iterating through simulated X positions (i loop)
  },





  choose: function () {
    let choice = -1;
    // let possChoice = [];
    // let possFreeChoice = [];


    if ( 2 < numCellsFilled ) { // if not the first turn
      choice = this.checkForPossWin();
      // console.log( `Choice after poss win f call: ${choice}` );
      if ( choice !== undefined ) return choice;
      }

    // or go centre-ish square first
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

    // or find available cells
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
