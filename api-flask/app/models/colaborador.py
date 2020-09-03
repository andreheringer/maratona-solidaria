import jwt
import datetime

from flask import current_app as app

from app.extentions import db, bcrypt
from app.models.blacklist import BlacklistToken


class Colaborador(db.Model):
    """
    User model stores a normal and admin user
    """

    __tablename__ = "Colaboradores"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    team = db.Column(db.Integer, db.ForeignKey("equipe.id"))
    password = db.Column(db.String(255), nullable=False)
    admin = db.Column(db.Boolean, nullable=False, default=False)
    registered_on = db.Column(db.DateTime, nullable=False)

    doacoes = db.relationship()

    def __init__(self, name, email, team, password, admin):
        self.name = name
        self.email = email
        self.team = team
        self.admin = admin
        self.password = bcrypt.generate_password_hash(
            password, app.config.get("BCRYPT_LOG")
        ).decode()
        self.registered_on = datetime.datetime.now()

    def encode_auth_token(self, user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                "exp": datetime.datetime.utcnow()
                + datetime.timedelta(days=0, seconds=5),
                "iat": datetime.datetime.utcnow(),
                "sub": user_id,
            }
            return jwt.encode(payload, app.config.get("SECRET_KEY"), algorithm="HS256")
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Validates the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, app.config.get("SECRET_KEY"))
            is_blacklisted_token = BlacklistToken.check_blacklist(auth_token)
            if is_blacklisted_token:
                return "Token blacklisted. Please log in again."
            else:
                return payload["sub"]
        except jwt.ExpiredSignatureError:
            return "Signature expired. Please log in again."
        except jwt.InvalidTokenError:
            return "Invalid token. Please log in again."

    def __repr__(self):
        return "<id {}>".format(self.id)
