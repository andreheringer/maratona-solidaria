from datetime import datetime

from app.extentions import db


class Equipe(db.Model):

    __tablename__ = "Equipes"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120))
    pontuacao = db.Column(db.Integer)


    def __init__(self, nome, pontuacao):
        self.nome = nome
        self.pontuacao = pontuacao

    def __repr__(self):  # representation
        return "<Nome %r>" % self.nome
