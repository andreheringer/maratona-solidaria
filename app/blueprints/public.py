#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
import logging
from flask import Blueprint

logger = logging.getLogger(__name__)
public_pb = Blueprint('public', __name__, url_prefix="api/public")


@public_pb.route('/')
def index():
    return 'It works.'


@public_pb.route('/error')
def error():
    raise ValueError('This is a ValueError!')