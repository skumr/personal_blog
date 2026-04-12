import sqlite3, logging
from init_db import DB_PATH

logger = logging.getLogger()
logging.basicConfig(level=logging.INFO)

def set_post(title: str, content: str):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            """
                INSERT INTO blog_posts (post_title, post_content)
                VALUES (?, ?);
            """, (title, content)
        )
        conn.commit()
        conn.close()

    except Exception as e:
        return e

def get_last_post():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            """
                SELECT post_title, post_content FROM blog_posts ORDER BY post_id DESC LIMIT 1;
            """
        )
        last_post = cursor.fetchone()
        return last_post[0]

    except Exception as e:
        return e
    
def all_posts():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            """
                SELECT post_title, post_content FROM blog_posts;
            """
        )
        all_posts = cursor.fetchall()
        conn.close()
        return all_posts
    except Exception as e:
        return e



if __name__ == "__main__":
    print(get_last_post())