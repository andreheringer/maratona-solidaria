import os
from flask_migrate import Manager, MigrateCommand
from app.app import create_app

manager = Manager(create_app)
manager.add_command("db", MigrateCommand)

if __name__ == "__main__":
    manager.run()
