from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateTimeField
from wtforms.validators import DataRequired, Email, ValidationError
from backend.models import Booking

class BookingForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    email= StringField('email', validators=[DataRequired()])
    number = IntegerField('number', validators=[DataRequired()])
    instagram = StringField('instagram', validators=[DataRequired()])
    car = StringField('car', validators=[DataRequired()])
    times = DateTimeField('times', validators=[DataRequired()])
