FROM python:3.10-slim

WORKDIR /backend

COPY . /backend

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 5000

ENV FLASK_APP=app.py
# ENV PYTHONPATH=/app 

CMD ["flask", "run", "--host=0.0.0.0"]
