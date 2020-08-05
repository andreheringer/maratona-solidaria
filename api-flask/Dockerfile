# Use an official Python runtime as an image
FROM python:3.6

# The EXPOSE instruction indicates the ports on which a container # # will listen for connections
# Since Flask apps listen to port 5000  by default, we expose it
EXPOSE 5000

# Sets the working directory for following COPY and CMD instructions
# Notice we haven’t created a directory by this name - this
# instruction creates a directory with this name if it doesn’t exist
WORKDIR /app

# Install any needed packages specified in requirements.txt
ADD . /app
RUN pip install -r requirements.txt

ENV APP_SETTINGS="config.DevelopmentConfig"

CMD ["gunicorn", "-b", "0.0.0.0:5000", "-w", "4", "wsgi:application"]
