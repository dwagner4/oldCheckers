


function loginInit () {
  firebase.auth().onAuthStateChanged(function(user) {
    document.getElementById('donut-verify-email').disabled = true;
    if (user) {
      let userEvent = new CustomEvent( 'newuserevent', {
        bubbles: true,
        detail: {
          email: user.email,
          emailVerified: user.emailVerified
        }
      });
      document.dispatchEvent(userEvent);
    } else {
      let userEvent = new CustomEvent( 'nouserevent', { bubbles: true });
      document.dispatchEvent(userEvent);
    }
  });
  //
  document.getElementById('donut-sign-in').addEventListener('click', toggleSignIn, false);
  document.getElementById('donut-sign-up').addEventListener('click', handleSignUp, false);
  document.getElementById('donut-verify-email').addEventListener('click', sendEmailVerification, false);
  document.getElementById('donut-password-reset').addEventListener('click', sendPasswordReset, false);
};

function toggleSignIn() {
  if (firebase.auth().currentUser) {
    firebase.auth().signOut();
  } else {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    //  TODO validate input

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(k){
      let userEvent = new CustomEvent( 'loginmsg', {
        detail: { msg: "Logged in"},
        bubbles: true
      });
      document.dispatchEvent(userEvent);
    })
    .catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        let userEvent = new CustomEvent( 'loginmsg', {
          detail: { msg: "Wrong password."},
          bubbles: true
        });
        document.dispatchEvent(userEvent);
      } else {
        let userEvent = new CustomEvent( 'loginmsg', {
          detail: { msg: errorMessage },
          bubbles: true
        });
        document.dispatchEvent(userEvent);
      }
    });
  }
}

/**
 * Handles the sign up button press.
 */
function handleSignUp() {
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  if (email.length < 4) {
    let userEvent = new CustomEvent( 'loginmsg', {
      detail: { msg: 'Please enter an email address.' },
      bubbles: true
    });
    document.dispatchEvent(userEvent);
    return;
  }
  if (password.length < 4) {
    let userEvent = new CustomEvent( 'loginmsg', {
      detail: { msg: 'Please enter a password.' },
      bubbles: true
    });
    document.dispatchEvent(userEvent);
    return;
  }
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/weak-password') {
      let userEvent = new CustomEvent( 'loginmsg', {
        detail: { msg: 'The password is too weak.' },
        bubbles: true
      });
      document.dispatchEvent(userEvent);
    } else {
      let userEvent = new CustomEvent( 'loginmsg', {
        detail: { msg: errorMessage },
        bubbles: true
      });
      document.dispatchEvent(userEvent);
    }
    console.log(error);
  });
}

/**
 * Sends an email verification to the user.
 */
function sendEmailVerification() {
  firebase.auth().currentUser.sendEmailVerification().then(function() {
    let userEvent = new CustomEvent( 'loginmsg', {
      detail: { msg: 'Email Verification Sent!' },
      bubbles: true
    });
    document.dispatchEvent(userEvent);
  });
}

function sendPasswordReset() {
  var email = document.getElementById('email').value;
  firebase.auth().sendPasswordResetEmail(email).then(function() {
    let userEvent = new CustomEvent( 'loginmsg', {
      detail: { msg: 'Password Reset Email Sent!' },
      bubbles: true
    });
    document.dispatchEvent(userEvent);
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode == 'auth/invalid-email') {
      let userEvent = new CustomEvent( 'loginmsg', {
        detail: { msg: errorMessage },
        bubbles: true
      });
      document.dispatchEvent(userEvent);
    } else if (errorCode == 'auth/user-not-found') {
      let userEvent = new CustomEvent( 'loginmsg', {
        detail: { msg: errorMessage },
        bubbles: true
      });
      document.dispatchEvent(userEvent);
    }
    console.log(error);
  });
}
