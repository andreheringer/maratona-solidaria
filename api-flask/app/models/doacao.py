from datetime import datetime

from app.extentions import db


class Doacao(db.Model):

    __tablename__ = "Doacoes"

    id = db.Column(db.Integer, primary_key=True)
    doacao = db.Column(db.String(120))
    tipo = db.Column(db.String(120))
    quantidade = db.Column(db.Integer)
    representante_id = db.Column(db.Integer, db.ForeignKey("Users.id"))
    data = db.Column(db.DateTime, default=datetime.utcnow)
    observacao = db.Column(db.Text)

    representante = db.relationship("User", foreign_keys=representante_id)

    def __init__(self, doacao, tipo, quantidade, representante_id, data, observacao):
        self.doacao = doacao
        self.tipo = tipo
        self.quantidade = quantidade
        self.representante_id = representante_id
        self.data = data
        self.observacao = observacao

    def __repr__(self):  # representation
        return "<Nome %r>" % self.doacao
