#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
import logging
from flask import Blueprint, jsonify
from app.models.equipe import Equipe

logger = logging.getLogger(__name__)
public_bp = Blueprint("public", __name__, url_prefix="/public")


@public_bp.route("/")
def index():
    return "It works"


@public_bp.route("/equipes", methods=["GET"])
def list_donation():
    """
    retorna a lista publica de equipes
    """    
    equipes = Equipe.query.all()
    return jsonify(equipes), 200

@public_bp.route("/classificacao", methods=['GET'])
def list_classification():
    """
    retorna a lista de equipes ordenada pela pontuacao
    """    
    equipes = Equipe.query.order_by(Equipe.pontuacao.desc()).all()
    return jsonify(equipes), 200


@public_bp.route("/error")
def error():
    raise ValueError("This is a ValueError!")
