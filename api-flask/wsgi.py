"""Create an application instance."""
from app.app import create_app

if __name__ == '__main__':
    """
    Ponto de inicialição do servidor.
    Commando para execução:
        gunicorn -b localhost:5000 -w 4 wsgi:app
    """
    app = create_app()
    app.run()