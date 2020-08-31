"""empty message

Revision ID: c4e4756651e2
Revises: 171e17127b07
Create Date: 2020-08-31 22:56:42.079646

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c4e4756651e2'
down_revision = '171e17127b07'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Doacoes',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('doacao', sa.String(length=120), nullable=True),
    sa.Column('tipo', sa.String(length=120), nullable=True),
    sa.Column('quantidade', sa.Integer(), nullable=True),
    sa.Column('representante_id', sa.Integer(), nullable=True),
    sa.Column('data', sa.DateTime(), nullable=True),
    sa.Column('observacao', sa.Text(), nullable=True),
    sa.Column('pontuacao', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['representante_id'], ['Users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('Doacoes')
    # ### end Alembic commands ###
