import sqlite3, logging
from init_db import DB_PATH

def set_post(title: str, content: str):
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            """
                UPDATE blog_posts 
                SET created_date = CURRENT_TIMESTAMP, post_title = ?, post_content = ?;
            """, (title, content)
        )
        conn.commit()
        conn.close()

    except sqlite3.OperationalError as e:
        return e
    
def get_last_post():
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        cursor.execute(
            """
                SELECT post_title, post_content FROM blog_posts ORDER BY post_id DESC LIMIT 1;"
            """
        )
        last_post = cursor.fetchone()
        return last_post[0] if last_post else "No data found"

    except sqlite3.OperationalError as e:
        return e