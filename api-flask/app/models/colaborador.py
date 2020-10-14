import jwt
import datetime

from flask import current_app as app
from sqlalchemy.orm import backref

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
    equipe_id = db.Column(db.Integer, db.ForeignKey("Equipes.id"))
    password = db.Column(db.String(255), nullable=False)
    admin = db.Column(db.Boolean, nullable=False, default=False)
    registered_on = db.Column(db.DateTime, nullable=False)

    def __init__(self, name, email, equipe_id, password, admin):
        self.name = name
        self.email = email
        self.equipe_id = equipe_id
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
                + datetime.timedelta(days=0, seconds=3600),
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

    @staticmethod
    def parse_token(auth_header):
        if auth_header:
            try:
                auth_token = auth_header.split(" ")[1]
            except IndexError:
                responseObject = {
                    "status": "fail",
                    "message": "Bearer token malformed.",
                }
                return responseObject, 401
        else:
            auth_token = ""
        if not auth_token:
            responseObject = {
                "status": "fail",
                "message": "Provide a valid auth token.",
            }
            return responseObject, 401
        resp = Colaborador.decode_auth_token(auth_token)
        if isinstance(resp, str):
            responseObject = {"status": "fail", "message": resp}
            return responseObject, 401
        return auth_token, 200

    def __repr__(self):
        return "<id {}>".format(self.id)
