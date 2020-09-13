import logging
from flask import Blueprint, request, jsonify

from app.extentions import db
from app.models.colaborador import Colaborador
from app.models.aluno import Aluno


logger = logging.getLogger(__name__)
aluno_bp = Blueprint("aluno", __name__, url_prefix="/aluno")


@aluno_bp.route("/<aluno_id>")
def get_aluno(aluno_id):
    """
    Parameters: o id do aluno desejado (number)
    Returns: o aluno do id pesquisado 
    """
    aluno = Aluno.query.filter_by(id=aluno_id).first()
    responseObject = {
        "status": "success",
        "message": "Successfully queried aluno",
        "aluno": jsonify(aluno),
    }
    return responseObject, 200


@aluno_bp.route("/list")
def list_aluno():
    """
    Parameters: none
    Returns: uma lista dos alunos cadastrados
    """
    auth_header = request.headers.get('Authorization')
    token_or_error, status = Colaborador.parse_token(auth_header)
    if status != 200:
        return token_or_error, status
    resp = Colaborador.decode_auth_token(token_or_error)
    alunos = Aluno.query.filter_by(colaborador_id=resp)
    responseObject = {
        "status": "success",
        "alunos": jsonify(alunos),
    }
    return responseObject, 200


@aluno_bp.route("/create")
def create_aluno():
    """
    Parameters: nome do aluno a ser cadastrado
    Returns: o aluno do id pesquisado 
    """
    auth_header = request.headers.get('Authorization')
    token_or_error, status = Colaborador.parse_token(auth_header)
    if status != 200:
        return token_or_error, status
    resp = Colaborador.decode_auth_token(token_or_error)
    post_data = request.get_json()
    try:
        aluno = Aluno(
            nome=post_data("nome"),
            colaborador_id=resp,
            matricula=post_data.get("matricula"),
            email=post_data.get("email"),
            equipe_id=post_data.get("equipe_id")
        )
        db.session.add(aluno)
        db.session.commit()
        responseObject = {
            "status": "success",
            "message": "Successfully registered aluno.",
            "aluno_id": aluno.id,
        }
        return responseObject, 201
    except Exception:
        responseObject = {
            "status": "fail",
            "message": "Some error occurred. Please try again.",
        }
        return responseObject, 401
