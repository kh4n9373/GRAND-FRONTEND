from flask import Flask, request, render_template
from flask_socketio import SocketIO

app = Flask(__name__)
# app.config["REDIS_URL"] = "redis://127.0.0.1:6379"
# app.register_blueprint(sse, url_prefix='/stream')


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/create-account')
def create_account_page():
    return render_template('login.html')


@app.route('/calendar')
def render_calendar():
    username = request.args.get('username', 'Guest')
    # userID = mongo_client.find_one(collection_name='users',filter={'UserName':username})['userID']
    userID = ""
    return render_template('main.html', username=username,userID=userID)
    # return render_template('main.html')


@app.route('/week_view')
def render_week_view():
    return render_template('week_view.html')

@app.route('/month_view')
def render_month_view():
    return render_template('month_view.html')
if __name__ == '__main__':
    app.run(debug=True,port='5001',host='0.0.0.0')
    # socketio.run(app, host='0.0.0.0', port=5001, debug=True)
    
    # asking = "hi"
    # print(chatbot_response(asking,"109356546733291536481"))
