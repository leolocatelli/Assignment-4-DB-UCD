import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'postgresql://leonardolocatelli:123@localhost/quote_flask_app'
    
    SQLALCHEMY_TRACK_MODIFICATIONS = False
