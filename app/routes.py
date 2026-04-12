from flask import Flask, Blueprint, request, render_template, jsonify
from services import set_post

web_app_bp = Blueprint("webapp_routes", __name__)


@web_app_bp.route("/", methods=["GET"])
def homepage():
    return render_template('index.html')

@web_app_bp.route("/about", methods=["GET"])
def about():
    return render_template('about.html')

@web_app_bp.route("/posts", methods=["GET"])
def posts():
    return render_template('posts.html')

@web_app_bp.route("/create-post", methods=["POST"])
def create_post():
    try:
        title = request.form.get('post-title')
        content = request.form.get('post-content')
        set_post(title, content)
        

        return render_template('posts.html')
    except Exception as e:
        return e
    
@web_app_bp.route("/get-last-post", methods=["GET"])
def get_last_post():
    try:
        
        return jsonify("OK"), 201
    except Exception as e:
        return e
    


def setup(app:Flask):
    app.register_blueprint(web_app_bp, url_prefix="")
