import os

from setup import basedir

class BaseConfig(object):
    SECRET_KEY = "SO_SECURE"
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'postgres://omtkmoplveazgq:d8fad052a057018fd3d1493bad5054e2bd1c74c56d191d757e1fa096836175f7@ec2-54-221-220-82.compute-1.amazonaws.com:5432/d4su07rtkv112h'
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class TestingConfig(object):
    """Development configuration."""
    TESTING = True
    DEBUG = True
    WTF_CSRF_ENABLED = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    DEBUG_TB_ENABLED = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False
