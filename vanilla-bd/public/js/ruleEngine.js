/***********
*  decoupled checkers rules
*
*   fmcode ????
*/


const startBoard = ["r", "r", "r", "r",
                    "r", "r", "r", "r",
                    "r", "r", "r", "r",
                    "e", "e", "e", "e",
                    "e", "e", "e", "e",
                    "b", "b", "b", "b",
                    "b", "b", "b", "b",
                    "b", "b", "b", "b"
                  ];


/**
 * initiates a match object
 *
 * @param {string} turnColor  -'r' | 'b'
 * @param {string} redPlayerUID - 
 * @param {string} blkPlayerUID -
 * @return {object}  a match
 */
function initMatch( turnColor,redPlayerUID,blkPlayerUID ) {
  let stat = "pending";
  if (redPlayerUID && blkPlayerUID) {  // local game?
    stat = "active";
  }
  return {turn: {color: turnColor, chain: false, chainSpace: null},
    boardState: startBoard,
    redUID: redPlayerUID,
    blkUID: blkPlayerUID,
    status: stat
  };
}

/**
 * apply the rules of checkers to a move and calculate the new gameState
 *
 * @param {object} match - object of current match,
 * @param {int} fm - index of proposed piece to move
 * @param {int} to - index of space to move
 * @return {object} {lastTurn, newMatchState, msg}
 */
function doMove ( match, fm, to )  {
  let turn = match.turn;
  let fmcode = match.boardState[fm];
  let isLJ = false;  // is legal jump
  let captured = null;  // index of captured piece
  let tocode = match.boardState[to];
  let fmcolor = 'e';
  if (fmcode == 'r' || fmcode == 'R') {fmcolor = 'r';}
  if (fmcode == 'b' || fmcode == 'B') {fmcolor = 'b';}



  console.log(fm, to, turn.chain, turn.chainSpace);

  //  check turn, check space is empty
  if (turn.color != fmcolor || tocode != "e") {
    console.log("turn.color, fmcolor, tocode != 'e'",turn.color, fmcolor, tocode);
    return { lastMove: {fm: fm, to: to}, newMatchState: match, msg: "Move is illegal 3" };
  }

  if ( fm - to > 5 || to - fm > 5){
    // checking for legal jump isLJ
    let jumpList = getAllJumps(match);
    let [ isLJ, captured ] = [ false, null ];
    for (var i = 0; i < jumpList.length; i++) {
      if (jumpList[i][2] == fm && jumpList[i][0] == to) {
        [ isLJ, captured ] =  [ true, jumpList[i][1] ];
      }
    }
    // console.log("[ isLJ, captured ]", isLJ, captured );

    // Check chain first
    if ( isLJ && ((!turn.chain) || (turn.chain && turn.chainSpace == fm))) {
      console.log("jump");
      let code = match.boardState[fm];
      match.boardState[fm] = 'e';
      match.boardState[captured] = 'e';
      //  check for kinging
      if (to > 27  && code == 'r') {code = 'R'}
      if (to < 4 && code == 'b') {code = 'B'}
      match.boardState[to] = code;

      let newjumpList = getAllJumps(match);
      console.log(newjumpList)
      let hasJump = false;
      for (var i = 0; i < newjumpList.length; i++) {
        if (newjumpList[i][2] == to) {
          hasJump =  true;
        }
      }

      if ( !hasJump ) {
        match.turn = {color: 'b', chain: false, chainSpace: null};
        if (code == 'b' || code == 'B') {match.turn.color = 'r';}
      } else {
        match.turn = {color: 'b', chain: true, chainSpace: to};
        if (code == 'r' || code == 'R') {match.turn.color = 'r';}
      }

      return { lastMove: {fm: fm, to: to}, newMatchState: match, msg: "Great Jump!!!" };
    } else {
      return { lastMove: {fm: fm, to: to}, newMatchState: match, msg: "WTF ???" };
    }

    // test for a jump
    // if (!turn.chain && isLJ) {
    //   let code = match.boardState[fm];
    //   match.boardState[fm] = 'e';
    //   match.boardState[captured] = 'e';
    //   match.boardState[to] = code;
    //   return { lastMove: {fm: fm, to: to}, newMatchState: match, msg: "Move is illegal" };
    // }
  }


  // test for a normal ove
  let jumpNum = getAllJumps(match).length;
  if (jumpNum == 0) {hasAJump = false;} else {hasAJump = true;}

  let isLM = false;
  let mvList = getAllMvs(match);
  for (var i = 0; i < mvList.length; i++) {
    if (mvList[i][1] == fm && mvList[i][0] == to) {
      isLM = true;
    }
  }
  if (!hasAJump && isLM) {
    let code = match.boardState[fm];
    match.boardState[fm] = 'e';
    if (to > 27  && code == 'r') {code = 'R'}
    if (to < 4 && code == 'b') {code = 'B'}
    match.boardState[to] = code;
    match.turn = {color: 'b', chain: false, chainSpace: null};
    if (code == 'b' || code == 'B') {match.turn.color = 'r';}
    return { lastMove: {fm: fm, to: to}, newMatchState: match, msg: "Great Move!!" };
  }

  //  illegal move
  return { lastMove: {fm: fm, to: to}, newMatchState: match, msg: "Move is illegal 1" };
}

