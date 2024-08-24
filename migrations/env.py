from __future__ import with_statement
import logging
from logging.config import fileConfig
from sqlalchemy import engine_from_config, pool
from alembic import context
from app import create_app, db

config = context.config

fileConfig(config.config_file_name)

app = create_app()
target_metadata = db.metadata

def run_migrations_offline():
    url = app.config.get("SQLALCHEMY_DATABASE_URI")
    context.configure(url=url, target_metadata=target_metadata)

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix='sqlalchemy.',
        poolclass=pool.NullPool,
        url=app.config.get("SQLALCHEMY_DATABASE_URI")
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
