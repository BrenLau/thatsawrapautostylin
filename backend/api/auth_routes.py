from flask import Blueprint, jsonify, session, request
from backend.models import User, db
from backend.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

@auth_routes.route('')
def authenticate():
    """
    Authenticates a user.
    """
    print("*** ", current_user, " ***")
    if current_user.is_authenticated:
        print(current_user.to_dict())
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}

@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    print("*** arrived at login ***")
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    print("*** form ***", request.cookies)
    form['csrf_token'].data = request.cookies['csrf_token']
    print("*** csrf token added ***")
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        print("*** user: ", user.to_dict(), " ***")
        login_user(user)
        print("*** user ***", user.to_dict())
        return user.to_dict()
    print("*** HERE ***")
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    print("*** fetch received ***")
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        user = User(
            name=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            phoneNumber = form.data['phoneNumber'],
            instagram = form.data['instagram'] or None
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}

@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401