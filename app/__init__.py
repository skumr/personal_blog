from flask import Flask
from routes import setup

web_app = Flask("web_app")

setup(web_app)

if __name__ == "__main__":
    web_app.run(debug=True, port=8000)