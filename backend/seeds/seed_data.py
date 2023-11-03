from backend.models import db, User, CarType, Service, environment, SCHEMA
from sqlalchemy.sql import text


def seed_data():
    admin = User(
        email='thatsawrapautostylin@gmail.com', name='Admin', password='Adminpassword', is_admin=True,
    )
    john = User(
        email='john@aa.io', name='John', password='password'
    )

    sedanSideWindowTint = Service(
        title="Side Window Tint",
        description="Side window tinting",
        price=50.00,
        image_url='na',
        car_type=2,
        duration=2
    )

    SUVSideWindowTint = Service(
        title="Side Window Tint",
        description="Side window tinting",
        price=60.00,
        image_url='na',
        car_type=3,
        duration=2
    )

    SUVRearWindowTint = Service(
        title="Rear Window Tint",
        description="Rear window tinting",
        price=55.00,
        image_url='na',
        car_type=3,
        duration=2
    )

    sedanRearWindowTint = Service(
        title="Rear Window Tint",
        description="Rear window tinting",
        price=55.00,
        image_url='na',
        car_type=2,
        duration=2
    )

    headlightTaillightTint = Service(
        title="Head light/tail light Tint",
        description="Headlight/tail light tinting",
        price=55.00,
        image_url='na',
        car_type=1,
        duration=2
    )

    sedanFullWrap = Service(
        title="Sedan full car wrap",
        description="Full car wrap",
        price=1300.00,
        image_url='na',
        car_type=2,
        duration=48
    )

    SUVFullWrap = Service(
        title="SUV full car wrap",
        description="Full car wrap",
        price=1500.00,
        image_url='na',
        car_type=3,
        duration=48
    )

    doorChromeDelete = Service(
        title="Door chrome delete",
        description="Door chrome delete (handles, windows)",
        price=65.00,
        image_url='na',
        car_type=1,
        duration=3
    )

    fullChromeDelete = Service(
        title="Full chrome delete",
        description="Full chrome delete (door handles, windows, trim, badges, etc)",
        price=65.00,
        image_url='na',
        car_type=1,
        duration=3
    )

    exteriorDetailing = Service(
        title="Exterior detailing",
        description="Exterior detailing",
        price=60.00,
        image_url='na',
        car_type=1,
        duration=3
    )

    interiorDetailing = Service(
        title="Interior detailing",
        description="Interior detailing",
        price=60.00,
        image_url='na',
        car_type=1,
        duration=3
    )

    bothDetailing = Service(
        title="Interior/Exterior detailing",
        description="Interior/Exterior detailing",
        price=110.00,
        image_url='na',
        car_type=1,
        duration=6
    )

    fullCarSteaming = Service(
        title="Interior/Exterior steaming",
        description="Interior/Exterior steaming",
        price=125.00,
        image_url='na',
        car_type=1,
        duration=6
    )

    Sedan = CarType(
        car_type='Coupe/Sedan'
    )

    Suv = CarType(
        car_type='SUV/Truck'
    )

    AllTypes = CarType(
        car_type='ALL'
    )

    # Car Types
    db.session.add(admin)
    db.session.add(john)
    db.session.add(AllTypes)
    db.session.add(Sedan)
    db.session.add(Suv)
    # Services
    db.session.add(sedanSideWindowTint)
    db.session.add(sedanRearWindowTint)
    db.session.add(sedanFullWrap)
    db.session.add(SUVSideWindowTint)
    db.session.add(SUVRearWindowTint)
    db.session.add(SUVFullWrap)
    db.session.add(headlightTaillightTint)
    db.session.add(doorChromeDelete)
    db.session.add(fullChromeDelete)
    db.session.add(exteriorDetailing)
    db.session.add(interiorDetailing)
    db.session.add(bothDetailing)
    db.session.add(fullCarSteaming)

    db.session.commit()


def undo_data():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.car_types RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.services RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM car_types"))
        db.session.execute(text("DELETE FROM users"))
        db.session.execute(text("DELETE FROM services"))

        db.session.commit()
