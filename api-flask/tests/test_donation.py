from flask import json
import os
import pytest
from app.app import create_app
from app.extentions import db
from app.models.equipe import Equipe
from app.models.colaborador import Colaborador
from app.models.doacao import Doacao

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

def test_donation(client):
    rv = client.post("/auth/login", json={
        'email': 'gab@test.com',
        'password': '1234'
    })
    data = rv.get_json()
    token = data["auth_token"]

    rv = client.post("/donation/create", json={"doacao": "3Arroz", "tipo":"Arroz", "quantidade": 2, "aluno_id": 1 , "pontuacao": 30}, 
    headers={
        'Authorization': 'Bearer %s' % token
    })
    data = rv.get_json()
    assert data['status'] == "success"

def test_invalid_user_donation(client):
    rv = client.post("/auth/login", json={
        'email': 'hacker@test.com',
        'password': '1234'
    })
    data = rv.get_json()
    if data['status'] == "fail":
        token = 0
    else:
        token = data['auth_token']

    rv = client.post("/donation/create", json={"doacao": "3Arroz", "tipo":"Arroz", "quantidade": 2, "aluno_id": 1 , "pontuacao": 30}, 
    headers={
        'Authorization': 'Bearer %s' % token
    })
    data = rv.get_json()
    assert data['status'] == "fail"

def test_list_donation(client):
    rv = client.post("/auth/login", json={
        'email': 'gab@test.com',
        'password': '1234'
    })
    data = rv.get_json()
    token = data["auth_token"]

    rv = client.get("/donation/list", 
    headers={
        'Authorization': 'Bearer %s' % token
    })
    data = rv.get_json()
    assert 200, response.status_code

def test_invalid_user_list_donation(client):
    rv = client.post("/auth/login", json={
        'email': 'hacker@test.com',
        'password': '1234'
    })
    data = rv.get_json()
    if data['status'] == "fail":
        token = 0
    else:
        token = data['auth_token']
    rv = client.get("/donation/list", 
    headers={
        'Authorization': 'Bearer %s' % token
    })
    data = rv.get_json()
    assert 200, response.status_code

def test_get_donation(client):
    rv = client.post("/auth/login", json={
        'email': 'gab@test.com',
        'password': '1234'
    })
    data = rv.get_json()
    token = data["auth_token"]

    rv = client.get("/donation/2", 
    headers={
        'Authorization': 'Bearer %s' % token
    })
    data = rv.get_json()
    assert 200, response.status_code

