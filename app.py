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
from flask import request, redirect, url_for

client = MongoClient(
    "mongodb+srv://admin:admin123@mebesttravel.75vrujy.mongodb.net/?retryWrites=true&w=majority")

db = client.mebest

SECRET_KEY = 'Mebest'

TOKEN_KEY = 'token_mebest'

app = Flask(__name__)


@app.route('/')
def index():
    token_receive = request.cookies.get(TOKEN_KEY)
    try:
        pass

    except jwt.ExpiredSignatureError:
        return redirect(url_for('to_login', msg="Silahkan Login Kembali"))
    except jwt.exceptions.DecodeError:
        return redirect(url_for('to_login', msg="Ada masalah saat kamu login"))


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
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']
    password_hash = hashlib.sha256(
        (password_receive).encode('utf-8')).hexdigest()
    print(username_receive, password_hash)
    result = db.users.find_one({
        'username': username_receive,
        'password': password_hash
    })
    if (result):
        payload = {
            'id': result['nickname'],
            'role': result['role'],
            'exp': datetime.utcnow() + timedelta(seconds=60*60)
        }
        print(payload['exp'])
        token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        return jsonify({
            'result': 'success',
            'token': token,
            'token_key': TOKEN_KEY,
        })
    else:
        return jsonify({
            'result': 'failed',
            'msg': 'username dan password tidak ditemukan di database'
        })


@app.route('/register', methods=['POST'])
def register():
    nickname_receive = request.form['nickname_give']
    username_receive = request.form['username_give']
    password_receive = request.form['password_give']
    print(nickname_receive)

    password_hash = hashlib.sha256(
        (password_receive).encode('utf-8')).hexdigest()
    cek_data_nama = db.users.find_one({'nickname': nickname_receive})
    cek_nama = bool(cek_data_nama)
    print(cek_nama)
    if (cek_nama == True):
        return jsonify({
            'result': 'failed_name',
            'msg': 'Nickname already exists!, please try input again'
        })

    doc = {
        'nickname': nickname_receive,
        'username': username_receive,
        'password': password_hash,
        'role': 2
    }

    db.users.insert_one(doc)

    return jsonify({
        'result': 'success',
        'msg': 'Successfully registered!'
    })

# end autentikasi


@app.route('/detail_tours')
def detail_tours():
    return render_template('detail.html')


UPLOAD_FOLDER = 'static'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Fungsi untuk memeriksa apakah ekstensi file diizinkan
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/add_tour', methods=['POST'])
def add_tour():
    if request.method == 'POST':
        tour_title = request.form['tourTitle']
        tour_description = request.form['tourDescription']
        tour_price = float(request.form['tourPrice'])  
        # Menangani pengunggahan file
        if 'tourImage' not in request.files:
            return jsonify({'result': 'failed', 'msg': 'Tidak ada bagian file'})

        file = request.files['tourImage']

        if file.filename == '':
            return jsonify({'result': 'failed', 'msg': 'Tidak ada file yang dipilih'})

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)

            # Memasukkan data ke dalam database
            db.tours.insert_one({
                'title': tour_title,
                'description': tour_description,
                'price': tour_price,
                'image_path': file_path  
            })

            return jsonify({'result': 'success', 'msg': 'Tour berhasil ditambahkan'})

    return jsonify({'result': 'failed', 'msg': 'Permintaan tidak valid'})



if __name__ == '__main__':
    app.run(debug=True)
