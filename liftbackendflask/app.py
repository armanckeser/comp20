from flask import Flask, Response, request, jsonify
from flask_cors import CORS, cross_origin
from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField
from wtforms.validators import DataRequired
from datetime import datetime, timedelta
from bson.json_util import dumps
from flask_pymongo import PyMongo
import re
import logging

app = Flask(__name__)
app.config["MONGO_URI"]= ""

mongo = PyMongo(app)

CORS(app, resources={r"/rides": {"origins": "*"}})

permittedVehicles = ["JANET", "NgfcWZmS", "tNEh59TC", "suFKyeZg", "VMerzMH8", "6tWDkKh6", "ajNnfhJj", "bCxY6mCw", "Cq4NX9eE", "mXfkjrFw", "EMYaM9D8", "nZXB8ZHz", "Tkwu74WC", "TnA763WN", "TaR8XyMe", "5KWpnAJN", "uf5ZrXYw"]

class RidesForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    lat      = DecimalField('lat', validators=[DataRequired()])
    lng      = DecimalField('lng', validators=[DataRequired()])

@app.errorhandler(400)
def wrong_data(error = None):
    message = {
        'error'  : 'Whoops! Something is wrong with your data.' 
    }
    return jsonify(message)

@app.errorhandler(500)
def internal(error = None):
    return "No Data in the Database"

@app.route('/', methods=['GET'])
def index():
    indexPage = ''
    response = app.response_class (
            status   = 200,
            mimetype = 'text/html'
        )
    indexPage += "<!DOCTYPE HTML><html><head><title>Vehicle List</title></head><body><h1>Vehicles</h1>"
    vehicles = mongo.db.vehicles.find().sort("created_at", -1)
    
    for vehicle in vehicles:
        indexPage += vehicle['username'] + " was looking for passengers at " + str(vehicle['lat']) + " " + str(vehicle['lng']) + " at " + str(vehicle['created_at']) + "</br>"
    
    indexPage += "</body></html>"
    response.data = indexPage
    return response

@app.route('/passenger.json', methods=['GET'])
def passenger():
    if 'username' not in request.args:
        return "[]"
    
    passengers = mongo.db.passengers
    username =  request.args['username']
    pas = passengers.find({'username' : username })
    response = app.response_class (
            response = '[]',
            status   = 200,
            mimetype = 'application/json'
        )
    if (pas):
        response.data = dumps(pas)
    
    return response
    

@app.route('/rides', methods=['POST'])
def rides():
    form = RidesForm(request.form, csrf_enabled=False)

    if not form.validate():
        return wrong_data()

    username = re.sub('\W+','', request.form['username'])
    toInsert = {
        "username"   : username,
        "lat"        : float(request.form['lat']),
        "lng"        : float(request.form['lng']),
        "created_at" : datetime.now()
    }
    
    d = datetime.now() + timedelta(minutes = -3)

    if username in permittedVehicles:
        mongo.db.vehicles.insert_one(toInsert)
        toReturn = mongo.db.passengers.find({"created_at" : { "$gt" : d}})
    else:
        mongo.db.passengers.insert_one(toInsert)
        toReturn = mongo.db.vehicles.find({"created_at" : { "$gt" : d}})

    beingReturned = 'passengers' if username in permittedVehicles else 'vehicles'

    return Response(
        dumps({ beingReturned : toReturn}),
        mimetype = 'application/json'
    )
