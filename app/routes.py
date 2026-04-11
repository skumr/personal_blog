from flask import Flask, Blueprint, render_template

web_app_bp = Blueprint("webapp_routes", __name__)

@web_app_bp.route("/", methods=["GET"])
def homepage():
    return render_template('index.html')

def setup(app:Flask):
    app.register_blueprint(web_app_bp, url_prefix="")
