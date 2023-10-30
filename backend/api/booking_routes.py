from flask import Blueprint, jsonify, session, request
from backend.models import User, db, Service, Booking
from backend.forms import BookingForm
from flask_login import current_user

booking_routes = Blueprint('booking', __name__)

#GET ALL BOOKINGS
@booking_routes.route('/')
def get_all_bookings():
    bookings = Booking.query.all()
    return {'bookings' : [booking.to_dict() for booking in bookings]}

#GET ALL CURRENT USER BOOKINGS
@booking_routes.route('/current')
def get_logged_users_bookings():
    bookings = Booking.query.filter(Booking.user_id == current_user.id).all()
    return {'bookings': [booking.to_dict() for booking in bookings]}

#POST BOOKING
@booking_routes.route('/<int:booking_id>/<int:user_id>')
def post_booking(booking_id, user_id):
    if current_user.is_authenticated:
        form = BookingForm()
        times = form.data['times']
        booking = Booking(user_id=user_id, times=times)
        db.session.add(booking)
        db.session.commit()
        return booking.to_dict()

#DELETE BOOKING BY BOOKING ID
@booking_routes.route('/<int:booking_id>/delete', methods=['DELETE'])
def delete_booking(booking_id):
    if current_user.is_authenticated:
        booking_to_delete = Booking.query.get(booking_id)
        if booking_to_delete.user_id == current_user.id:
            db.session.delete(booking_to_delete)
            db.session.commit()
        return {'booking': 'booking has been deleted'}
