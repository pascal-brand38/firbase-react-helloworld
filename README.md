Firebase + React + Vite Step by Step
====================================

This is a step-by-step application using
* [Firebase](https://firebase.google.com/) as the hosting: database,...
* [React](https://react.dev/) for the web application library
* [Vite](https://vitejs.dev/) to setup the application

____________________________________________________________________

React + Vite Initialization
---------------------------

This creates a basic application with [React](https://react.dev/).

First, create github repo on github https://github.com/new.
The repo should be empty (no README, no .gitgnore,...), apart the license file as [Vite](https://vitejs.dev/) will replace existing files.

Then locally

```bash
# Clone the repo locally
git clone git@github.com:pascal-brand38/firbase-react-helloworld.git

# Install Vite if not already done
npm install --global vite

# Create the application
#   with project name being firbase-react-helloworld
#   and choose "Ignore files and continue"
#   and then use React framework, with javascript
npm create vite@latest

# Once created, install it, and push onto gituhub
cd firbase-react-helloworld
npm install
git add .
git commit -s -m 'vite + react'
git push

# Run the app
# and then open your web browser at http://localhost:5173
npm run dev
```


____________________________________________________________________

[Firebase](https://firebase.google.com/) Create and Deploy
----------------------------------------

First, a firebase project must be created on https://firebase.google.com/

```bash
Go to console

# Add a new project
#   Name: firbase-react-helloworld
#   Do not activate Google Analytics
Add a project

# Prepare to link with your react application
# by adding a web application
#    pseudo: firbase-react-helloworld
#    and  "Configurer également Firebase Hosting pour cette application."
Add the application "web"
```

Once done, run the following locally
```bash
# install firebase and firebase CLI
npm install firebase firebase-tools

# Link your app with the Firebase project
firebase login
firebase init
# and choose, with <space>
#      "Hosting: Configure files for Firebase Hosting
#       and (optionally) set up GitHub Action deploys"
# and then enter
# then "use an existing project"
# and choose "firbase-react-helloworld"
# 	? What do you want to use as your public directory? dist
# 	? Configure as a single-page app (rewrite all urls to /index.html)? No
# 	? Set up automatic builds and deploys with GitHub? No

# build the react app to create dist directory
npm run build

# deploy on https://firbase-react-helloworld.web.app/
firebase deploy

# save on git
git add .
git commit -s -m 'firebase'
git push
```

____________________________________________________________________

[Firebase](https://firebase.google.com/) Use in the application
----------------------------------------

In App.jsx, use the following:

```js
import { initializeApp } from "firebase/app"
const [app, setApp] = useState(undefined)

useEffect(() => {
  const init = async() => {
    const firebaseConfig = {    // is found in the firebase application parameters
      apiKey: "AIzaSyAggx6E7Q6ttCUI2Lkexf6xz4VvtiPNUZc",
      authDomain: "firbase-react-helloworld.firebaseapp.com",
      projectId: "firbase-react-helloworld",
      storageBucket: "firbase-react-helloworld.appspot.com",
      messagingSenderId: "597188741887",
      appId: "1:597188741887:web:fa6a8203246efeed77daca"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    setApp(app)
  }

  init()

}, [])
```


____________________________________________________________________

Firestore Database
------------------

### Database creation
Go on https://firebase.google.com, then ```go to the console```, and then select the project (firbase-react-helloworld)

Then click on ```Create / Firestore Database```, and then ```Create a database``` and ```Démarrer en mode test```

Then ```Create a new collection```
* called stats
* with document id being count
* with 1 field: count, a number initialized at 0

### Database usage in the Application

You can refer at [Google documentation](https://firebase.google.com/docs/firestore/query-data/get-data?hl=fr).


#### Use the Database

In App.jsx, use the following:

```js
import { getFirestore } from "firebase/firestore"
import { doc, getDoc, setDoc } from "firebase/firestore"

const [db, setDb] = useState(undefined)

useEffect(() => {
  const init = async() => {
    const db = getFirestore(app);
    setDb(db)


    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setCount(docSnap.data().count)    // read the database
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  init()
}, [])

// Read a value from the database
const docRef = doc(db, "stats", "count");
const docSnap = await getDoc(docRef);

// Write a value to the database
setDoc(docRef, { count: newCount }, { merge: true });
```


Authentication
--------------

Several [authentication methods](https://firebase.google.com/docs/auth/where-to-start?authuser=0&hl=fr) exist in Firebase, such as the [Authentication Email/Password](https://firebase.google.com/docs/auth/web/password-auth?authuser=0&hl=fr).

In order to use email/password authentication, ```go to the console``` and
your project, then ```Create Authentication```, then ```Email/Password```, and finally ```Activate```.

To create a new user
```js
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
```

To connect
```js
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
```



Storage
=======

In the Firebase console, create a Storage, a directory
```Public``` in the storage, and finally upload a file there.

In the rules tab of the console, create the following rule to
indicate that anything inside the public folder is read-only:
```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    match /public/{file} {
      allow read;
      allow write: if false;
    }
  }
}
```

And finally configure the storage to be accessed whatever is the IP:
```bash
pacman -S mingw-w64-x86_64-python-gsutil
python -m pip install requests

cat <<< EOF >>> cors.json
[
  {
    "origin": ["*"],
    "method": ["GET"],
    "maxAgeSeconds": 3600
  }
]
EOF

gsutil cors set cors.json gs://firbase-react-helloworld.appspot.com
```

In your application, use the following to get the url access of a file,
to be run once the app initialization is performed:
```js
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const storage = getStorage();
const imgRef = ref(storage, 'public/firebase-cloud-storage.png');
getDownloadURL(imgRef)
  .then((url) => {
    // Insert url into an <img> tag to "download"
    console.log('PASCAL url ', url)
    setUrl(url)
  })
  .catch((error) => {
    // check https://firebase.google.com/docs/storage/web/download-files?hl=fr
    // and https://firebase.google.com/docs/storage/web/handle-errors
    console.log(`STORAGE ERROR ${error}`)
  })
```
