from flask import json
import os
import pytest
from app.app import create_app
from app.extentions import db
from app.models.equipe import Equipe


@pytest.fixture
def client():
    os.environ["DATABASE_URL"] = "sqlite://"
    os.environ["APP_SETTINGS"] = "config.TestingConfig"
    test_app = create_app()
    test_app.testing = True

    with test_app.test_client() as client:
        with test_app.app_context():
            db.create_all()
            equipe1 = Equipe(id=1, nome="Computacao", pontuacao=0)
            db.session.add(equipe1)
            db.session.commit()
        yield client


def test_public_root(client):
    rv = client.get("/public/")
    assert rv.data == b'It works'


def test_public_list_teams(client):
    rv = client.get("/public/equipes")
    data = json.loads(rv.data)
    assert data[0]["id"] == 1
    assert data[0]["nome"] == "Computacao"
    assert data[0]["pontuacao"] == 0 


def test_public_teams_classification(client):
    rv = client.get("/public/classificacao")
    data = json.loads(rv.data)
    assert data[0]["id"] == 1
    assert data[0]["nome"] == "Computacao"
    assert data[0]["pontuacao"] == 0 


def test_public_error(client):
    error = False
    try:
        client.get("/public/error")
    except ValueError:
        error = True

    assert error