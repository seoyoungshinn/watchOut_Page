from flask import Flask,render_template
from flask import redirect
app = Flask(__name__)

@app.route('/map')
def hello_world():
    return redirect('map.html')
    
@app.route('/')
def welcome():
    return render_template('login.html')

@app.route('/drawMarker')
def hello_world2():
    return render_template('drawMarker.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0", post="5000")

