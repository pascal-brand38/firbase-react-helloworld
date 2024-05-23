Firebase + React + Vite Step by Step
====================================

This is a step-by-step application using
* [Firebase](https://firebase.google.com/) as the hosting: database,...
* [React](https://react.dev/) for the web application library
* [Vite](https://vitejs.dev/) to setup the application


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




[Firebase](https://firebase.google.com/)
----------------------------------------

### Firebase create and deployment

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
