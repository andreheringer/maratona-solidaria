#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
import logging
from flask import Blueprint

logger = logging.getLogger(__name__)
public_bp = Blueprint('public', __name__, url_prefix="/public")


@public_bp.route('/')
def index():
    return 'It works.'


@public_bp.route('/error')
def error():
    raise ValueError('This is a ValueError!')