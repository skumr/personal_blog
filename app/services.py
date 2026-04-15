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

def update_post(title: str, content: str, post_id: str):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            """
                UPDATE blog_posts 
                SET post_title = ?, post_content = ? 
                WHERE post_id = ?;
            """, (title, content, post_id,)
        )
        conn.commit()
        udpated_count = cursor.rowcount
        conn.close()
        return udpated_count

    except Exception as e:
        return e

def delete_post(post_id):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        cursor.execute(
            """
            DELETE FROM blog_posts WHERE post_id = ?;
            """,
            (post_id,)
        )

        conn.commit()
        deleted_count = cursor.rowcount
        conn.close()
        return deleted_count

    except Exception as e:
        return e

def fetch_last_post():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            """
                SELECT post_id, post_title, post_content, created_date FROM blog_posts ORDER BY post_id DESC LIMIT 1;
            """
        )
        last_post = cursor.fetchall()
        conn.close()
        return last_post
    except Exception as e:
        return e
    
def fetch_all_posts():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            """
                SELECT post_id, post_title, post_content, created_date FROM blog_posts ORDER BY post_id DESC LIMIT 10;
            """
        )
        all_posts = cursor.fetchall()
        conn.close()
        return all_posts
    except Exception as e:
        return e



if __name__ == "__main__":
    pass