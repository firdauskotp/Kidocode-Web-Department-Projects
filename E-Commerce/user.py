from imports import *
from config import Config

user_blueprint = Blueprint('user', __name__, url_prefix='/user')

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not session.get('loggedin'):
            flash('You need to sign in first.', 'warning')
            return redirect(url_for('login'))
        return f(*args, **kwargs)
    return decorated_function

@user_blueprint.route('/session-check', methods=['GET'])
def session_check():
    return jsonify({'logged_in': session.get('loggedin', False), 'user_id': session.get('userID')})

@user_blueprint.route('/')
@login_required
def homepage():
    user_id = session.get('user_id')
    user = User.query.get(user_id) if user_id else None
    
    products = Product.query.all()
    random_products = random.sample(products, min(len(products), 9))
    reviews = Review.query.filter_by(rating=5).all()
    
    print(f"UserID: {user_id}")

    if 'cart' not in session:
        session['cart'] = {}

    return render_template('/homepage/HomePage.html', product = random_products, review = reviews, user = user)

@user_blueprint.route('/myprofile', methods=['GET', 'POST'])
@login_required
def profile():
    products = Product.query.all()
    random_products = random.sample(products, min(len(products), 9))

    user_id = session.get('user_id')
    user = User.query.get(user_id) if user_id else None

    if request.method == 'POST':
        first_name = request.form.get('p_fname')
        last_name = request.form.get('p_lname')
        password = request.form.get('password')  # Optionally allow password change
        confirm_password = request.form.get('confirm_password')
        
        try:
            if first_name and last_name:
                user.firstName = first_name
                user.lastName = last_name
                flash("Your name has been updated successfully!", "success")

            if password:  # Update password if provided
                if password != confirm_password:
                    flash("Passwords do not match!", "danger")
                    return redirect(url_for('user.profile'))
                
                user.password = bcrypt.generate_password_hash(password).decode('utf-8')
                flash("Your password has been updated successfully!", "success")

            db.session.commit()

            return redirect(url_for('user.profile'))
        
        except Exception as e:
            db.session.rollback()
            flash("An error occurred. Please try again.", "danger")
            print(f"Error updating profile: {e}")

    return render_template('/user/profile.html', user = user, user_id = user_id, product = random_products)

@user_blueprint.route('/purchases', methods=['GET'])
@login_required
def purchases():
    products = Product.query.all()
    random_products = random.sample(products, min(len(products), 9))

    user_id = session.get('user_id')
    user = User.query.get(user_id) if user_id else None

    status_filter = request.args.get('status', 'all')

    print(f"UserID: {user_id}, Status Filter: {status_filter}")

    if status_filter == 'all':
        orders = Order.query.filter_by(userID = user_id).order_by(Order.createdAt.desc()).all()
    else:
        orders = Order.query.filter_by(userID = user_id, status = status_filter).order_by(Order.createdAt.desc()).all()
    
    for order in orders:
        order.serialized_items = [item.serialize() for item in order.order_items.all()]
        
        # Check if all items in the order have been reviewed
        order_items = order.order_items.all()
        reviewed_items = Review.query.filter(
            Review.productID.in_([item.productID for item in order_items]),
            Review.userID == user_id
        ).all()

        # If all items are reviewed, mark the order as fully reviewed
        order.all_items_reviewed = len(reviewed_items) == len(order_items)
    
    print(f"Orders fetched: {orders}")

    return render_template('/user/purchase.html', user = user, orders = orders, product = random_products)

@user_blueprint.route('/myreview', methods=['GET'])
@login_required
def myreview():
    user_id = session.get('user_id')
    user = User.query.get(user_id) if user_id else None

    reviews = Review.query.filter(Review.userID == user_id).all()

    return render_template('/reviews.html', user = user, reviews = reviews)

