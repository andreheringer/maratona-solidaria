import logging
from flask import Blueprint, request

from app.extentions import db, bcrypt
from app.models.user import User
from app.models.blacklist import BlacklistToken

logger = logging.getLogger(__name__)
auth_bp = Blueprint("auth", __name__, url_prefix="/auth")


@auth_bp.route("/registration", methods=["POST"])
def register_user():
    post_data = request.get_json()
    user = User.query.filter_by(email=post_data.get("email")).first()
    if not user:
        try:
            user = User(
                name=post_data.get("name"),
                email=post_data.get("email"),
                team=post_data.get("team"),
                password=post_data.get("password"),
                admin=post_data.get("admin")
            )
            db.session.add(user)
            db.session.commit()
            auth_token = user.encode_auth_token(user.id)
            responseObject = {
                "status": "success",
                "message": "Successfully registered.",
                "auth_token": auth_token.decode(),
            }
            return responseObject, 201
        except Exception:
            responseObject = {
                "status": "fail",
                "message": "Some error occurred. Please try again.",
            }
            return responseObject, 401
    else:
        responseObject = {
            "status": "fail",
            "message": "User already exists. Please Log in.",
        }
        return responseObject, 202


@auth_bp.route("/login", methods=["POST"])
def login_user():
    post_data = request.get_json()
    try:
        user = User.query.filter_by(email=post_data.get("email")).first()
        if user and bcrypt.check_password_hash(
            user.password, post_data.get("password")
        ):
            auth_token = user.encode_auth_token(user.id)
            if auth_token:
                responseObject = {
                    "status": "success",
                    "message": "Successfully logged in.",
                    "auth_token": auth_token.decode(),
                }
                return responseObject, 200
        else:
            responseObject = {"status": "fail", "message": "User does not exist."}
            return responseObject, 404
    except Exception:
        responseObject = {"status": "fail", "message": "Try again"}
        return responseObject, 500


@auth_bp.route("/logout", methods=["POST"])
def logout_user():
    auth_header = request.headers.get('Authorization')
    if auth_header:
        auth_token = auth_header.split(" ")[1]
    else:
        auth_token = ''
    if auth_token:
        resp = User.decode_auth_token(auth_token)
        if not isinstance(resp, str):
            blacklist_token = BlacklistToken(token=auth_token)
            try:
                db.session.add(blacklist_token)
                db.session.commit()
                responseObject = {
                    'status': 'success',
                    'message': 'Successfully logged out.'
                }
                return responseObject, 200
            except Exception as e:
                responseObject = {
                    'status': 'fail',
                    'message': e
                }
                return responseObject, 200
        else:
            responseObject = {
                'status': 'fail',
                'message': resp
            }
            return responseObject, 401
    else:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return responseObject, 403
