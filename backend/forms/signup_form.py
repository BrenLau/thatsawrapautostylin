from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError, Length, Optional
from backend.models import User


def email_exists(form, field):
    # Checking if email is in use
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


# def username_exists(form, field):
#     # Checking if username is already in use
#     username = field.data
#     user = User.query.filter(User.username == username).first()
#     if user:
#         raise ValidationError('Username is already in use.')

def phoneNumber_exists(form, field):
    phoneNumber = field.data
    user = User.query.filter(User.phone_number == phoneNumber).first()
    if user:
        raise ValidationError('Phone number is already in use.')
    
def instagram_exists(form, field):
    instagram = field.data
    user = User.query.filter(User.instagram == instagram).first()

    if user:
        raise ValidationError("Instagram is already in use.")

class SignUpForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), Email(), email_exists])
    password = StringField('password', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired()])
    phone_number = StringField('phone number', validators=[DataRequired(), Length(max=10, min=10), phoneNumber_exists]) 
    instagram = StringField("instagram", validators=[Optional(), instagram_exists])
    
    