from flask import Blueprint, jsonify, session, request
from backend.models import User, db, CarType
from backend.forms import LoginForm
# from backend.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

car_type_routes = Blueprint('car_types', __name__)


@car_type_routes.route('')
def getServices():
    cars = CarType.query.all()

    return {"cars": [car.to_dict() for car in cars]}
