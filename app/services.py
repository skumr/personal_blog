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

    except sqlite3.OperationalError as e:
        return e