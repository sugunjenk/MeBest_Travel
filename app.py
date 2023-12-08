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

@app.route('/about')
def about():
    return render_template('about.html')

# authentikasi


@app.route("/to_register", methods=['GET'])
def to_register():
    return render_template('register.html')


@app.route("/to_login", methods=['GET'])
def to_login():
    return render_template('login.html')


@app.route('/login', methods=['POST'])
def login():
    username_receive = request.form['username']
    password_receive = request.form['password']
    print(username_receive, password_receive)
    return jsonify(
        {
            'result': 'success',
            'username': username_receive,
            'Passsword': password_receive
        }
    )

# end autentikasi


@app.route('/detail_tours')
def detail_tours():
    return render_template('detail.html')


if __name__ == '__main__':
    app.run(debug=True)
