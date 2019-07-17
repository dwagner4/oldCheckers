<h1>Firebase Database Ops</h1>
A database project guide to assist in developing interactions with google's realtime database.

<h2>Firebase database init</h2>
Select the Database option during `firebase init`<br>
![Database init](https://github.com/onrul/firebase-collab/raw/master/database/images/Firebase_DB_init.PNG)<br>

<h2>Firebase functions and hosting</h2>
Also include the `hosting` and if applicable the `functions` options<br>
![hosting / functions](https://github.com/onrul/firebase-collab/raw/master/database/images/Firebase_db_functions_hosting.PNG)<br>

Continue to choose init options until complete<br>
Choose default project from `firebase console`. https://console.firebase.google.com/<br>
Set database.rules.json (leave default)<br>
Choose default language for cloud `functions` (JavaScript or TypeScript)<br>
Choose to use ESLint (Y/N)<br>
Install NPM dependencies (Y/N)<br>
Choose hosting public folder (default is public)<br>
Choose to configure as Single-Page App --rewrite URLs to single file (No)

<h2>Firebase database rules</h2>
Open `database.rules.json` file to edit database rules<br>
By default rules are set to `read` and `write` only by authorized users<br>
![alt text](https://github.com/onrul/firebase-collab/raw/master/database/images/firebase_database_default_rules.PNG "default db rules")<br>
Change `.read` and `.write` to `"true"` and save<br>
NOTE: Changes here will overwrite any rules in firebase console
![Sample database rules] (https://github.com/onrul/firebase-collab/raw/master/database/firebase_database_sampleRules.txt) <br>

<h2>Firebase deploy</h2>
When init is finished type in the terminal `firebase deploy` to publish<br>
Due to a bug, it is likely you will get a database deploy error<br>
![alt text](https://github.com/onrul/firebase-collab/raw/master/database/images/deploy_error_RESOURCE_DIR.PNG "deploy error")<br>
Open `firebase.json` file and remove `"predeploy"` as not needed and try to deploy again(https://github.com/firebase/firebase-tools/issues/822#issuecomment-406754186)<br>
When successfully deployed, firebase displays status deployment URL<br>
![alt text](https://github.com/onrul/firebase-collab/raw/master/database/images/firebase_deploy.PNG)<br>
Some additional commands that speed up deployment include `firebase deploy --only functions:app` or `firebase deploy --except functions`<br>

<h2>Express Integration</h2>
Since we do not want to have only static files within `public`, everything under the functions folder in firebase is dynamic<br>
Thus the need to save express files within a `functions` subfolder i.e. `views` or `routes` folders<br>
Change into `/functions` folder `cd functions`<br>
Install npm express module on the terminal `npm i express --save` this saves the express module as a dependency<br>
Edit the `firebase.json` file to include `"rewrites": [{"source": "**", "function": "app"}]` <br>
![alt text](https://github.com/onrul/firebase-collab/raw/master/database/images/firebase_firebase_json_rewrites.PNG "firebase.json")<br>

<h2>Setting a View Engine</h2>
Why? Because templating. EJS is Embedded JavaScript - which means you can pull JS from the server to dynamically create page elements<br>
![alt text](https://github.com/onrul/firebase-collab/raw/master/database/images/firebase_ejs_templating.PNG "ejs templating")<br>
cd into `/functions` directory. Run command `npm i ejs consolidate --save` to add ejs and consolidate modules for the view engines<br>
You can of course use something else like `handlebars` instead of `ejs` like `npm i handlebars consolidate --save`<br>
Once installed add to use within index.js `const engines = require('consolidate');`<br>
Create the view engine by adding `app.engine('ejs', engines.ejs);` or `app.engine('handlebars', engines.handlebars);`<br>
Tell the app where the engine should look by adding `app.set('views', './views');` under the `functions` directory<br>
Set the view engine by adding `app.set('view engine', 'ejs');` or `app.set('view engine', 'ejs');`<br>

