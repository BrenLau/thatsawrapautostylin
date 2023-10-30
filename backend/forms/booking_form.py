from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from backend.models import Booking

class BookingForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    