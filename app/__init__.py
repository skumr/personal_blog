from flask import Flask
from init_db import create_table
from routes import setup

web_app = Flask("web_app", template_folder="app/templates")

create_table()
setup(web_app)

if __name__ == "__main__":
    web_app.run(debug=True, port=8000)