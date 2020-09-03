# -*- coding: utf-8 -*-
"""The app module, containing the app factory function."""
from flask import Flask
from flask_cors import CORS
import os

from app.blueprints.auth import auth_bp
from app.blueprints.public import public_bp
from app.blueprints.donate import donate_bp
from app.models import colaborador, doacao, equipe, aluno
from app.extentions import db, migrate, bcrypt


def create_app():
    """An application factory, as explained here: http://flask.pocoo.org/docs/patterns/appfactories/.
    :param config_object: The configuration object to use.
    """
    app = Flask(__name__)
    app.config.from_object(os.environ["APP_SETTINGS"])
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    CORS(app)
    register_extensions(app)
    register_bluprints(app)
    return app


def register_extensions(app):
    """Register Flask extensions."""
    bcrypt.init_app(app)
    db.init_app(app)
    migrate.init_app(app, db)
    return None


def register_bluprints(app):
    """Register Blueprints with views."""
    app.register_blueprint(public_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(donate_bp)
    return None
