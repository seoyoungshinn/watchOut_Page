from urllib import request
from flask import Flask,render_template
from flask import redirect
app = Flask(__name__)
    
@app.route('/')
def welcome():
    return render_template('innerpages/login.html')

@app.route('/menupage')
def menupage():
    return render_template('menuPage.html')    

@app.route('/teamInfo')
def teamInfo():
    return render_template('teamInfo.html')

@app.route('/appInfo')
def appInfo():
    return render_template('appInfo.html')

@app.route('/webInfo')
def webInfo():
    return render_template('webInfo.html')

@app.route('/watchnow')
def watchnow():
    return render_template('watchnow.html')

@app.route('/watchinfo')
def watchinfo():
    return render_template('innerpages/watchinfo.html')

@app.route('/watchfour')
def watchfour():
    return render_template('innerpages/watchfour.html')

@app.route('/history')
def history():
    return render_template('history.html')

@app.route('/history/assess')
def assess():
    return render_template('innerpages/historyassess.html')

@app.route('/historyinfo')
def historyinfo():
    return render_template('innerpages/historyinfo.html')

@app.route('/simulation')
def simulation():
    return render_template('simulation.html')

@app.route('/analysis')
def analysis():
    return render_template('analysis.html')

@app.route('/favorites')
def favorites():
    return render_template('favorites.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/innerpages/settingshelp')
def settingshelp():
    return render_template('settings.html')

    
if __name__ == '__main__':
    app.run(host="0.0.0.0", post="5000")

