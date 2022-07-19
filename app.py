from flask import Flask,render_template
app = Flask(__name__)

@app.route('/')
def hello_world():
    return render_template('map.html')

@app.route('/drawMarker')
def hello_world2():
    return render_template('drawMarker.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0", post="5000")

