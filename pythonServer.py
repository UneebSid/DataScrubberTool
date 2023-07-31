
from flask import Flask, request, jsonify
from flask import jsonify
import firebase_admin 
from firebase_admin import credentials
from firebase_admin import db
import json


app = Flask(__name__)

cred = credentials.Certificate("cred.json")

app2 = firebase_admin.initialize_app(cred, {
    'databaseURL' : 'https://datascrubber-default-rtdb.firebaseio.com/'})

database = db.reference()


@app.route("/")
def hello_world():
    return {"hello": "there",}


with open('patients.json') as f:
    members = json.load(f)

database.set(members)

@app.route("/patient")
def patients():
     return database.get()

if __name__ == '__main__':
    app.run(debug=True)

@app.route("/deletePatient", methods=['POST'])
def deletePatient():
    
    data = request.get_json()
    id = str(data)
    database.child(id).delete()
    return jsonify({'message': 'Record deleted successfully'})

@app.route("/addPatient", methods=['POST'])
def addPatient():
    newPatient = request.get_json()
    patients = database.get()
    patients.append(newPatient)
    database.set(patients)
    return jsonify({'message': 'Record added successfully'})
    
