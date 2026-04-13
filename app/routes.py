<<<<<<< HEAD
from flask import Flask, Blueprint, request, render_template, jsonify
=======
from flask import Flask, Blueprint, request, jsonify
>>>>>>> feature/v2
from services import set_post, fetch_all_posts, fetch_last_post
import logging

logger = logging.getLogger()
logging.basicConfig(level=logging.INFO)

web_app_bp = Blueprint("webapp_routes", __name__)


<<<<<<< HEAD
def _all_posts_context():
    all_posts = fetch_all_posts()
    return {"all_posts": all_posts if isinstance(all_posts, list) else []}

def _last_post_context():
    last_post = fetch_last_post()
    return {"last_post": last_post if isinstance(last_post, list) else []}
=======
def _post_row_to_dict(row):
    if not row:
        return None
    return {
        "post_id": row[0],
        "post_title": row[1],
        "post_content": row[2],
        "created_date": row[3],
    }


def _last_post_payload():
    last = fetch_last_post()
    if not isinstance(last, list) or len(last) == 0:
        return None
    return _post_row_to_dict(last[0])


def _all_posts_payload():
    rows = fetch_all_posts()
    if not isinstance(rows, list):
        return []
    return [_post_row_to_dict(r) for r in rows if r is not None]
>>>>>>> feature/v2


@web_app_bp.route("/", methods=["GET"])
def homepage():
<<<<<<< HEAD
    return render_template('index.html', **_last_post_context())


@web_app_bp.route("/about", methods=["GET"])
def about():
    return render_template('about.html')
=======
    return jsonify({"last_post": _last_post_payload()})
>>>>>>> feature/v2


@web_app_bp.route("/posts", methods=["GET"])
def posts():
<<<<<<< HEAD
    return render_template('posts.html', **_all_posts_context())
=======
    return jsonify({"all_posts": _all_posts_payload()})
>>>>>>> feature/v2


@web_app_bp.route("/create-post", methods=["POST"])
def create_post():
    try:
<<<<<<< HEAD
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
    
=======
        data = request.get_json(silent=True) or {}
        title = data.get("post_title") or data.get("title")
        content = data.get("post_content") or data.get("content")
       
        if not title or not content:
            return jsonify({"error": "post_title and post_content are required"}), 400
        set_post(title, content)
        return jsonify({"last_post": _last_post_payload()}), 201
    except Exception as e:
        logger.exception("create_post failed")
        return jsonify({"error": str(e)}), 500


@web_app_bp.route("/edit-post", methods=["UPDATE"])
def edit_post():
    try:
        return jsonify({"error": "not implemented"}), 501
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@web_app_bp.route("/delete-post", methods=["DELETE"])
def delete_post():
    try:
        return jsonify({"error": "not implemented"}), 501
    except Exception as e:
        return jsonify({"error": str(e)}), 500

>>>>>>> feature/v2

@web_app_bp.route("/get-last-post", methods=["GET"])
def get_last_post():
    try:
<<<<<<< HEAD
        
        return jsonify("OK"), 201
    except Exception as e:
        return e
    
=======
        return jsonify({"last_post": _last_post_payload()}), 200
    except Exception as e:
        logger.exception("get_last_post failed")
        return jsonify({"error": str(e)}), 500

>>>>>>> feature/v2

@web_app_bp.route("/get-all-posts", methods=["GET"])
def get_all_posts():
    try:
<<<<<<< HEAD
        return render_template('posts.html', **_all_posts_context())
    except Exception as e:
        return e


def setup(app:Flask):
    app.register_blueprint(web_app_bp, url_prefix="")
=======
        return jsonify({"all_posts": _all_posts_payload()}), 200
    except Exception as e:
        logger.exception("get_all_posts failed")
        return jsonify({"error": str(e)}), 500


def setup(app: Flask):
    app.register_blueprint(web_app_bp, url_prefix="/api")
>>>>>>> feature/v2
