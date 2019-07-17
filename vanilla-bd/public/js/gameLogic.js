let user = {uid: "A"};
let gameid = "";
let match = {};
let localPlay = true;
let yourColor = "r";
let selected = null;
let allMoves = [];
let msg = "";
let lastMove = null;

/**
 * init board, init match, draw board and add listener for board clicks
 */
document.addEventListener("DOMContentLoaded", event => {
  initBoard(63);
  match = initMatch( "r","A", "A" );
  msg = "New match, Red's turn";
  document.getElementById('msgbd').innerHTML = msg;
  setBoard(match.boardState, selected, allMoves);
  document.addEventListener('bdclickevent', e => {
    handleBdClick( e.detail.index, e.detail.code )
  });

});

function setgameid () {
  gameid = document.getElementById('gameid').value;

}

/**
 * Callback for handling click events on the board
 *
 * @param {int} index index of testSpace
 * @param {string} code e | r | R | b | B
 */
function handleBdClick ( index, code ) {

  // check for remote play and turn
  if ( match.redUID != match.blkUID && yourColor != match.turn.color) {
    let trn = match.turn.color == "r" ? "  Red" : "  Black";
    msg = "Not your turn, " + trn + "'s turn !!!"
    document.getElementById('msgbd').innerHTML = msg;
    return;
  }

  console.log("in the board click", index, code);

  if (code != "e") {  //not empty
    // is there a selected.piece piece already for this turn
    if (code == 'B') {code = 'b'}
    if (code == 'R') {code = 'r'}
    if (code == match.turn.color ) {
      allMoves = getPosSpaces(match)
      if (allMoves.length == 0) {
        alert("GAME IS OVER !!");
        return;
      }
      
      if (selected == index) {
        selected = null;
      } else {
        selected = index;
      }

      setBoard(match.boardState, selected, allMoves);
      let trn = match.turn.color == "r" ? "  Red" : "  Black";
      msg = "Do your best." + trn + "'s turn."
      document.getElementById('msgbd').innerHTML = msg;
    } else {
      let trn = match.turn.color == "r" ? "  Red" : "  Black";
      msg = "either there is no piece selected or you've selected the wrong color." + trn + "'s turn."
      document.getElementById('msgbd').innerHTML = msg;
      console.log("not selected.piece or wrong color ");
      return;
    }
  } else {
    if ( selected >= 0 ) {
      let rslt = doMove(match, selected, index);
      match = rslt.newMatchState;
      lastMove = rslt.lastMove;
      msg = rslt.msg;
      selected = null;

      allMoves = getPosSpaces(match)
      if (allMoves.length == 0) {
        alert("GAME IS OVER !!");
        return;
      }
      setBoard(match.boardState, selected, allMoves);
      let trn = match.turn.color == "r" ? "  Red" : "  Black";
      msg = msg + trn + "'s turn."
      document.getElementById('msgbd').innerHTML = msg;
      console.log(msg);
    } else {
      let trn = match.turn.color == "r" ? "  Red" : "  Black";
      msg = "empty space, no selected piece" + trn +"'s turn";
      document.getElementById('msgbd').innerHTML = msg;
      console.log("empty space, no selected piece");
    }
  }
}

function _submitMoveRemote( sel, i, j ) {
  alert(" submitting remote move");
}
