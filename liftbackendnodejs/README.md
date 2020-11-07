# Assignment 3 and Lab 7
Ahmet Armanc Keser

## Modifications

## Assignment 3

### Assessment

- [x] The POST /rides API as specified above
    - [x] Accepts a submission that has a username, lat, and lng
    - [x] If a submission is missing any one of the required fields, return error
    - [x] Returns all the passengers from the last three minutes when a vehicle is entered
    - [x] Returns all the vehicles from the last three minutes when a passenger is entered
- [x] The GET /passenger.json API as specified above
    - [x] Returns a list of all records for a given username
    - [x] Returns [] if no username is provided, username is not found, or is empty
- [x] The index / as specified above
    - [x] Returns HTML with vehicles in descending order
- [x] Assignment 2 in the master branch on GitHub is connected to your Assignment 3 and not to https://hans-moleman.herokuapp.com/.


### Implementation
I have implemented everything correctly

### Collabration
I have not collabrated with anyone

### Time Spent
10 Hours

## Lab 7

### Implementation
I have implemented everything correctly

### Collabration
I have not collabrated with anyone

### Time Spent
2 Hours (took me much more than expected to get the CORS headers working)

This application supports the [Getting Started with Node on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs) article - check it out.

## Running Locally

Make sure you have [Node.js](http://nodejs.org/) and the [Heroku CLI](https://cli.heroku.com/) installed.

```sh
$ git clone https://github.com/heroku/node-js-getting-started.git # or clone your own fork
$ cd node-js-getting-started
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ heroku create
$ git push heroku master
$ heroku open
```
or

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Documentation

For more information about using Node.js on Heroku, see these Dev Center articles:

- [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
- [Using WebSockets on Heroku with Node.js](https://devcenter.heroku.com/articles/node-websockets)
