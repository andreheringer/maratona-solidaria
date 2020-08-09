"""Create an application instance."""
from app.app import create_app

# gunicorn -b localhost:5000 -w 4 wsgi:app
application = create_app()
