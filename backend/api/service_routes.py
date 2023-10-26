from flask import Blueprint, jsonify, session, request
from backend.models import User, db, Service
from backend.forms import LoginForm
# from backend.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

service_routes = Blueprint('services', __name__)


@service_routes.route('')
def getServices():
    services = Service.query.all()

    return {"services": [service.to_dict() for service in services]}
