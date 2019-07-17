# performant checker boards

The state of the board is modeled as a String of 32 characters, "e" || "r" || "R" || "b" || "B".  
Essentially an 8 x 4 array of empty, red, redKing, black, blackKing.
The method of display is left to the implementations as long as they implement the interface.

Should there be an event representing a "move"?  Thinking of something like drag-n-drop.

## constructor
will build all needed DOM elements and append to a <div id="checkerboard>  will add a listener for "bdclickevent"  tevent o the document with detail: { index: [0..31], state: ["e" || "r" || "R" || "b" || "B] }
  
* initBoard( spaceWidth: odd integer) => 
 Creates the DOM elements in a <div id="checkerboard">, sets up the event listeners and draws the board

## methods

* setBoard( boardState: String.length == 32, selectedSpace: 0..31, possibleMoves: String.length == 32 ) 
  replaces the pieces String, selection, moves and then redraws
  
* setSpace( index: 0..31, pc: ["e" || "r" || "R" || "b" || "B"] )
* setBdState(bdstate)
+ setSel(selectedIndex)
* setAllMvs( String.length 32)  like boardState "m" indicates a possible move


## Events
* fires 'bdclickevent' with detail: { index: 0..31, code: e|r|R|b|B }
* optionally fire a move event like a drag and drop might generate

## Example

    initBoard("rrrrrrrrrrrreeeeeeeebbbbbbbbbbbb"); 
    setSpace(8, "e");
    setSpace(12, "r");
