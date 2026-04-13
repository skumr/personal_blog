from flask import Flask
from flask_cors import CORS

from init_db import create_table
from routes import setup

web_app = Flask(__name__)
CORS(web_app)

create_table()
setup(web_app)

if __name__ == "__main__":
    web_app.run(debug=True)
