FROM python:3.12-slim AS builder

WORKDIR .

COPY . .

RUN pip install --no-cache-dir -r requirements.txt && python3 ./app/

EXPOSE 5000 1234

CMD ["python3", "app/__init__.py"]