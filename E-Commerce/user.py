from flask import Blueprint, render_template, request, redirect, url_for
from models import Product, Customer, Order, OrderItem, Payment, Review, db

user_blueprint = Blueprint('user', __name__, url_prefix='/user')

@user_blueprint.route('/')
def homepage():
    return render_template("/user/homepage.html")

#routes here
