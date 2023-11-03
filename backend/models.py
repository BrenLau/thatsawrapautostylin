from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(50), nullable=False)
    hashed_password = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String(50))
    instagram = db.Column(db.String(50))
    is_admin = db.Column(db.Boolean, nullable=False, default=False)

    reviews = db.relationship("Review", back_populates="user")
    bookings = db.relationship("Booking", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone_number": self.phone_number,
            "instagram": self.instagram,
            "is_admin": self.is_admin
        }


class CarType(db.Model):
    __tablename__ = "car_types"
    id = db.Column(db.Integer, primary_key=True)
    car_type = db.Column(db.String(50), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "car_type": self.car_type
        }


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

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "price": self.price,
            "image_url": self.image_url,
            "car_type": self.car_type,
            "duration": self.duration

        }


class Booking(db.Model):
    __tablename__ = "bookings"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    total_price = db.Column(db.Float(2), nullable=False)
    times = db.Column(db.String(50), nullable=False)
    service_id = db.Column(db.Integer, db.ForeignKey(
        "services.id"), nullable=False)
    car = db.Column(db.String(50), nullable=False)
    is_approved = db.Column(db.Boolean, default=False, nullable=False)
    user = db.relationship("User", back_populates="bookings")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "total_price": self.total_price,
            "times": self.times,
            "service_id": self.service_id,
            "car": self.car,
            "user": self.user
        }


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
    user = db.relationship("User", back_populates="reviews")

    def to_dict(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "rating": self.rating,
            "description": self.description,
            "user_id": self.user_id,
            "service_id": self.service_id,
            "image_url": self.image_url,
            "user": self.user
        }
