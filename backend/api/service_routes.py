from flask import Blueprint, jsonify, session, request
from backend.models import User, db, Service
from backend.forms import LoginForm
# from backend.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required
from ..forms.service_form import CreateServiceForm
service_routes = Blueprint('services', __name__)


@service_routes.route('')
def getServices():
    services = Service.query.all()

    return {"services": [service.to_dict() for service in services]}


# @login_required
@service_routes.route('/', methods=['POST'])
def addServices():
    form = CreateServiceForm()
    service = Service(
        title=form.data['title'],
        description=form.data['description'],
        image_url=form.data['image_url'],
        car_type=form.data['car_type'],
        duration=form.data['duration'],
        price=form.data['price']
    )

    db.session.add(service)
    db.session.commit()

    return service.to_dict()


@service_routes.route('/<int:serviceId>', methods=['DELETE'])
def deleteService(serviceId):
    service = Service.query.get(serviceId)
    db.session.delete(service)
    db.session.commit()
    return service.to_dict()


@service_routes.route('/<int:serviceId>', methods=['PUT'])
def editService(serviceId):
    data = request.json
    service = Service.query.get(serviceId)
    print(data)
    service.title = data['title']
    service.description = data['description']
    service.price = data['price']
    service.image_url = data['image_url']
    service.car_type = data['car_type']
    service.duration = data['duration']
    db.session.commit()
    return service.to_dict()
