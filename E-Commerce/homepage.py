from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
import MySQLdb.cursors
import os
import random

app = Flask(__name__)
app.secret_key = 'kidocodeverysecretkey' # Securing user session, prevents tampering with session data.

app.config['MYSQL_HOST'] = '127.0.0.1'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PORT'] = 3306
app.config['MYSQL_PASSWORD'] = '' # No need to set a password.
app.config['MYSQL_DB'] = 'kidocodeshop_users'

mysql = MySQL(app)
bcrypt = Bcrypt(app)

@app.route('/')
def home():
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    cursor.execute("SELECT * FROM products")
    products = cursor.fetchall()
    # Shows products at random
    random_products = random.sample(products, min(len(products), 8))
    cursor.close()
    email = session.get('email', None)
    if 'cart' not in session:
        session['cart'] = {}
    return render_template('/homepage/HomePage.html', products = random_products, email = email)

@app.route('/add-to-cart', methods = ['POST'])
def add_to_cart():
    product = request.get_json().get('product')

    if not product or 'name' not in product or 'price' not in product:
        return jsonify({'success': False, 'message': 'Invalid product data.'}), 400
    
    if 'cart' not in session:
        session['cart'] = {}

    if product['name'] in session['cart']:
        session['cart'][product['name']]['quantity'] += 1
    else:
        session['cart'][product['name']] ={
            'price': float(product['price']),
            'quantity': 1
        }

    session.modified = True
    return jsonify({'success': True, 'cart': session['cart']})

@app.route('/get-cart', methods = ['GET'])
def get_cart():
    cart = session.get('cart', {})
    return jsonify(session.get('cart', {}))

@app.route('/remove-from-cart', methods = ['POST'])
def remove_from_cart():
    product_name = request.get_json().get('name')
    if 'cart' in session and product_name in session['cart']:
        del session['cart'][product_name]
        session.modified = True
    return jsonify({'success': True, 'cart': session.get('cart', {})})

@app.route('/cart')
def cart():
    cart_items = session.get('cart', {})
    total_price = sum(item['price'] * item['quantity'] for item in cart_items.values())
    total_price = round(total_price, 2)
    cart_list = [
        {'name': name, 'price': details['price'], 'quantity': details['quantity']}
        for name, details in cart_items.items()
    ]
    return render_template('/homepage/Cart.html', cart_items = cart_list, total_price = total_price)

@app.route('/login', methods = ['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password_candidate = request.form['password']

        cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
        cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
        user = cursor.fetchone()

        if user and bcrypt.check_password_hash(user['password'], password_candidate):
            session['loggedin'] = True
            session['email'] = user['email']
            flash('Login successful!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Incorrect e-mail or password.', 'danger')
    return render_template('/homepage/UserLogin.html')

@app.route('/register', methods = ['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        if password != confirm_password:
            flash('Password does not match, please try again.', 'danger')
            return redirect(url_for('register'))
        
        # Uses encoding of 8-bit code unit due to more security and to save memory.
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        cursor = mysql.connection.cursor()
        cursor.execute('INSERT INTO users (email, password) VALUES (%s, %s)', (email, hashed_password))
        mysql.connection.commit()
        cursor.close()
        flash('Registration successful! Proceed to log in.', 'success')
        return redirect(url_for('login'))
    return render_template('/homepage/UserRegister.html')

@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('email', None)
    flash('You have been loged out.', 'info')
    return redirect(url_for('home'))

@app.route('/checkout', methods = ['GET', 'POST'])
def checkout():
    if request.method == 'POST':
        shipping_address = request.form.get('shipping_address')
        city = request.form.get('city')
        state = request.form.get('state')
        postcode = request.form.get('postcode')
        phone = request.form.get('phone')
        cart = session.get('cart', {})
        total_price = sum(item['price'] * item['quantity'] for item in cart.values())
        
        # Add here the things to save the info of the address and all on to database

        session['cart'] = {}
        session.modified = True

        flash('Order placed successfully!', 'success')
        return redirect(url_for('home'))
    
    cart_items = session.get('cart', {})
    total_price = sum(item['price'] * item['quantity'] for item in cart_items.values())
    total_price = round(total_price, 2)
    return render_template('/homepage/Checkout.html', cart_items = cart_items, total_price = total_price)

if __name__ == '__main__':
    app.run(debug = True)