FROM python:3.12-slim AS builder

WORKDIR /app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt && python3 app/init_db.py

EXPOSE 8000

CMD ["python3", "app/__init__.py"]