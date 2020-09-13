#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
import logging
from flask import Blueprint, jsonify
from app.models.equipe import Equipe

logger = logging.getLogger(__name__)
public_bp = Blueprint("public", __name__, url_prefix="/public")


@public_bp.route("/")
def index():
    return "It works.sss"


@public_bp.route("/equipes", methods=["GET"])
def list_donation():
    """
    """    
    equipes = Equipe.query.all()
    responseObject = {
        "status": "success",
        "equipes": jsonify(equipes),
    }
    return responseObject, 200

@public_bp.route("/classificacao", methods=['GET'])
def list_classification():
    """
    """    
    equipes = Equipe.query.order_by(Equipe.pontuacao.desc()).all()
    responseObject = {
        "status": "success",
        "equipes": jsonify(equipes),
    }
    return responseObject, 200


@public_bp.route("/error")
def error():
    raise ValueError("This is a ValueError!")
