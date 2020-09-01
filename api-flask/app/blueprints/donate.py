import logging
from flask import Blueprint, request

from app.extentions import db
from app.models.doacao import Doacao
from app.models.user import User

logger = logging.getLogger(__name__)
donate_bp = Blueprint("donate", __name__, url_prefix="/donate")


@donate_bp.route("/add/{rep_id}", methods=["POST"])
def add_donation(rep_id):
    auth_header = request.headers.get('Authorization')
    if auth_header:
        try:
            auth_token = auth_header.split(" ")[1]
        except IndexError:
            responseObject = {
                'status': 'fail',
                'message': 'Bearer token malformed.'
            }
            return responseObject, 401
    else:
        auth_token = ''
    if not auth_token:
        responseObject = {
            'status': 'fail',
            'message': 'Provide a valid auth token.'
        }
        return responseObject, 401
    resp = User.decode_auth_token(auth_token)
    if isinstance(resp, str):
        responseObject = {
            'status': 'fail',
            'message': resp
        }
        return responseObject, 401
    user = User.query.filter_by(id=resp).first()
    if not user.admin or user.id != rep_id:
        responseObject = {
            'status': 'fail',
            'message': 'You don\'t have the rights to execute this donation.'
        }
        return responseObject, 401
    post_data = request.get_json()
    try:
        donate = Doacao(
            doacao=post_data.get("doacao"),
            tipo=post_data.get("tipo"),
            quantidade=post_data.get("quantidade"),
            representante_id=post_data.get(rep_id),
            data=post_data.get("data"),
            observacao=post_data.get("observacao"),
            pontuacao=post_data.get("pontuacao")
        )
        db.session.add(donate)
        db.session.commit()
        responseObject = {
            "status": "success",
            "message": "Successfully registered donation.",
            "donate_id": donate.id,
        }
        return responseObject, 201
    except Exception:
        responseObject = {
            "status": "fail",
            "message": "Some error occurred. Please try again.",
        }
        return responseObject, 401
