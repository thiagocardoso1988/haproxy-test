import os
from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    servername = os.environ['SERVER_NAME']
    return 'Hello World! Running from {}.\n'.format(servername)
