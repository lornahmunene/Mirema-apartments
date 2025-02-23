from app import db, User
from werkzeug.security import generate_password_hash

# Predefined landlord credentials
LANDLORD_EMAIL = "lornah@gmail.com.com"
LANDLORD_USERNAME = "landlord"
LANDLORD_PASSWORD = "blabla"
LANDLORD_ROLE = "landlord"

def seed_landlord():
    with db.session.begin():
        existing_landlord = User.query.filter_by(email=LANDLORD_EMAIL).first()
        if not existing_landlord:
            landlord = User(
                email=LANDLORD_EMAIL,
                username=LANDLORD_USERNAME,
                password=generate_password_hash(LANDLORD_PASSWORD),
                role=LANDLORD_ROLE
            )
            db.session.add(landlord)
            db.session.commit()
            print("Landlord seeded successfully!")
        else:
            print("Landlord already exists!")

if __name__ == "__main__":
    from app import app  # Import the Flask app
    with app.app_context():
        seed_landlord()
