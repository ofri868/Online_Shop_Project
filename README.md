
# Ecommerce store - Ofri Gal

My ecommerce store project is a full-stack web application that was built using Django, DRF, React with TypeScript, Redux, PostgreSQL, and Docker. 
Project was created for 'John Bryce' 

## LINK
site is live at https://dreamy-pony-b11c89.netlify.app/


## Key Features
* Built with Django, DRF, React with TypeScript, Redux, PostgreSQL, and Docker.
* Profile image updating that automatically updates images based on user feedback and preference.
* Seamless login and logout experience,  including the ability to create an account and add products to a cart.
* Secure and straightforward checkout process that allows users to complete transactions with ease Through PayPal.
* Built using Docker containerization technology, making it easy to deploy and run the application in various environments.
* Fake ecommerce store that is designed for coursework at John Bryce.
Provides an excellent user experience that is both intuitive and secure.

## Superuser:
username: ofri
password: 123

## Testuser:
username: test
password: 123

## Seed DB:
* py ./manage.py > dumpdata db.json
* py ./manage.py loaddata db.json


## Setup

First, change the DB.

If you have not installed Python3, [please do](https://www.python.org/downloads/).

First create and activate some form of environment to store your dependencies
install virtualenvs:
```
$ pip install virtualenv
$ python -m virtualenv myenv
$ myenv\Scripts\activate
```

then, install the requierments 
```
`$ pip install -r requirements.txt`
```
DB under instance folder should come with data.
to add data  run
```
$ py ./manage.py loaddata db.json

```

### Run the app

`$ py ./manage.py runserver`

You should now be able to see the output in your browser window (at http://127.0.0.1:8000) 





## Setup-frontend
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) TS template.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

