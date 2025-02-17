from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData


metadata = MetaData()
db = SQLAlchemy(metadata=metadata)



class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    email=db.Column(db.String(80),nullable=False)
    username=db.Column(db.String(80),unique=True,nullable=False)
    password=db.Column(db.String,nullable=False)
    role=db.Column(db.String(20),nullable=False)

    def __repr__(self):
        return f'<User {self.id}, {self.email}, {self.username},{self.role}>'

