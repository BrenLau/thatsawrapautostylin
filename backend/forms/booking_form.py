from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField, SubmitField
from wtforms.validators import DataRequired, ValidationError
from backend.models import Booking
import datetime

def date_and_time_is_taken(form, field):
    times = field.data
    #Booking.query.filter(Booking.is_approved )
    booking = Booking.query.filter(Booking.times == times).first()
    if booking:
        raise ValidationError('Booking date and time is taken')

def date_in_future(form, field):
    times = field.data
    if times < datetime.now().date():
            raise ValidationError('Date cannot be in the past')

class BookingForm(FlaskForm):
    # name = StringField('name', validators=[DataRequired()])
    # email= StringField('email', validators=[DataRequired()])
    # number = IntegerField('number', validators=[DataRequired()])
    # instagram = StringField('instagram')
    user_id = IntegerField('user_id')
    car = StringField('car')
    times = StringField('times', validators=[DataRequired()])
    service = IntegerField('service')
    # referral = StringField('referral code')
    submit = SubmitField('submit')
