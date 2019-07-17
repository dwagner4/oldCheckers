/**
 * Module for auth and session management
 */
 
/*global firebase*/
let loggedIn = false;


let Session = (function() {


/*
 * Sign in with a username and password
 * */
function signInWithEmailandPassword() {
    let email = document.querySelector("#email");
    let password = document.querySelector("#password");
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)
        .then(user => {
            console.log("Signed in with user: ", user);
        })
        .catch(error => {
            console.log("Sign in Error: ", error);
        });
}

/*
 * Sign in with you Google Account
 * */
function signInWithGoogle() {
    console.log("Attempting to sign in with Google");
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/userinfo.email");
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

    firebase.auth().signInWithPopup(provider).catch(error => {
        console.log("Google Login error: ", error);
    });
}

/*
 * Display Profile Details once logged in
 * */
function getProfile(user) {
    let profileForm = document.querySelector("#profileForm");
    let name = document.querySelector("#profile-displayname");
    let email = document.querySelector("#profile-email");
    let profileImage = document.querySelector("#profileImage");
    let photoUrl = document.querySelector("#profile-photoUrl");
    let uid = document.querySelector("#profile-uid");
    let emailVerified = document.querySelector("#profile-emailVerified");
    
    if (user != null) {
      profileForm.classList.remove("hide");
      profileImage.src = user.photoURL;
      name.value = user.displayName;
      email.value = user.email;
      photoUrl.value = user.photoURL;
      emailVerified.value = user.emailVerified;
      uid.value = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                      // this value to authenticate with your backend server, if
                      // you have one. Use User.getToken() instead.
    }
}

/*
 * Do the work to actually create an account
 * with Firebase
 * */
function submitCreateAccount() {
    let user = null;
    //fields
    let displayName = document.querySelector("#entry-displayname").value;
    let email = document.querySelector("#entry-email").value;
    let password = document.querySelector("#entry-password").value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function () {
            user = firebase.auth().currentUser;
            user.sendEmailVerification();
        })
        .then(function () {
            user = firebase.auth().currentUser;
            user.updateProfile({displayName: displayName});
            console.log("displayName updated to: " + displayName);
        })
        .catch(function(error) {
            console.log("err", error);
            console.log("err msg", error.message);
        });
    console.log('Validation link was sent to: ' + email + '.');
    
    // function updateDisplayName(displayName) {
    //     user = firebase.auth().currentUser;
    //     user.updateProfile({displayName: displayName});
    //     console.log("displayName updated to: " + displayName);
    // }
}

/*
 * Sign out 
 * 
 * */
 
function signOut() {
        console.log("signing user out");
        firebase.auth().signOut()
        .then(() => {
            console.log('Signed Out');
        })
        .catch((error) => {
        console.error('Sign Out Error', error);
        });
}

/*
 * Exported functions
 * 
 * */

        // //call state change listener function
        // firebase.auth().onAuthStateChanged(authStateChangeListener);
        
    //These event listeners are specific to the login page
    //logout of provider
    document.querySelector("#logout").addEventListener("click", signOut);
    //email and password
    document.querySelector("#sign-in").addEventListener("click", signInWithEmailandPassword);
    //google login
    document.querySelector("#google-signin img").addEventListener("click", signInWithGoogle);
    //create new account
    document.querySelector("#entry-submit").addEventListener("click", submitCreateAccount);
        
})();

/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
    console.log("initApp");

  // Listening for auth state changes.
  firebase.auth().onAuthStateChanged(function(user) {
      
    if (user) {
      // User is signed in.
        console.log(user.displayName + " is now logged in");
        loggedIn = true;
        let profileForm = document.querySelector("#profileForm");
        let name = document.querySelector("#profile-displayname");
        let email = document.querySelector("#profile-email");
        let profileImage = document.querySelector("#profileImage");
        let photoUrl = document.querySelector("#profile-photoUrl");
        let uid = document.querySelector("#profile-uid");
        let emailVerified = document.querySelector("#profile-emailVerified");
        
        if (user != null) {
          profileForm.classList.remove("hide");
          profileImage.src = user.photoURL;
          name.value = user.displayName;
          email.value = user.email;
          photoUrl.value = user.photoURL;
          emailVerified.value = user.emailVerified;
          uid.value = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                          // this value to authenticate with your backend server, if
                          // you have one. Use User.getToken() instead.
        }
        
        document.querySelector("#login").style.display = "none";
        document.querySelector("#logout").style.display = "block";
        //Session.getProfile(user);
        
        //Chat.onlogin();
        //Game.onlogin();
      
    } else {
        // User is signed out.
        if (loggedIn) {
            loggedIn = false;
            window.location.reload();
        }
    }
    
  });
  
}

window.onload = () => initApp();
