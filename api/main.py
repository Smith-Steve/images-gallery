import os
import requests
from flask import Flask, request, jsonify
from dotenv import load_dotenv
from flask_cors import CORS
from mongo_client import mongo_client


gallery = mongo_client.gallery
images_collection = gallery.images

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = 'https://api.unsplash.com/photos/random'
UNSPLASH_KEY = os.environ.get("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
  #in python empty string is falsey.
  raise EnvironmentError("Please create .env.local file in API directory and insert unsplash API key.")


application = Flask(__name__)
CORS(application)
#in python, constants are uppercase.
application.config["DEBUG"] = DEBUG


@application.route("/new-image")
def new_image():
  #python convention uses underscores.
  word = request.args.get("query")

  headers = {
    "Accept-Version": "v1",
    "Authorization": "Client-ID " + UNSPLASH_KEY,
  }
  parameters = {
    "query": word
  }
  response = requests.get(url=UNSPLASH_URL, headers=headers, params=parameters)
  data = response.json()
  return data

@application.route("/images", methods=["GET", "POST"])
def images():
  if request.method == "GET":
    #read images from db.
    images = images_collection.find({})
    return jsonify([img for img in images])
  if request.method == "POST":
    #saave image to db.
    image = request.get_json()
    image["_id"] = image.get("id")
    result = images_collection.insert_one(image)
    inserted_id = result.inserted_id
    return {"inserted_id": inserted_id}


if __name__ == "__main__":
  application.run(host="0.0.0.0", port=5050)