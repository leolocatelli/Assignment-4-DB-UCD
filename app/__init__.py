# 
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import Config

db = SQLAlchemy()
migrate = Migrate()  # Inicializa o objeto Migrate

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

     # Configuração da aplicação
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL') or 'postgresql://leonardolocatelli:123@localhost/quote_flask_app'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    migrate.init_app(app, db)  # Configura Flask-Migrate com a aplicação e o banco de dados

    from . import models
    from .routes import main as main_blueprint
    app.register_blueprint(main_blueprint)
    
    return app
