
from flask import Flask
from backend.models import db
from flask_migrate import Migrate
from .seeds import seed_commands
import os

app = Flask(__name__)

app.cli.add_command(seed_commands)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///dev.db'
app.config.from_mapping({
    'SQLALCHEMY_DATABASE_URI': os.environ.get('DATABASE_URL'),
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,
})
print("*** HERE ***")
db.init_app(app)
print("*** HERE ***")
Migrate(app, db)
print("*** HERE ***")