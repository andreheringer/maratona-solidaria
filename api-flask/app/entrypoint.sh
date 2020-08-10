#!/usr/bin/env bash
python manage.py db upgrade
gunicorn -b 0.0.0.0:5000 -w 4 wsgi:application