from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String(50))
    instagram = db.Column(db.String(50))
    is_admin = db.Column(db.Boolean, nullable=False)


class CarType(db.Model):
    __tablename__ = "car_types"
    id = db.Column(db.Integer, primary_key=True)
    car_type = db.Column(db.String(50), nullable=False)


class Service(db.Model):
    __tablename__ = "services"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Float(2), nullable=False)
    image_url = db.Column(db.String, nullable=False)
    car_type = db.Column(db.Integer, db.ForeignKey(
        "car_types.id"), nullable=False)
    duration = db.Column(db.Integer, nullable=False)


class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    total_price = db.Column(db.Float(2), nullable=False)
    times = db.Column(db.String(50), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey(
        "services.id"), nullable=False)
    car = db.Column(db.String(50), nullable=False)


class Review(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey(
        "services.id"), nullable=False)
    image_url = db.Column(db.String, nullable=False)
