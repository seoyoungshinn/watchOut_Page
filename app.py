from urllib import request
from flask import Flask,render_template
from flask import redirect
app = Flask(__name__)
    
@app.route('/')
def welcome():
    return render_template('ff/login.html')

@app.route('/watchnow')
def watchnow():
    return render_template('watchnow.html')

@app.route('/history')
def history():
    return render_template('history.html')

@app.route('/analysis')
def analysis():
    return render_template('analysis.html')

@app.route('/bootmap')
def boot():
    return render_template('ex/bootmap.html')

@app.route('/favorites')
def favorites():
    return render_template('favorites.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/feedback')
def feedback():
    return render_template('ff/feedback.html')

@app.route('/preference')
def preference():
    return render_template('ff/preference.html')

@app.route('/simulation')
def simulation():
    return render_template('simulation.html')

@app.route('/json')
def json():
    return render_template('ex/json.html')

@app.route('/exhistory')
def exhistory():
    return render_template('ex/exhistory.html')

@app.route('/routeinfo')
def routeinfo():
    return render_template('ff/routeinfo.html')
    
if __name__ == '__main__':
    app.run(host="0.0.0.0", post="5000")

