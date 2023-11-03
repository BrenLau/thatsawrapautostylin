from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, DateField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    first_name = StringField('first_name', validators=[DataRequired()])
    rating = DecimalField('rating', DataRequired())
    description = StringField('description', DataRequired())
    user_id = IntegerField('user_id')
    service_id = IntegerField('service_id')
    image_url = StringField('image_url')
