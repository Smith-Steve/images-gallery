FROM python:latest
WORKDIR /app

COPY Pipfile Pipfile.lock ./

RUN pip install pipenv
RUN pipenv requirements > requirements.txt
RUN pip install -r requirements.txt

EXPOSE 5050

COPY . ./

CMD [ "python", "main.py" ]
