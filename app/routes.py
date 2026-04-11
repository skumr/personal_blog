from flask import Flask, Blueprint, jsonify

web_app_bp = Blueprint("webapp_routes", __name__)

@web_app_bp.route("/", methods=["GET"])
def root():
    return jsonify("API is now working")

def setup(app:Flask):
    app.register_blueprint(web_app_bp, url_prefix="")
