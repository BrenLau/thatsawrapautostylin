from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Email, EqualTo
# from backend.models import Service


class CreateServiceForm(FlaskForm):
    title = StringField('title', validators=[
        DataRequired(), Length(1, 50)])
    description = StringField('description', validators=[
                              DataRequired(), Length(1, 250)])
    price = IntegerField('price')
    image_url = StringField('image_url')
    car_type = IntegerField('car_type')
    duration = IntegerField('duration')