/**
 * calculate all possible next moves of player that has turn
 *
 * @param {object} match - object of current match,
 * @return {array} array of int indexes
 */
 function getPosSpaces(match) {
  let resultArray = []
  let jmps = getAllJumps(match);
  if (jmps.length > 0) {
    for (var i = 0; i < jmps.length; i++) {
      resultArray.push(jmps[i][0]);
    }
  } else {
    let mvs = getAllMvs(match);
    for (var i = 0; i < mvs.length; i++) {
      resultArray.push(mvs[i][0]);
    }
  }
  return resultArray;
}


// ******************  other functions   *****************


// returns an array of all possible next moves
function getAllMvs(match) {
  let moveSet = new Set();
  let code = match.turn.color;
  for (let i = 0; i < match.boardState.length; i++) {
    let testPiece = match.boardState[i];
    testCode = testPiece.toLowerCase();
    if ( testCode == code ) {
      let y = Math.floor( i / 4 );
      let x = i % 4;
      let odd = y % 2;
      let testSpace = match.boardState[ i + 3 + odd ];
      if (testPiece != 'b' && y < 7  && x + odd > 0 && testSpace == 'e') {
        moveSet.add( [i + 3 + odd, i] );
      }
      testSpace = match.boardState[ i + 4 + odd ];
      if (testPiece != 'b' && y < 7  &&  x + odd < 4 && testSpace == 'e') {
        moveSet.add( [i + 4 + odd, i] );
      }
      testSpace = match.boardState[ i - 5 + odd ];
      if (testPiece != 'r' && y > 0  && x + odd > 0 && testSpace == 'e') {
        moveSet.add( [i - 5 + odd, i] );
      }
      testSpace = match.boardState[ i - 4 + odd ];
      if (testPiece != 'r' && y > 0  && x + odd < 4 && testSpace == 'e') {
        moveSet.add( [i - 4 + odd, i] );
      }
    }
  }
  let allMoves = [];
  for (let move of moveSet) {
    allMoves.push(move);
  }
  return allMoves;
}

//  returns an array of all possible jumps in the gameState
function getAllJumps(match) {
  let jumpSet = new Set();
  let code = match.turn.color;
  for (let i = 0; i < match.boardState.length; i++) {
    let testPiece = match.boardState[i];
    testCode = testPiece.toLowerCase();
    if ( testCode == code ) {

      let targetCode = 'b';
      if (testCode == 'b') { targetCode = 'r'}
      let y = Math.floor(i / 4);
      let oddOffset = (y % 2)
      let x = i % 4;

      let testSpace = match.boardState[ i + 7 ]
      if ( testPiece != 'b' && y < 6  && testSpace == 'e' && x > 0 ){
        captured = i + 3 + oddOffset;
        if (match.boardState[captured].toLowerCase() == targetCode) {
          jumpSet.add([i + 7, captured, i]);
        }
      }
      testSpace = match.boardState[ i + 9 ]
      if ( testPiece != 'b' && y < 6  && testSpace == 'e' && x < 3 ){
        captured = i + 4 + oddOffset;
        if (match.boardState[captured].toLowerCase() == targetCode) {
          jumpSet.add([i + 9, captured, i]);
        }
      }
      testSpace = match.boardState[ i - 9 ]
      if( testPiece != 'r' && y > 1  && testSpace == 'e' && x > 0 ){
        captured = i - 5 + oddOffset;
        if (match.boardState[captured].toLowerCase() == targetCode) {
          jumpSet.add([i - 9, captured, i]);
        }
      }
      testSpace = match.boardState[ i - 7 ]
      if ( testPiece != 'r' && y > 1  && testSpace == 'e' && x < 3 ){
        captured = i - 4 + oddOffset;
        if (match.boardState[captured].toLowerCase() == targetCode) {
          jumpSet.add([i - 7, captured, i]);
        }
      }
    }
  }
  let allJumps = [];
  for (let jump of jumpSet) {
    allJumps.push(jump);
  }
  return allJumps;
}


module.exports = { getPosSpaces, getAllMvs, getAllJumps, doMove, initMatch }
