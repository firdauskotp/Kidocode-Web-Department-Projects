from flask import Flask
from models import db

from user import user_blueprint
from admin import admin_blueprint

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root:dlvvkxl@localhost:3306/ecommerce'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

app.register_blueprint(user_blueprint)
app.register_blueprint(admin_blueprint)

if __name__ == "__main__":
    app.run(debug=True)
