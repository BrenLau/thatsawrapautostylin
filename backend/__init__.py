
from flask import Flask
from flask_cors import CORS
from backend.models import db, User
from flask_migrate import Migrate
from flask_wtf.csrf import generate_csrf
from flask_login import LoginManager
from backend.seeds import seed_commands
from backend.api.auth_routes import auth_routes
from backend.api.reviews_route import review_routes
import os

app = Flask(__name__)

login = LoginManager(app)
login.login_view = 'auth.unauthorized'

@login.user_loader
def load_user(id):
    return User.query.get(int(id))

app.cli.add_command(seed_commands)

app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(review_routes, url_prefix='/api/reviews')


# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dev.db'
app.config.from_mapping({
    'SQLALCHEMY_DATABASE_URI': os.environ.get('DATABASE_URL'),
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,
    "SQLALCHEMY_ECHO": True,
    "SECRET_KEY": os.environ.get('SECRET_KEY')
})

db.init_app(app)

Migrate(app, db)

CORS(app)

@app.after_request
def inject_csrf_token(response):
    print("*** injecting token ***")
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') == 'production' else False,
        samesite='Strict' if os.environ.get(
            'FLASK_ENV') == 'production' else None,
        httponly=True)
    return response

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    """
    This route will direct to the public directory in our
    react builds in the production environment for favicon
    or index.html requests
    """
    if path == 'favicon.ico':
        return app.send_from_directory('public', 'favicon.ico')
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')
