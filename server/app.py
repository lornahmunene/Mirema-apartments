from flask import Flask, request, jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_restful import Api, Resource
from werkzeug.security import generate_password_hash
from flask_cors import CORS
from models import db, User, Room, Tenant, Payment

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Database Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mirema.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
api = Api(app)

# User Registration Route
class Register(Resource):
    def post(self):
        data = request.get_json()
        if not data.get("email") or not data.get("username") or not data.get("password") or not data.get("role"):
            return make_response({"error": "All fields are required"}, 400)

        if data['role'] != 'manager':
            return make_response({"error": "Only 'manager' role is allowed"}, 400)

        hashed_password = generate_password_hash(data['password'])
        new_user = User(
            email=data['email'],
            username=data['username'],
            password=hashed_password,
            role=data['role']
        )
        db.session.add(new_user)
        db.session.commit()
        return make_response({"message": "User registered successfully", "user": new_user.to_dict()}, 201)

api.add_resource(Register, '/register')

# Rooms Resource
class Rooms(Resource):
    def get(self):
        return make_response([room.to_dict() for room in Room.query.all()], 200)
    
    def post(self):
        data = request.get_json()
        new_room = Room(
            room_id=data['room_id'],
            status=data['status'],
            rent_amount=data['rent_amount'],
            landlord_id=data['landlord_id'],
            tenant_id=data.get('tenant_id')
        )
        db.session.add(new_room)
        db.session.commit()
        return make_response(new_room.to_dict(), 201)

api.add_resource(Rooms, '/rooms')

# Tenants Resource
class TenantResource(Resource):
    def get(self):
        return make_response([tenant.to_dict() for tenant in Tenant.query.all()], 200)
    
    def post(self):
        data = request.get_json()
        new_tenant = Tenant(
            tenant_name=data['tenant_name'],
            tenant_email=data['tenant_email'],
            moving_in_date=data['moving_in_date'],
            moving_out_date=data['moving_out_date']
        )
        db.session.add(new_tenant)
        db.session.commit()
        return make_response(new_tenant.to_dict(), 201)

api.add_resource(TenantResource, '/tenants')

# Payments Resource
class PaymentsResource(Resource):
    def get(self):
        return make_response([payment.to_dict() for payment in Payment.query.all()], 200)
    
    def post(self):
        data = request.get_json()
        new_payment = Payment(
            payment_date=data['payment_date'],
            payment_price=data['payment_price'],
            room_id=data['room_id'],
            tenant_id=data['tenant_id']
        )
        db.session.add(new_payment)
        db.session.commit()
        return make_response(new_payment.to_dict(), 201)

api.add_resource(PaymentsResource, '/payments')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(port=5555, debug=True)
