#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
import logging
from flask import Blueprint, jsonify
from app.models.equipe import Equipe
from app.models.aluno import Aluno

logger = logging.getLogger(__name__)
public_bp = Blueprint("public", __name__, url_prefix="/public")


@public_bp.route("/")
def index():
    return "It works"


@public_bp.route("/equipes", methods=["GET"])
def list_teams():
    """
    retorna a lista publica de equipes
    """
    equipes = Equipe.query.all()
    equipesComTamanho = []

    for equipe in equipes:
        tamanhoEquipe = Aluno.query.filter_by(equipe_id=equipe.id).count()
        equipesComTamanho.append({
            'id': equipe.id,
            'nome': equipe.nome,
            'pontuacao': equipe.pontuacao,
            'sigla': equipe.sigla,
            'tamanho': tamanhoEquipe
        })

    return jsonify(equipesComTamanho), 200


@public_bp.route("/classificacao", methods=["GET"])
def list_classification():
    """
    retorna a lista de equipes ordenada pela pontuacao
    """
    equipes = Equipe.query.order_by(Equipe.pontuacao.desc()).all()
    equipesComTamanho = []

    for equipe in equipes:
        tamanhoEquipe = Aluno.query.filter_by(equipe_id=equipe.id).count()
        equipesComTamanho.append({
            'id': equipe.id,
            'nome': equipe.nome,
            'pontuacao': equipe.pontuacao,
            'sigla': equipe.sigla,
            'tamanho': tamanhoEquipe
        })

    return jsonify(equipesComTamanho), 200


@public_bp.route("/error")
def error():
    raise ValueError("This is a ValueError!")
