const cool = require('cool-ascii-faces');
const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const Joi = require('joi');

var app = express();

// CONSTANTS
const VEH = 'vehicles';
const PAS = 'passengers';
const TIME = 3 * 60 * 1000;
const vehicles = ["JANET", "NgfcWZmS", "tNEh59TC", "suFKyeZg", "VMerzMH8", "6tWDkKh6", "ajNnfhJj", "bCxY6mCw", "Cq4NX9eE", "mXfkjrFw", "EMYaM9D8", "nZXB8ZHz", "Tkwu74WC", "TnA763WN", "TaR8XyMe", "5KWpnAJN", "uf5ZrXYw"]

// Use Body Parser for POST request
app
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))


// Connect to MongoDB server
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost/nodemongo';
var MongoClient = require('mongodb').MongoClient,
    format = require('util').format;
var db = MongoClient.connect(mongoUri, (err, dbConn) => db = dbConn);
const PORT = process.env.PORT || 5000;

// Validation for Rides API
const ridesSchema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    lat: Joi.number().required(),
    lng: Joi.number().required()
})

app
    .use(express.static(path.join(__dirname, 'public')))
    // Enable CORS
    .use(cors())
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    // Homepage with Vehicle info
    .get('/', (req, res) => {
        res.set('Content-Type', 'text/html');
        var indexPage = '';
        db.collection(VEH, (err, coll) => {
            if (err) return res.sendStatus(500);
            coll.find().sort({ created_at: -1 }).toArray((err, results) => {
                if (err) return res.sendStatus(500);
                indexPage += "<!DOCTYPE HTML><html><head><title>Vehicle List</title></head><body><h1>Vehicles</h1>";
                for (let i = 0; i < results.length; i++) {
                    let curr = results[i];
                    indexPage += `${curr.username} was looking for passengers at ${curr.lat} ${curr.lng} on ${curr.created_at}</br>`
                }
                indexPage += "</body></html>"
                res.send(indexPage)
            });
        });
    })
    .get('/cool', (req, res) => res.send(cool()))
    // passenger API, given a username query, returns every object
    //  of that username in the database
    .get('/passenger.json', (req, res) => {
        username = req.query.username;
        console.log(username);
        if (username === undefined || username == "" || typeof username === 'object')
            return res.status(400).json([]);

        db.collection(PAS, (err, coll) => {
            if (err) return res.sendStatus(500);
            coll.find({ "username": username }).toArray((err, results) => {
                if (err) return res.send(400).json([]);

                res.status(200).json(results);
            });
        });
    })
    // rides API, provided with a username, a lat, and a lng, based on the
    //  username adds the requester's object to the database and returns the
    //  corresponding list
    .post('/rides', (req, res) => {
        res.header("Access-Control-Allow-Origin", "*");
        body = req.body;
        Joi.validate(body, ridesSchema, (error, value) => {
            if (error) {
                res.status(422).json({
                    error: "Whoops, something is wrong with your data!"
                });
            } else {
                const date = new Date();
                const item = {
                    "username": value.username,
                    "lat": value.lat,
                    "lng": value.lng,
                    "created_at": date
                };
                let collToInsert = "";

                collToInsert = (vehicles.includes(value.username) ? VEH : PAS);
                collToReturn = (vehicles.includes(value.username) ? PAS : VEH);

                db.collection(collToInsert, (err, coll) => {
                    if (err) return res.sendStatus(500);
                    coll.insert(item, (err, saved) => {
                        if (err) return res.sendStatus(500);
                    });
                });

                db.collection(collToReturn, (err, coll) => {
                    if (err) return res.sendStatus(500);
                    coll.find().toArray((err, results) => {
                        if (err) return res.sendStatus(500);
                        const curDate = new Date();
                        const lastThreeMinutes = results.filter(item =>
                            (curDate - new Date(item.created_at)) < TIME);
                        res.status(200).json({
                            [collToReturn]: lastThreeMinutes
                        });
                    });
                });
            }
        });
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))