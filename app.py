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

client = MongoClient(
    "mongodb+srv://admin:admin123@mebesttravel.75vrujy.mongodb.net/?retryWrites=true&w=majority")

db = client.mebest

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/tours')
def tours():
    return render_template('tours.html')


@app.route('/documentation')
def documentation():
    return render_template('documentation.html')


@app.route('/cek_pesanan')
def cek_pesanan():
    return render_template('cekPesanan.html')


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
    pass

# Todo: belum selesai


@app.route('/register', methods=['POST'])
def register():
    nickname_receive = request.form['nickname_give']
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']

    password_hash = hashlib.sha256(
        (password_receive).encode('utf-8')).hexdigest()
    print(password_hash)

    doc = {
        'nickname': nickname_receive,
        'username': username_receive,
        'password': password_receive,
        'role': 2
    }

    db.users.insert_one(doc)

    return jsonify({'result': 'success'})


# end autentikasi


@app.route('/detail_tours')
def detail_tours():
    return render_template('detail.html')


if __name__ == '__main__':
    app.run(debug=True)
