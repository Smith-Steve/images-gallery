FROM python:latest
WORKDIR /app
EXPOSE 5050

COPY Pipfile ./
COPY Pipfile.lock ./

RUN pip install pipenv
RUN pipenv lock --requirements > requirements.txt
RUN pipenv install -r requirements.txt

COPY . ./

CMD [ "python", "main.py" ]
