from flask import Blueprint, jsonify, session, request
from backend.models import User, db, Service, Booking
from flask_login import current_user

manage_bookings_routes = Blueprint('manage_bookings', __name__)

#GET ALL BOOKINGS
@manage_bookings_routes.route('/')
def get_all_bookings():
    bookings = Booking.query.all()
    return {'bookings' : [booking.to_dict() for booking in bookings]}
