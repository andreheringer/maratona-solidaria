from dataclasses import dataclass
from app.extentions import db

@dataclass
class Aluno(db.Model):
    id: int
    nome: str
    matricula: int
    equipe_id: int
    colaborador_id: int
    email: str
    telefone: str
    observacao: str

    __tablename__ = "Alunos"

    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(120))
    matricula = db.Column(db.Integer)
    equipe_id = db.Column(db.Integer, db.ForeignKey("Equipes.id"))
    colaborador_id = db.Column(db.Integer, db.ForeignKey("Colaboradores.id"))
    email = db.Column(db.Text)
    telefone = db.Column(db.Text, default=None)
    observacao = db.Column(db.Text, default=None)

    equipe = db.relationship("Equipe", backref=db.backref('alunos', lazy=True))
    colaborador = db.relationship("Colaborador", backref=db.backref('alunos', lazy=True))

