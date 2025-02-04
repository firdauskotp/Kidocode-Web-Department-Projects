from imports import *
from config import Config

app = Flask(__name__)

from user import user_blueprint
from admin import admin_blueprint

app.register_blueprint(user_blueprint)
app.register_blueprint(admin_blueprint)

app.config.from_object(Config)

bcrypt = Bcrypt(app)
mail = Mail(app)
db.init_app(app)

app.logger.addHandler(app.config['LOGGING_HANDLER'])

@app.errorhandler(404)
def not_found_error(error):
    return jsonify({'success': False, 'message': 'Resource not found'}), 404

@app.route('/session-check', methods=['GET'])
def session_check():
    return jsonify({'logged_in': session.get('loggedin', False)})

@app.route('/')
def home():
    products = Product.query.all()
    random_products = random.sample(products, min(len(products), 9))
    reviews = Review.query.filter_by(rating=5).all()

    user_id = session.get('user_id')
    user = None

    if user_id:
        user = User.query.get(user_id)
        return redirect(url_for('user.homepage'))

    if 'cart' not in session:
        session['cart'] = {}

    return render_template('/homepage/HomePage.html', user = user, product = random_products, review = reviews)

@app.route('/allproducts')
def all_products():
    user_id = session.get('user_id')
    user = User.query.get(user_id) if user_id else None

    products = Product.query.all()
    categories = Category.query.all()

    if 'cart' not in session:
        session['cart'] = {}
        
    return render_template('/homepage/AllProducts.html', user = user, products = products, category = categories)

@app.route('/categories', methods=['GET'])
def get_categories():
    # Fetch all categories from the database
    categories = Category.query.all()

    # Debug log to ensure categories are fetched
    print(f"Categories fetched: {categories}")

    # Initialize a dictionary to organize categories
    category_dict = {}

    for category in categories:
        if category.parentID:  # Subcategory
            # Add the subcategory under its parent in the dictionary
            if category.parentID not in category_dict:
                # If the parent category doesn't exist, create a placeholder
                category_dict[category.parentID] = {'name': 'Unknown', 'subcategories': []}
            # Append the subcategory to the parent's list
            category_dict[category.parentID]['subcategories'].append({
                'id': category.categoryID,
                'name': category.name
            })
        else:  # Main category
            # Initialize the main category in the dictionary
            if category.categoryID not in category_dict:
                category_dict[category.categoryID] = {'name': category.name, 'subcategories': []}
            else:
                category_dict[category.categoryID]['name'] = category.name

    # Build a structured list for response
    category_list = []
    for categoryID, cat_data in category_dict.items():
        # Only include main categories in the top-level list
        if not any(cat['id'] == categoryID for cat in category_dict.get(categoryID, {}).get('subcategories', [])):
            category_list.append({
                'id': categoryID,
                'name': cat_data['name'],
                'subcategories': cat_data['subcategories']
            })

    # Debug log to verify the response structure
    print(f"Returning categories: {category_list}")

    return jsonify({'success': True, 'categories': category_list})

@app.route('/products', methods=['GET'])
def get_products():
    categoryID = request.args.get('category_id')
    subcategoryID = request.args.get('subcategory_id')

    # Start building the query
    query = Product.query

    # Filter by category ID (if provided)
    if categoryID and categoryID != 'all':
        query = query.filter(Product.categoryID == categoryID)

    # Filter by subcategory ID (if provided)
    if subcategoryID:
        query = query.filter(Product.categoryID == subcategoryID)

    # Filter out inactive products
    query = query.filter(Product.status == 'active')

    # Fetch products
    products = query.all()

    # Serialize product data
    product_list = [{
        'id': product.productID,
        'name': product.productName,
        'description': product.description,
        'price': product.price,
        'stock': product.stock,
        'image': url_for('static', filename=product.img.replace('\\', '/')) if product.img else None,
        'category_id': product.categoryID,
        'status': product.status
    } for product in products]

    return jsonify({'success': True, 'products': product_list})

