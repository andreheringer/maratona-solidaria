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