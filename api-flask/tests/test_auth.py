from flask import json
import os
import pytest
from app.app import create_app
from app.extentions import db
from app.models.equipe import Equipe
from app.models.colaborador import Colaborador

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
            colab1 = Colaborador("Gab", "gab@test.com", 1, "1234", False)
            db.session.add(equipe1)
            db.session.add(colab1)
            db.session.commit()

            yield client

            db.drop_all()


def test_registration(client):
    rv = client.post("/auth/registration", json={
        'email': 'test@example.com', 'password': 'secret', 'name': 'Teta', 'equipe_id': 1
    })
    data = rv.get_json()
    assert data['status'] == "success"

def test_invalid_registration(client):
    rv = client.post("/auth/registration", json={
        'email': 'gab@test.com', 'password': 'secret', 'name': 'Teta', 'equipe_id': 1
    })
    data = rv.get_json()
    assert data['status'] == "fail"

def test_login(client):
    rv = client.post("/auth/login", json={
        'email': 'gab@test.com',
        'password': '1234'
    })

    data = rv.get_json()
    assert data['status'] == "success"

def test_logout(client):
    rv = client.post("/auth/login", json={
        'email': 'gab@test.com',
        'password': '1234'
    })
    data = rv.get_json()
    token = data["auth_token"]
    rv =  client.get('/auth/logout',     headers={
        'Authorization': 'Bearer %s' % token
    })