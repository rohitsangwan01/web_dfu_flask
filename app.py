from flask import Flask, send_from_directory


app = Flask(__name__, static_url_path='')

@app.route('/')
def send_report():
    return app.send_static_file('web.html')


if __name__ == '__main__':
    app.run(debug=True)