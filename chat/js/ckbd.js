/*  Plain vainilla JS checker Board
 *
 *  Needs a canvas with an id="board"  */
//console.log("WTF")

let isTestKing = false;
let currentPerson;

function showUser() {
  currentPerson = firebase.auth().currentUser.displayName;
}

function showUser2() {
  let authData = firebase.auth().currentUser;
  console.log(authData);
}

//document.addEventListener("DOMContentLoaded", event => {
function getData() {
  const app = firebase.app();
  const database = app.database(); //load up only database from app
  let ref = database.ref('moves');
  ref.on('value', getMoves, errMoves);

}

  function getMoves(move) {
    //console.log(move.val());
    let moves = move.val();
    let keys = Object.keys(moves);
    //console.log(keys);
    for (var i = 0; i < keys.length; i++) {
      let k = keys[i];
      let userName = moves[k].name;
      let x = moves[k].x;
      let y = moves[k].y;
      let isTestKing = moves[k].isKing;
      //console.log("name:", userName, "x:", x, "y:", y, "isKing:", isTestKing);
      let item = document.createElement("li"); // Create a <li> node
      var textnode = document.createTextNode("user:" + userName + " x:" + x + " y:" + y + " isKing:" + isTestKing); // Create a text node
      item.appendChild(textnode); // Append the text to <li>

      document.getElementById("dbMoves").appendChild(item); // Append <li> to <ul> with id="dbMoves"
    }
  }

  function errMoves(err) {
    console.log("Error!", err);
  }

  let selected = null;

  let piecesArray = [
    { x: 0, y: 0, color: "red", isKing: false },
    { x: 2, y: 0, color: "red", isKing: false },
    { x: 4, y: 0, color: "red", isKing: false },
    { x: 6, y: 0, color: "red", isKing: false },
    { x: 1, y: 1, color: "red", isKing: false },
    { x: 3, y: 1, color: "red", isKing: false },
    { x: 5, y: 1, color: "red", isKing: false },
    { x: 7, y: 1, color: "red", isKing: false },
    { x: 0, y: 2, color: "red", isKing: false },
    { x: 2, y: 2, color: "red", isKing: false },
    { x: 4, y: 2, color: "red", isKing: false },
    { x: 6, y: 2, color: "red", isKing: false },
    { x: 1, y: 5, color: "black", isKing: false },
    { x: 3, y: 5, color: "black", isKing: false },
    { x: 5, y: 5, color: "black", isKing: false },
    { x: 7, y: 5, color: "black", isKing: false },
    { x: 0, y: 6, color: "black", isKing: false },
    { x: 2, y: 6, color: "black", isKing: false },
    { x: 4, y: 6, color: "black", isKing: false },
    { x: 6, y: 6, color: "black", isKing: false },
    { x: 1, y: 7, color: "black", isKing: false },
    { x: 3, y: 7, color: "black", isKing: false },
    { x: 5, y: 7, color: "black", isKing: false },
    { x: 7, y: 7, color: "black", isKing: false },
  ];

  function draw() {
    // draw the board
    let c = document.getElementById('board');
    let ctx = c.getContext("2d");
    for (var i = 0; i < 8; i++) {
      for (var j = 0; j < 8; j++) {
        if (i % 2 == j % 2) {
          // if (i%2) {
          ctx.fillStyle = "grey";
          ctx.fillRect(63 * i, 63 * j, 63, 63)
        }
        else {
          ctx.fillStyle = "white";
          ctx.fillRect(63 * i, 63 * j, 63, 63)
        }
      }
    }

    // draw selected box
    if (selected) {
      ctx.fillStyle = "green";
      ctx.fillRect(63 * selected.x, 63 * selected.y, 63, 63)
    }
    // draw the pieces
    for (var i = 0; i < piecesArray.length; i++) {
      let pcs = piecesArray[i];
      let xcorr = pcs.x * 63 + 32;
      let ycorr = pcs.y * 63 + 32;
      ctx.beginPath();
      ctx.arc(xcorr, ycorr, 25, 0, 2 * Math.PI);
      ctx.stroke();
      // console.log(pcs);
      pcs.color == "red" ? ctx.fillStyle = "red" : ctx.fillStyle = "black";
      ctx.fill()
      if (pcs.isKing) {
        ctx.beginPath();
        ctx.arc(xcorr, ycorr, 10, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fillStyle = "yellow";
        ctx.fill()
      }
    }
    // console.log(this.diagonals);
    // console.log(this.piecesArray);

  }

  //es6
  function load() {
    console.log("load event detected!");

    let elemLeft = document.getElementById('board').offsetLeft;
    let elemTop = document.getElementById('board').offsetTop;
    document.getElementById('board').addEventListener('click', e => {
      let x = Math.floor((e.pageX - elemLeft) / 63);
      let y = Math.floor((e.pageY - elemTop) / 63);
      //alert("just clicked in square " + x + ", " + y + "!");
      showUser();
      console.log(currentPerson + " clicked", x, y);
      let item = document.createElement("li"); // Create a <li> node
      var textnode = document.createTextNode("user: " + currentPerson + " x:" + x + " y:" + y + " isKing:" + isTestKing); // Create a text node
      item.appendChild(textnode); // Append the text to <li>

      document.getElementById("movesLog").appendChild(item); // Append <li> to <ul> with id="movesLog"
      saveMove(currentPerson, x, y, isTestKing);
    });
    draw();
  }
  window.onload = load;



function saveMove(displayName, x, y, isTestKing) {
  const app = firebase.app(); //load up all firebase apps
  const database = app.database(); //load up only database from app
  let ref = database.ref('moves');

  let move = {
    name: displayName,
    x: x,
    y: y,
    isKing: isTestKing
  }

  ref.push(move);
}

function hideLoginMsg() {
  //logMsg.setAttribute(hidden, true);
  document.getElementById("logMsg").hidden = true;
}

function initChat(user) {
  // Get a Firebase Database ref
  var chatRef = firebase.database().ref("chat");

  // Create a Firechat instance
  var chat = new FirechatUI(chatRef, document.getElementById("firechat-wrapper"));

  // Set the Firechat user
  chat.setUser(user.uid, user.displayName);
}
