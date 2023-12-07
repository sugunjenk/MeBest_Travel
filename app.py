from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('header_footer.html')

@app.route('/tours_page')
def tours():
    return render_template('tours.html')

if __name__ == '__main__':
    app.run(debug=True)
