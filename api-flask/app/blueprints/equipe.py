import logging
from flask import Blueprint, request, jsonify

from app.extentions import db
from app.models.equipe import Equipe
from app.models.colaborador import Colaborador


logger = logging.getLogger(__name__)
equipe_bp = Blueprint("equipe", __name__, url_prefix="/equipe")


@equipe_bp.route("/<equipe_id>")
def get_equipe(equipe_id):
    """
    Parameters: o id do equipe desejado (number)
    Returns: o equipe do id pesquisado
    """
    equipe = Equipe.query.filter_by(id=equipe_id).first()
    return jsonify(equipe), 200


@equipe_bp.route("/list", methods=["POST"])
def list_equipes():
    """
    Parameters: none
    Returns: uma lista dos equipes cadastrados
    """
    auth_header = request.headers.get("Authorization")
    token_or_error, status = Colaborador.parse_token(auth_header)
    if status != 200:
        return token_or_error, status
    resp = Colaborador.decode_auth_token(token_or_error)
    colaborador = Colaborador.query.filter_by(id=resp).first()
    equipes = Equipe.query.all()
    return jsonify(equipes), 200


@equipe_bp.route("/create", methods=["POST"])
def create_equipe():
    """
    Parameters: nome do equipe a ser cadastrado
    Returns: o equipe do id pesquisado
    """
    auth_header = request.headers.get("Authorization")
    token_or_error, status = Colaborador.parse_token(auth_header)
    if status != 200:
        return token_or_error, status
    user_id = Colaborador.decode_auth_token(token_or_error)
    # verifica admin
    colaborador = Colaborador.query.get(user_id)
    if not colaborador.admin:
        return {"status": "fail", "message": "Restricted to admin only."}, 403
    post_data = request.get_json()
    try:
        equipe = Equipe(nome=post_data.get("nome"), pontuacao=0)

        db.session.add(equipe)
        db.session.commit()
        responseObject = {
            "status": "success",
            "message": "Successfully registered equipe.",
            "equipe_id": equipe.id,
        }
        return responseObject, 201
    except Exception:
        responseObject = {
            "status": "fail",
            "message": "Some error occurred. Please try again.",
        }
        return responseObject, 401
