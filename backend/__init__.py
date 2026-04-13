from flask import Flask
from init_db import create_table
from routes import setup

web_app = Flask(
    "web_app",
    template_folder="app/templates",
    static_folder="app/static",
)

create_table()
setup(web_app)

if __name__ == "__main__":
    web_app.run(debug=True, host='0.0.0.0', port=8000)