import logging
from flask import Blueprint, request, jsonify

from app.extentions import db
from app.models.doacao import Doacao
from app.models.colaborador import Colaborador
from app.models.equipe import Equipe

logger = logging.getLogger(__name__)
doacao_bp = Blueprint("donation", __name__, url_prefix="/donation")


@doacao_bp.route("/<donation_id>", methods=["GET"])
def get_donation(donation_id):
    """
    Parameters: o id da donation desejado (number)
    Returns: objeto com a donation
    """
    donation = Doacao.query.filter_by(id=donation_id).first()
    return jsonify(donation), 200


@doacao_bp.route("/list", methods=["GET"])
def list_donation():
    """
    Parameters: none
    Returns: lista de todas as doações realizadas
    """
    auth_header = request.headers.get('Authorization')
    token_or_error, status = Colaborador.parse_token(auth_header)
    if status != 200:
        return token_or_error, status
    resp = Colaborador.decode_auth_token(token_or_error)
    doacoes = Doacao.query.filter_by(colaborador_id=resp)
    return jsonify(doacoes), 200


@doacao_bp.route("/create", methods=["POST"])
def create_donation():
    """
    Parameters: objeto do tipo doação
    Returns: doação criada e status da criação
    """
    auth_header = request.headers.get('Authorization')
    token_or_error, status = Colaborador.parse_token(auth_header)
    if status != 200:
        return token_or_error, status
    resp = Colaborador.decode_auth_token(token_or_error)
    colaborador = Colaborador.query.filter_by(id=resp).first()
    equipe = Equipe.query.filter_by(id=colaborador.equipe_id).first()
    post_data = request.get_json()
    try:
        donate = Doacao(
            doacao=post_data.get("doacao"),
            tipo=post_data.get("tipo"),
            quantidade=post_data.get("quantidade"),
            colaborador_id=colaborador.id,
            data=post_data.get("data"),
            aluno_id=post_data.get("aluno_id"),
            observacao=post_data.get("observacao"),
            pontuacao=post_data.get("pontuacao")
        )
        equipe.pontuacao += post_data.get("pontuacao")
        db.session.add(donate)
        db.session.add(equipe)
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
