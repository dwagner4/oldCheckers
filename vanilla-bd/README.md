# Chalkers Rules and Standard Display

An attempt was made to write a plain vanilla JS rules script and UI.  Both are held together with a simple game logic script.  We should move on to a framework.

The ruleEngine.js fire has an "API" with three functions

  * initMatch() =>  match
  * getPosSpaces() => Array<int>  indexes of legal moves
  * doMove(match, fm, to) => {lastTurn, newMatchState, msg}

Run it locally with either firebase serve or some other local server.  It is deployed to chalkers-donuts.firebaseapp.com

It includes tests for the ruleEngine.  from the public folder

    npm install
    npm run-script tests

should run 6 jest tests and pass.

the ckbd.js standard checkerboard has two functions and fires a boardClick event.  

  * boardInit(spaceSizeInPixels)
  * setBoard(match, selectedIndex, possibleMoveArray)