@user_blueprint.route('/submit-review/<string:order_id>', methods=['POST'])
@login_required
def submit_review(order_id):
    try:
        user_id = session.get('user_id')
        
        if not user_id:
            return jsonify({'success': False, 'message': 'User not authenticated.'}), 401

        # Verify order belongs to the user
        order = Order.query.filter_by(orderID=order_id, userID=user_id).first()

        if not order:
            return jsonify({'success': False, 'message': 'Order not found or unauthorized.'}), 404

        data = request.json
        reviews = data.get('reviews', [])

        if not reviews:
            return jsonify({'success': False, 'message': 'No reviews provided'}), 400

        for review in reviews:
            product_id = review.get('productID')
            rating = review.get('rating')
            comment = review.get('comment')

            if not product_id or not rating:
                continue

            if not any(item.productID == product_id for item in order.order_items):
                continue

            new_review = Review(
                productID=product_id,
                userID=user_id,
                rating=int(rating),
                comment=comment
            )
            db.session.add(new_review)

        db.session.commit()

        return jsonify({'success': True, 'message': 'Reviews submitted successfully!'})

    except Exception as e:
        print(f"Error in submit_review: {e}")

        return jsonify({'success': False, 'message': 'An error occurred while submitting reviews.'}), 500

@user_blueprint.route('confirm-order/<string:order_id>', methods=['POST'])
@login_required
def confirm_order(order_id):
    try:
        order = Order.query.filter_by(orderID=order_id, userID=session.get('user_id')).first()

        if not order:
            flash("Order not found or you are not authorized to update this order.", "danger")
            return redirect(url_for('user.purchases'))
        
        order.status = 'completed'
        db.session.commit()

        flash(f"Your order '{order_id}' is completed!", "success")
    except Exception as e:
        flash("An error occurred while updating the order status.", "danger")
        print(f"Error in confirm_order: {e}")

    return redirect(url_for('user.purchases'))

@user_blueprint.route('/cancel-order/<string:order_id>', methods=['POST'])
@login_required
def cancel_order(order_id):
    try:
        order = Order.query.filter_by(orderID=order_id, userID=session.get('user_id')).first()

        if not order:
            flash("Order not found or you are not authorized to cancel this order.", "danger")
            return redirect(url_for('user.purchases'))
        
        is_refund = 'refund' in request.form

        if is_refund and order.status == 'completed':
            order.status = 'cancelled'
            order.shippingMethod = 'REFUND'
            flash(f"Request of refund on order '{order_id}' has been sent.", "success")
        elif not is_refund and order.status in ['pending', 'processing']:
            order.status = 'cancelled'
            flash(f"Your order '{order_id}' has been cancelled.", "success")
        else:
            flash("Refund can only be requested for orders with 'Completed' status.", "warning")
            return redirect(url_for('user.purchases'))

        db.session.commit()

    except Exception as e:
        flash("An error occurred while processing your request.", "danger")
        print(f"Error in cancel_order: {e}")

    return redirect(url_for('user.purchases'))

@user_blueprint.route('/add-to-cart', methods=['POST'])
@login_required
def add_to_cart():
    product_data = request.get_json().get('product')
    product_name = product_data.get('name')

    if not product_name:
        return jsonify({'success': False, 'message': 'Invalid product name.'}), 400

    product = Product.query.filter_by(name=product_name).first()

    if not product:
        return jsonify({'success': False, 'message': 'Product not found.'}), 404

    if 'cart' not in session:
        session['cart'] = {}

    if product_name in session['cart']:
        session['cart'][product_name]['quantity'] += 1
    else:
        session['cart'][product_name] = {
            'price': float(product.price),
            'image': product.img,
            'quantity': 1
        }

    session.modified = True
    return jsonify({'success': True, 'cart': session['cart']})

@user_blueprint.route('/get-cart', methods=['GET'])
def get_cart():
    cart = session.get('cart', {})

    return jsonify(cart)

@user_blueprint.route('/cart')
def cart():
    user_id = session.get('user_id')
    user = User.query.get(user_id) if user_id else None

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

    return render_template('/homepage/Cart.html', user = user, cart_items = cart_list, total_price = total_price)

@user_blueprint.route('/remove-from-cart', methods=['POST'])
def remove_from_cart():
    product_name = request.get_json().get('name')

    if 'cart' in session and product_name in session['cart']:
        del session['cart'][product_name]
        session.modified = True

    return jsonify({'success': True, 'cart': session.get('cart', {})})

