"""Initial migration

Revision ID: 929308bf40b2
Revises: 
Create Date: 2024-08-13 09:23:17.196056

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '929308bf40b2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('posts', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
    op.drop_constraint('posts_user_id_fkey', 'posts', type_='foreignkey')
    op.create_foreign_key(None, 'posts', 'users', ['user_id'], ['id'])
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'posts', type_='foreignkey')
    op.create_foreign_key('posts_user_id_fkey', 'posts', 'users', ['user_id'], ['id'], ondelete='CASCADE')
    op.alter_column('posts', 'user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
    # ### end Alembic commands ###
