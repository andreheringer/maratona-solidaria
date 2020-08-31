from datetime import datetime

from app.extentions import db
from app.models.equipe import Equipe


class Aluno(db.Model):

    __tablename__ = "Alunos"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120))
    matricula = db.Column(db.Integer)
    equipe_id = db.Column(db.Integer, db.ForeignKey("Equipes.id"))
    email = db.Column(db.Text)

    representante = db.relationship("Equipe", foreign_keys=equipe_id)


    def __init__(self, nome, matricula, equipe_id, email):
        self.nome = nome
        self.matricula = matricula
        self.equipe_id = equipe_id
        self.email = email

    def __repr__(self):  # representation
        return "<Nome %r>" % self.nome
