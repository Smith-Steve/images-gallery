import os
import requests
from flask import Flask, request
from dotenv import load_dotenv
from flask_cors import CORS


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


if __name__ == "__main__":
  application.run(host="0.0.0.0", port=5050)