from datetime import datetime

from dataclasses import dataclass
from app.extentions import db


@dataclass
class Equipe(db.Model):
    id: int
    nome: str
    pontuacao: int
    sigla: str

    __tablename__ = "Equipes"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120))
    sigla = db.Column(db.String(3))
    pontuacao = db.Column(db.Integer)
