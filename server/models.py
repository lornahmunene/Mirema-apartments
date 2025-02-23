from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData

metadata = MetaData()
db = SQLAlchemy(metadata=metadata)

### USER MODEL
class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), nullable=False, unique=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'landlord' or 'manager'

    def to_dict(self):
        return {"id": self.id, "email": self.email, "username": self.username, "role": self.role}

### ROOM MODEL
class Room(db.Model):
    __tablename__ = 'room'

    room_id = db.Column(db.String, primary_key=True)
    status = db.Column(db.String, nullable=False)  # 'vacant' or 'occupied'
    rent_amount = db.Column(db.Float, nullable=False)
    landlord_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=True)

    def to_dict(self):
        return {
            "room_id": self.room_id,
            "status": self.status,
            "rent_amount": self.rent_amount,
            "landlord_id": self.landlord_id,
            "tenant_id": self.tenant_id
        }

### TENANT MODEL
class Tenant(db.Model):
    __tablename__ = 'tenant'

    id = db.Column(db.Integer, primary_key=True)
    tenant_name = db.Column(db.String, nullable=False)
    tenant_email = db.Column(db.String, unique=True, nullable=False)
    moving_in_date = db.Column(db.Date, nullable=False)
    moving_out_date = db.Column(db.Date, nullable=True)

    def to_dict(self):
        return {
            "id": self.id,
            "tenant_name": self.tenant_name,
            "tenant_email": self.tenant_email,
            "moving_in_date": str(self.moving_in_date),
            "moving_out_date": str(self.moving_out_date) if self.moving_out_date else None
        }

### PAYMENT MODEL
class Payment(db.Model):
    __tablename__ = 'payment'

    id = db.Column(db.String, primary_key=True)
    payment_date = db.Column(db.Date, nullable=False)
    payment_price = db.Column(db.Float, nullable=False)
    room_id = db.Column(db.String, db.ForeignKey('room.room_id'), nullable=False)
    tenant_id = db.Column(db.Integer, db.ForeignKey('tenant.id'), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "payment_date": str(self.payment_date),
            "payment_price": self.payment_price,
            "room_id": self.room_id,
            "tenant_id": self.tenant_id
        }
