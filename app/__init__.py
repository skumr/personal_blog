from flask import Flask
<<<<<<< HEAD
from init_db import create_table
from routes import setup

web_app = Flask(
    "web_app",
    template_folder="app/templates",
    static_folder="app/static",
)
=======
from flask_cors import CORS

from init_db import create_table
from routes import setup

web_app = Flask(__name__)
CORS(web_app)
>>>>>>> feature/v2

create_table()
setup(web_app)

if __name__ == "__main__":
<<<<<<< HEAD
    web_app.run(debug=True, host='0.0.0.0', port=8000)
=======
    web_app.run(debug=True)
>>>>>>> feature/v2
