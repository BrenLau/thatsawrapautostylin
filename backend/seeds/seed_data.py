from backend.models import db,User, CarType, environment, SCHEMA
from sqlalchemy.sql import text



def seed_data():
    admin = User(
        email='thatsawrapautostylin@gmail.com', name='Admin', password='Adminpassword', is_admin=True,
    )


    Sedan = CarType(
        car_type='Coupe/Sedan'
    )

    Suv = CarType(
        car_type='SUV/Truck'
    )

    db.session.add(admin)
    db.session.add(Sedan)
    db.session.add(Suv)

    db.session.commit()


def undo_data():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.car_types RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM car_types"))
        db.session.execute(text("DELETE FROM users"))

        db.session.commit()