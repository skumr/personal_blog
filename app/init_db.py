import sqlite3
import logging
from pathlib import Path

logger = logging.getLogger()
logging.basicConfig(level=logging.INFO)

DB_PATH = str(Path(__file__).resolve().parent / "blog_posts.db")

CREATE_TABLE = """
CREATE TABLE IF NOT EXISTS blog_posts (
    post_id         INTEGER PRIMARY KEY AUTOINCREMENT,
    post_title    TEXT    NOT NULL,
    post_content  TEXT    NOT NULL,
    created_date   DATETIME DEFAULT CURRENT_TIMESTAMP,
    modified_date  DATETIME DEFAULT CURRENT_TIMESTAMP
);
"""

def create_table():
    logger.info("Connecting to DB...")
    
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        logger.info("Connection successfull, creating table...")
        cursor.execute(CREATE_TABLE)
        conn.commit()
        conn.close()
        logger.info("Table created.")
    except sqlite3.OperationalError as e:
        logger.error(f"Error with Sqlite3 DB Connection: {e}")

if __name__ == "__main__":
    create_table()