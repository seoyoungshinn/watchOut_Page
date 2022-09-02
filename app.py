from urllib import request
from flask import Flask,render_template
from flask import redirect
app = Flask(__name__)
    
@app.route('/')
def welcome():
    return render_template('login.html')

@app.route('/bootmap')
def boot():
    return render_template('bootmap.html')

@app.route('/history')
def history():
    return render_template('history.html')

@app.route('/feedback')
def feedback():
    return render_template('feedback.html')

@app.route('/preference')
def preference():
    return render_template('preference.html')

@app.route('/simulation')
def simulation():
    return render_template('simulation.html')

@app.route('/json')
def json():
    return render_template('json.html')
    
if __name__ == '__main__':
    app.run(host="0.0.0.0", post="5000")

