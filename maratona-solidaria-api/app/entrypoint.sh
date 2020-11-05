#!/usr/bin/env bash
while ! nc -z db 3306; do
    echo 'App waiting for database ...';
    sleep 1;
done;
python manage.py db upgrade
gunicorn --reload -b 0.0.0.0:5000 -w 4 wsgi:application