@app.route('/product/<string:product_id>', methods = ['GET'])
def get_product_details(product_id):
    product = Product.query.get_or_404(product_id)

    reviews = [
        {
            'user': f"{review.user.firstName} {review.user.lastName}",
            'rating': review.rating,
            'comment': review.comment,
            'created_at': review.createdAt.strftime('%d %b %Y')
        }
        for review in product.reviews
    ]

    product_details = {
        'id': product.productID, 'name': product.productName,
        'price': float(product.price),
        'image': url_for('static', filename=product.img.replace('\\', '/')) if product.img else None,
        'description': product.description,
        'quantity': product.stock,
        'category': product.categoryID,
        'reviews': reviews
    }
    
    return jsonify({'success': True, 'product': product_details})

@app.route('/get-cart', methods = ['GET'])
def get_cart():
    cart = session.get('cart', {})
    
    return jsonify(cart)

@app.route('/cart')
def cart():
    if session.get('loggedin'):
            return redirect(url_for('user.cart'))
    
    cart_items = session.get('cart', {})
    total_price = sum(item['price'] * item['quantity'] for item in cart_items.values())
    total_price = round(total_price, 2)
    cart_list = [
        {'name': name,
        'price': details['price'],
        'quantity': details['quantity'],
        'image': details.get('img', '/static/images/gambar.jpg')}
        for name, details in cart_items.items()
    ]
    
    return render_template('/homepage/Cart.html', cart_items = cart_list, total_price = total_price)

@app.route('/add-to-cart', methods = ['POST'])
def add_to_cart():
    try:
        product_data = request.get_json()
        if not product_data or 'product' not in product_data:
            return jsonify({'success': False, 'message': 'Invalid payload.'}), 400

        product = product_data['product']
        product_name = product.get('name')
        
        if not product_name:
            return jsonify({'success': False, 'message': 'Invalid product name.'}), 400
        
        product_record = Product.query.filter_by(productName = product_name).first()
        if not product_record:
            return jsonify({'success': False, 'message': 'Product not found.'}), 404

        if 'cart' not in session:
            session['cart'] = {}

        if product_name in session['cart']:
            session['cart'][product_name]['quantity'] += 1
        else:
            session['cart'][product_name] = {
                'price': float(product_record.price),
                'image': product_record.img,
                'quantity': 1
            }

        session.modified = True
        return jsonify({'success': True, 'cart': session['cart']})
    
    except Exception as e:
        return jsonify({'success': False, 'message': f"Error: {str(e)}"}), 500

@app.route('/remove-from-cart', methods = ['POST'])
def remove_from_cart():
    product_name = request.get_json().get('name')
    if 'cart' in session and product_name in session['cart']:
        del session['cart'][product_name]
        session.modified = True
    return jsonify({'success': True, 'cart': session.get('cart', {})})

@app.route('/checkout', methods=['GET', 'POST'])
def checkout():
    # Check if the user is logged in
    if session.get('loggedin'):
        return redirect(url_for('user.checkout'))

    if request.method == 'POST':
        # Process login form
        email = request.form.get('email')
        password = request.form.get('password')
        user = User.query.filter_by(email = email).first()

        if user and bcrypt.check_password_hash(user.password, password):
            # Set user session
            session['loggedin'] = True
            session['email'] = user.email
            session['first_name'] = user.firstName
            return redirect(url_for('user.checkout'))
        else:
            flash('Invalid email or password. Please try again.', 'danger')

    # Render login form on checkout.html for guests
    return render_template('checkout.html', cart_items = session.get('cart', {}), total_price = sum(item['price'] * item['quantity'] for item in session.get('cart', {}).values()), is_logged_in = False)

@app.route('/trackorder', methods=['GET', 'POST'])
def trackOrder():
    user_id = session.get('user_id')
    user = User.query.get(user_id) if user_id else None

    order_details = []

    products = Product.query.all()
    random_products = random.sample(products, min(len(products), 9))

    if request.method == 'POST':
        order_ids = request.form.get('order_ids').split(',')
        order_ids = [order_id.strip() for order_id in order_ids if order_id.strip()]

        if order_ids:
            if user_id:
                orders = Order.query.filter(Order.orderID.in_(order_ids), Order.userID == user_id).all()
            else:
                orders = Order.query.filter(Order.orderID.in_(order_ids)).all()

            if not orders:
                flash('No orders found for the provided Order IDs.', 'danger')
            else:
                for order in orders:
                    items = OrderItem.query.filter_by(orderID = order.orderID).all()
                    order_details.append({'order': order, 'items': items})
            
            session.pop('order_ids', None)
            
        else:
            flash('Please provide at least one valid Order ID.', 'warning')
    
    elif user_id:
        orders = Order.query.filter_by(userID=user_id).all()
        for order in orders:
            items = list(order.order_items)
            order_details.append({'order': order, 'items': items})
    
    if not order_details:
        session.pop('order_ids', None)

    return render_template('/homepage/TrackOrder.html', user = user, order_details = order_details, product = random_products)

