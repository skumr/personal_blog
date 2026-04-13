from flask import Flask, Blueprint, request, render_template, jsonify
from services import set_post, fetch_all_posts, fetch_last_post
import logging

logger = logging.getLogger()
logging.basicConfig(level=logging.INFO)

web_app_bp = Blueprint("webapp_routes", __name__)


def _all_posts_context():
    all_posts = fetch_all_posts()
    return {"all_posts": all_posts if isinstance(all_posts, list) else []}

def _last_post_context():
    last_post = fetch_last_post()
    return {"last_post": last_post if isinstance(last_post, list) else []}


@web_app_bp.route("/", methods=["GET"])
def homepage():
    return render_template('index.html', **_last_post_context())


@web_app_bp.route("/about", methods=["GET"])
def about():
    return render_template('about.html')


@web_app_bp.route("/posts", methods=["GET"])
def posts():
    return render_template('posts.html', **_all_posts_context())


@web_app_bp.route("/create-post", methods=["POST"])
def create_post():
    try:
        title = request.form.get('post-title')
        content = request.form.get('post-content')
        set_post(title, content)
        render_template('posts.html', **_all_posts_context())
        
        return render_template('index.html', **_last_post_context())
    except Exception as e:
        return e
    
@web_app_bp.route("/edit-post", methods=["UPDATE"])
def edit_post():
    try:
        pass
    except Exception as e:
        return e
    
@web_app_bp.route("/delete-post", methods=["DELETE"])
def delete_post():
    try:
        pass
    except Exception as e:
        return e
    

@web_app_bp.route("/get-last-post", methods=["GET"])
def get_last_post():
    try:
        
        return jsonify("OK"), 201
    except Exception as e:
        return e
    

@web_app_bp.route("/get-all-posts", methods=["GET"])
def get_all_posts():
    try:
        return render_template('posts.html', **_all_posts_context())
    except Exception as e:
        return e


def setup(app:Flask):
    app.register_blueprint(web_app_bp, url_prefix="")
