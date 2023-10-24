from flask import Blueprint,session,request
from flask_login import login_required
from backend.models import Review, db
from backend.forms.reviews_form import ReviewForm



review_routes = Blueprint('reviews', __name__)


@review_routes.route('/get_reviews')
def get_review():
    review = Review.query.all()
    return [each.to_dict() for each in review]



@review_routes.route('/new_review', methods=['POST'])
@login_required
def create_Review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            first_name = form.data['first_name'],
            rating = form.data['rating'],
            description = form.data['description'],
            user_id = form.data['user_id'],
            service_id = form.data['service_id'],
            image_url = form.data['image_url']
        )
        db.session.add(review)
        db.session.commit()

        return review.to_dict()