@app.route('/feedbackform', methods=['GET', 'POST'])
def feedbackform():
    if request.method == 'POST':
        if 'btnsend' in request.form:
            feedback_type = request.form['f_type']

            firstLetter = feedback_type.strip()[:1].upper()
            count = Feedback.query.filter_by(type=feedback_type).count()
            ID = f"{firstLetter}{count + 1:03d}"
            try:
                sendfeedback = Feedback(
                    feedbackID = ID,
                    name = request.form['f_name'],
                    email = request.form['f_email'],
                    type = feedback_type,
                    text = request.form['f_text']
                )

                db.session.add(sendfeedback)

                db.session.commit()

                flash('Your feedback is sent!', 'success')
                return redirect(url_for('feedbackform'))
            
            except Exception as e:
                db.session.rollback()
                flash('Your feedback has failed to sent!', 'danger')
                return f"An error occurred: {e}"
    
    return render_template('home')

@app.route('/contact')
def contact_us():
    user_id = session.get('user_id')
    user = User.query.get(user_id) if user_id else None
    
    return render_template('contactUs.html', user = user)

@app.route('/helpform', methods=['GET', 'POST'])
def helpform():
    user_id = session.get('user_id')
    user = User.query.get(user_id) if user_id else None

    products = Product.query.all()
    random_products = random.sample(products, min(len(products), 9))

    if request.method == 'POST':
        name = request.form.get('h_name')
        email = request.form.get('h_email')
        subject = request.form.get('h_subject')
        message = request.form.get('h_message')

        if not all([name, email, subject, message]):
            flash('All fields are required.', 'warning')
            return redirect(url_for('helpform'))
        
        h_id = str(uuid.uuid4())[:8].upper()

        # Send email to shop's address
        try:
            # Send email to shop
            shop_msg = Message(
                subject=f"Help Request: {subject} ({h_id})",
                sender=(name, email),
                recipients=['Kidocode Shop Support', 'nurulizzatihayat@gmail.com']
            )
            shop_msg.body = f"""
            Help ID: {h_id}
            Name: {name}
            Email: {email}
            
            Message:
            {message}
            """
            mail.send(shop_msg)

            # Send confirmation email to user
            user_msg = Message(
                subject="Kidocode Shop Help Request Received",
                sender=('Kidocode Shop Support', 'shop-noreply@kidocode.com'),
                recipients=[email]
            )
            user_msg.body = f"""
            Hi {name},

            Your Help Requset ID: {h_id}

            Thank you for reaching out to us. We have received your help request and will get back to you as soon as possible.

            Here's a copy of your message:
            Subject: {subject}
            Name: {name}
            Message:
            {message}

            Best regards,
            Shop Support Team
            """
            mail.send(user_msg)

            flash('Your message has been sent. A confirmation email has been sent to your email address.', 'success')
        except Exception as e:
            flash('There was an error sending your message. Please try again later.', 'danger')
            print(f"Error: {e}")

        return redirect(url_for('helpform'))
    
    return render_template('/user/help.html', user = user, product = random_products)

@app.route('/info')
def info():
    user_id = session.get('user_id')
    user = User.query.get(user_id) if user_id else None
    section = request.args.get('section')
    return render_template('info.html', user = user, section = section)

@app.route('/credits')
def credits():
    user_id = session.get('user_id')
    user = User.query.get(user_id) if user_id else None
    return render_template('credits.html', user = user)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password_candidate = request.form['password']

        user = User.query.filter_by(email=email).first()

        if user and bcrypt.check_password_hash(user.password, password_candidate):
            app.logger.info(f'Successful login attempt for {email}')
            if user.userID.startswith('A'):
                session['admin'] = True
                session['loggedin'] = True
                session['email'] = user.email
                session['user_id'] = user.userID
                session['first_name'] = user.firstName
                return redirect(url_for('admin.dashboard'))
            else:
                session['loggedin'] = True
                session['email'] = user.email
                session['user_id'] = user.userID
                session['first_name'] = user.firstName
                next_url = request.args.get('next') or url_for('user.homepage')
                return redirect(next_url)
        else:
            ip_address = request.remote_addr
            user_agent = request.user_agent.string
            app.logger.warning(f'Failed login attempt for {email} from IP {ip_address} using {user_agent}')

            flash('Invalid email or password. Please try again.', 'danger')
            
            return redirect(url_for('login'))
    
    return render_template('signIn.html')

