import os

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = "\xf9'\xe4p(\xa9\x12\x1a!\x94\x8d\x1c\x99l\xc7\xb7e\xc7c\x86\x02MJ\xa0"
    BCRYPT_LOG_ROUNDS = 13
    # Conexão com o banco não estabelicida por enquanto
    SQLALCHEMY_DATABASE_URI = os.environ["DATABASE_URL"]


class ProductionConfig(Config):
    DEBUG = False


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4


class TestingConfig(Config):
    TESTING = True
    BCRYPT_LOG_ROUNDS = 4
