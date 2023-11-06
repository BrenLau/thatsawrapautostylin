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
@booking_routes.route('/', methods=['POST'])
def post_booking():
    print('HELLLLLOOOOO')
    print('request in the abckend', request.json)
    if not current_user.is_authenticated:
       print('useerrrrr', current_user)
       return {'unauthorized': 'user is not authorized'}
    form = BookingForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_booking = Booking(
            user_id = current_user.id,
            times = form.data['times'],
            service_id = form.data["service_id"],
            is_approved = False
        )
        print('new booking', new_booking)
        db.session.add(new_booking)
        db.session.commit()
        return new_booking.to_dict()

#DELETE BOOKING BY BOOKING ID
@booking_routes.route('/<int:booking_id>/delete', methods=['DELETE'])
def delete_booking(booking_id):
    if current_user.is_authenticated:
        booking_to_delete = Booking.query.get(booking_id)
        if booking_to_delete.user_id == current_user.id:
            db.session.delete(booking_to_delete)
            db.session.commit()
        return {'booking': 'booking has been deleted'}