@user_blueprint.route('/checkout', methods=['GET', 'POST'])
@login_required
def checkout():
    branch = Branch.query.all()

    cart_items = session.get('cart', {})
    total_price = sum(item['price'] * item['quantity'] for item in cart_items.values())

    if request.method == 'POST':
        #shipping_address = request.form.get('shipping_address')
        if 'pickupPay' in request.form:
            deliverycharge = 0
            pickup_location = request.form.get('pickup-location')
            method = request.form.get('deliveryMethod')

            user = User.query.filter_by(email = session['email']).first()
            if not user:
                flash('User not found. Please log in again.', 'danger')
                return redirect(url_for('login'))
            

            order_id = generateOrderID()

            session['orderID'] = order_id

            order = Order(
                orderID = order_id,
                userID = user.userID,
                totalAmount = total_price,
                shippingMethod = method,
                dropLocation = pickup_location
            )

            payment = Payment(
                orderID = order_id,
                amount = total_price + deliverycharge,
                deliveryCharge = deliverycharge,
                paymentMethod = None
            )

            db.session.add(order)
            db.session.add(payment)
            db.session.commit()

            for name, details in cart_items.items():
                
                product = Product.query.filter_by(productName = name).first()
                
                if not product:
                    flash(f"Product '{name}' not found.", 'danger')
                    return redirect(url_for('user.checkout'))
                
                order_item = OrderItem(orderID = order.orderID, productID = product.productID, quantity = details['quantity'], price = details['price'])
                db.session.add(order_item)

            db.session.commit()

            session['cart'] = {}
            session.modified = True

            return redirect(url_for('user.payment'))

    return render_template('checkout.html', is_logged_in = True, cart_items = cart_items, total_price = total_price, branch = branch)

#checked
@user_blueprint.route('/payment', methods=['GET', 'POST'])
def payment():
    order = Order.query.filter_by(orderID=session.get('orderID')).first()
    orderItems = OrderItem.query.filter_by(orderID=order.orderID).all()
    payment = Payment.query.filter_by(orderID=order.orderID).first()

    if request.method == 'POST':
        if 'btnpay' in request.form:
            method = request.form.get('p_method')
            session['payment_method'] = method
            if method == "Card":
                try:
                    total_amount_in_sen = int(order.totalAmount * 100)
                    checkout_session = stripe.checkout.Session.create(
                        payment_method_types=['card'],
                        line_items=[
                            {
                                'price_data': {
                                    'currency': 'myr',
                                    'product_data': {
                                        'name': 'Total Order Amount',
                                    },
                                    'unit_amount': total_amount_in_sen,  # Amount in cents ($50.00)
                                },
                                'quantity': 1,
                            },
                        ],
                        mode='payment',
                        success_url=url_for('user.success', _external=True),
                        cancel_url=url_for('user.cancel', _external=True),
                    )

                    return redirect(checkout_session.url, code=303)

                except Exception as e:
                    return str(e)
                
            elif method == "Cash":
                return redirect(url_for('user.success')) 
             
    return render_template('payment.html', order = order, order_items = orderItems, payment=payment, public_key = Config.STRIPE_PK)

@user_blueprint.route('/success', methods=['GET', 'POST'])
def success():
    user_id = session.get('user_id')
    user = User.query.get(user_id) if user_id else None

    order = Order.query.filter_by(orderID=session.get('orderID')).first()
    orderItems = OrderItem.query.filter_by(orderID=order.orderID).all()
    payment = Payment.query.filter_by(orderID=order.orderID).first()

    if payment and order:
        payment.paymentMethod = session.get('payment_method')
        payment.status = "Received"
        db.session.commit()
        flash("Payment successful!", "success")
    else:
        flash("Order or payment record not found!", "error")

    
    if request.method == 'POST':
        if 'btnBack' in request.form:
            session.pop('payment_method', None)
            session.pop('orderID', None)
            return redirect(url_for('user.homepage'))

    return render_template('thanks.html', user = user, order = order, order_items = orderItems, payment = payment)

@user_blueprint.route('/cancel', methods=['GET', 'POST'])
def cancel():
    user_id = session.get('user_id')
    user = User.query.get(user_id) if user_id else None

    flash("Order canclled!", "danger")

    return redirect(url_for('home', user = user))

#to generate orderID
def generateOrderID():
    prefix = "KSHOP"
    generate = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    return prefix + generate

@user_blueprint.route('/logout')
def logout():
    if session.get('loggedin'):
        session.clear()
        session.pop('user_id', None)

        flash('You have been signed out.', 'info')

        return redirect(url_for('home'))
