from datetime import datetime

from dataclasses import dataclass
from app.extentions import db


@dataclass
class Equipe(db.Model):
    id: int
    nome: str
    pontuacao: int

    __tablename__ = "Equipes"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120))
    pontuacao = db.Column(db.Integer)
