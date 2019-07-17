# Demo of Firebase Email/password login

You must have the firebase-cli installed.  from the commend line do this

    npm install -g firebase-tools

then login

    firebase login

then from the firebaseLogin folder,

    firebase serve
    
this should get you something like this
    === Serving from '/Users/deanwagner/donut-password'...

    i  hosting: Serving hosting files from: public
    ✔  hosting: Local server: http://localhost:5000

In order to use it in your own firebase account

1. sign up for a firebase free account
1. set up a Project
1. in the project console, go to the authentication tab in the lefthand menu
1. go to the "sign-in-method" tab and select "email/password"
1. enable it and hit the "save" button
1. return to the firebase login folder and delete the firebase.json files
1. run "firebase init" and follow the instructions
1. run it locally with "firebase serve"
1. or deploy it to the cloud with "firebase deploy"
