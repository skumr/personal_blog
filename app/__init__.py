from flask import Flask
from flask_cors import CORS

from init_db import create_table
from routes import setup

web_app = Flask(__name__)
CORS(
    web_app,
    resources={r"/api/*": {"origins": "*"}},
    allow_headers=["Content-Type"],
    methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"]
)

create_table()
setup(web_app)

if __name__ == "__main__":
    web_app.run(host="0.0.0.0", port=5000, debug=True)