@app.route('/register', methods = ['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        firstName = request.form['first_name']
        password = request.form['password']
        confirm_password = request.form['confirm_password']

        if password != confirm_password:
            flash('Password does not match, please try again.', 'danger')
            return redirect(url_for('register'))
        
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

        userCount = User.query.count()
        newID = f"C{userCount + 1:03d}"
        new_user = User(
            userID = newID,
            firstName = firstName,
            email = email, 
            password = hashed_password)

        try:
            db.session.add(new_user)
            db.session.commit()
            session['loggedin'] = True
            session['userID'] = new_user.userID
            session['email'] = new_user.email
            session['first_name'] = new_user.firstName
            flash('Registration successful! You are now logged in.', 'success')
            return redirect(url_for('user.homepage'))
        
        except Exception as e:
            db.session.rollback()

            flash(f'An error occurred: {str(e)}', 'danger')
            return redirect(url_for('register'))

    return render_template('signUp.html')

@app.route('/forgotpwd', methods = ['GET', 'POST'])
def forgotpass():
    if request.method == 'POST':
        email = request.form['getemail']

        serializer = URLSafeTimedSerializer(Config.SECRET_KEY)
        token = serializer.dumps(email, salt='password-reset-salt')

        reset_url = f"http://127.0.0.1:5000/resetpwd/{token}"
        malaysia_tz = pytz.timezone('Asia/Kuala_Lumpur')
        timestamp = datetime.now(pytz.utc).astimezone(malaysia_tz).strftime('%Y/%m/%d %H:%M GMT')
        try:
            with open("templates/txt/reset-pwd.txt", "r") as file:
                email_body = file.read()
                email_body = email_body.replace("{{ url }}", reset_url)
                email_body = email_body.replace("{{ timestamp }}", timestamp)

            subject = "Password Reset Request"
            msg = Message(subject = subject, recipients=[email], body = email_body)
            mail.send(msg)

            flash(f'An email has been sent to your inbox. Follow the instructions to reset your password. Click this link to <a href="{url_for("login")}" class="alert-link">Login</a>', 'success')

        except Exception as e:
            flash(f"An error occurred while sending the email: {e}", 'danger')
            return redirect(url_for('forgotpass'))
        
    return render_template('forgot-pass.html')

@app.route('/resetpwd/<token>', methods=['GET', 'POST'])
def resetpwd(token):
    try:
        serializer = URLSafeTimedSerializer(Config.SECRET_KEY)
        email = serializer.loads(token, salt = 'password-reset-salt', max_age = 3600)

        if request.method == 'POST':
            password = request.form['password']
            confirm_password = request.form['confirm_password']
            
            if password != confirm_password:
                flash('Passwords do not match, please try again.', 'danger')
                return redirect(url_for('resetpwd', token = token))
            
            hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
            user = db.session.query(User).filter_by(email=email).first()

            if user:
                user.password = hashed_password
                try:
                    db.session.commit()
                    flash('Your password has been updated successfully!', 'success')
                    return redirect(url_for('login'))
                except Exception as e:
                    db.session.rollback()
                    flash(f'An error occurred: {str(e)}', 'danger')
                    return redirect(url_for('resetpwd', token = token))
            else:
                flash('User not found.', 'danger')
                return redirect(url_for('resetpwd', token = token))

    except Exception as e:
        flash('The reset link is invalid or has expired.', 'danger')
        return redirect(url_for('forgotpass'))

    return render_template('reset-pass.html', token = token)

@app.route('/logout')
def logout():
    if session.get('loggedin'):
        session.clear()
        session.pop('user_id', None)

        flash('You have been signed out.', 'info')
        return redirect(url_for('home'))

if __name__ == "__main__":
    app.run('0.0.0.0', port=5000 , debug=True)
