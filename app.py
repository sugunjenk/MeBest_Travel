import os
from os import environ
from os.path import join, dirname
from dotenv import load_dotenv
from pymongo import MongoClient
import jwt
from datetime import datetime, timedelta
import hashlib
from flask import Flask, render_template, jsonify, request, redirect, url_for
from werkzeug.utils import secure_filename


app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/tours')
def tours():
    return render_template('tours.html')


@app.route('/detail_tours')
def detail_tours():
    return render_template('detail.html')


if __name__ == '__main__':
    app.run(debug=True)
