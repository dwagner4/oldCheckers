var provider = new firebase.auth.GoogleAuthProvider();

function googleSignin() {
    firebase.auth()

        .signInWithPopup(provider).then(function(result) {
            //console.table(result);
            token = result.credential.accessToken;
            user = result.user;

            console.log("token:", token)
            console.log("user", user.displayName)
            $("#userDisplayName").html(user.displayName);
            $("#email").html(user.email);
            $('#profileImage').attr("src", user.photoURL);
            $("#lastSigninTime").html(user.metadata.lastSignInTime);

        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(error.code)
            console.log(error.message)

        });
}

function googleSignout() {
    firebase.auth().signOut()

        .then(function() {
            console.log('Signout Succesfull')
            $("#userDisplayName").html("").empty();
            $("#email").html("").empty();
            $("#profileImage").attr("src", "");
            $("#lastSigninTime").html("").empty();

        }, function(error) {
            console.log('Signout Failed')
        });
}

function googleSignInPersist() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function() {

            return firebase.auth().signInWithPopup(provider);

        }).then(function(result) {
            var token = result.credential.accessToken;
            var user = result.user;
            $("#userPlaceHolder").html(user.displayName);
        }).then(function() {
            firebase.auth().onAuthStateChanged(function(user) {
                // Once authenticated, instantiate Firechat with the logged in user
                if (user) {
                    initChat(user);
                }
            });
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}
