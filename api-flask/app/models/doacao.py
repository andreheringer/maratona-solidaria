from dataclasses import dataclass
from datetime import datetime
from app.extentions import db


@dataclass
class Doacao(db.Model):
    id: int
    doacao: str
    tipo: str
    quantidade: int
    colaborador_id: int
    aluno_id: int
    equipe_id: int
    data: datetime
    observacao: str
    pontuacao: int

    __tablename__ = "Doacoes"

    id = db.Column(db.Integer, primary_key=True)
    doacao = db.Column(db.String(120))
    tipo = db.Column(db.String(120))
    quantidade = db.Column(db.Integer)
    colaborador_id = db.Column(
        db.Integer, db.ForeignKey("Colaboradores.id"), nullable=False
    )
    aluno_id = db.Column(db.Integer, db.ForeignKey("Alunos.id"), nullable=False)
    equipe_id = db.Column(db.Integer, db.ForeignKey("Equipes.id"), nullable=False)
    data = db.Column(db.DateTime, default=datetime.utcnow)
    observacao = db.Column(db.Text)
    pontuacao = db.Column(db.Integer)

    aluno = db.relationship("Aluno", backref=db.backref("doacoes", lazy=True))
    representante = db.relationship(
        "Colaborador", backref=db.backref("doacoes", lazy=True)
    )
