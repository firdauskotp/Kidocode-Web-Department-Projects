from imports import *
from config import Config

mail = Mail()

admin_blueprint = Blueprint('admin', __name__, url_prefix='/admin')

#AUTHENTICATION
def check_admin(view_func):
    @wraps(view_func)
    def wrapped_view(*args, **kwargs):
        if session.get('admin') != True:
            flash('You must be logged in as an admin to access this page.', 'danger')
            return redirect(url_for('login'))
        
        return view_func(*args, **kwargs)
    
    return wrapped_view

#DASHBOARD DONE
@admin_blueprint.route('/')
@check_admin
def dashboard():
    cust_result = db.session.query(
        func.date_format(User.createdAt, '%Y-%u').label('week_date'),
        func.count(User.userID).label('count'),
        func.sum(func.count(User.userID)).over(order_by=func.date_format(User.createdAt, '%Y-%u')).label('cumulative_count')
    ).group_by(func.date_format(User.createdAt, '%Y-%u')).all()

    custlabels = [r.week_date for r in cust_result]
    custdata = [r.cumulative_count for r in cust_result]

    sale_result = db.session.query(
        Product.productName,
        func.sum(OrderItem.quantity).label('total_quantity')
    ).join(OrderItem, Product.productID == OrderItem.productID) \
     .group_by(Product.productID).all()

    salelabels = [r.productName for r in sale_result]
    saledata = [r.total_quantity for r in sale_result]

    review_result = db.session.query(
        Review.rating,
        func.count(Review.rating).label('rating_count')
    ).filter(Review.rating.isnot(None)).group_by(Review.rating).all()

    reviewlabels = [str(r.rating) for r in review_result]
    reviewdata = [r.rating_count for r in review_result]

    product_count = Product.query.count() #total product catalogue
    review_count = Review.query.count() #total review received
    customer_count = User.query.filter(User.userID.ilike('C%')).count() #total customer registered
    total_item_sold = db.session.query(func.sum(OrderItem.quantity)).scalar() or 0
    total_payment_amount = round(db.session.query(func.sum(Payment.amount)).scalar() or 0, 2)


    return render_template(
        "/admin/dashboard.html",
        product_count=product_count,
        review_count=review_count,
        customer_count=customer_count,
        total_payment_amount=total_payment_amount,
        total_item_sold=total_item_sold,
        custlabels=custlabels,
        custdata=custdata,
        salelabels=salelabels,
        saledata=saledata,
        reviewlabels=reviewlabels,
        reviewdata=reviewdata
    )

#CATEGORY DONE
@admin_blueprint.route('/category', methods=["GET","POST"])
@check_admin
def category():
    search_query = request.args.get('searchCategory', '')

    if search_query:
        subquery = Category.query.with_entities(Category.parentID).filter(
            Category.categoryID.ilike(f'%{search_query}%') |
            Category.name.ilike(f'%{search_query}%'),
            Category.parentID.isnot(None)
        ).distinct()

        categories = Category.query.filter(
            (Category.name.ilike(f'%{search_query}%') &
            Category.parentID.is_(None)) | 
            (Category.categoryID.in_(subquery)) 
        ).all()
    else:
        categories = Category.query.filter_by(parentID=None).all()

    if request.method == 'POST':

        if 'btnadd' in request.form:
            name = request.form['c_name']
            parent = request.form.get('c_type', None)

            try:
                if parent:
                    last_3_words = parent.strip()[-3:].upper()
                    category_count = Category.query.filter_by(parentID=parent).count()
                    first_letter = name[0].upper()

                    ID = f"{last_3_words}{category_count + 1:03d}{first_letter}"
                else:
                    total_category_count =  Category.query.filter_by(parentID=None).count()
                    first_three_letters = name.strip()[:3].upper().ljust(3, 'X')
                    ID = f"K{total_category_count + 1:03d}{first_three_letters}"
                    parent = None    

                new_category = Category(
                    name=name,
                    categoryID=ID,
                    parentID=parent
                )

                db.session.add(new_category)
                db.session.commit()
                flash('New category added.', 'success')
                return redirect(url_for('admin.category'))
            
            except Exception as e:
                flash('New category fail to be added.', 'danger')
                db.session.rollback()

        elif 'btnsave' in request.form:
            saveID = request.form.get('btnsave')
            name = request.form['sc_name']
            if saveID:
                category = Category.query.get_or_404(saveID)
                
                try:
                    if category.parentID is None:  
                        category.name = name
                        category.categoryID = f"{saveID[:4]}{name.strip()[:3].upper()}"
                    else:
                        category.name = name
                        category.categoryID = f"{saveID[:6]}{name[0].upper()}"
                    db.session.commit()
                    flash('Category updated.', 'success')
                    return redirect(url_for('admin.category'))
                except Exception as e:
                    db.session.rollback()
                    flash('Failed updating category.', 'success')
            return "Category ID not provided", 400


        elif 'btndelete' in request.form:
            deleteID = request.form.get('btndelete')
            if deleteID:
                category_to_delete = Category.query.filter_by(categoryID=deleteID).first()
                if category_to_delete:
                    try:
                        Category.query.filter_by(parentID=deleteID).delete()
                        db.session.delete(category_to_delete)
                        db.session.commit()
                        flash('Category deleted.', 'success')
                        return redirect(url_for('admin.category'))
                    except Exception as e:
                        db.session.rollback()
                        flash('Category not deleted.', 'danger')
                        return f"An error occurred while deleting the category: {e}", 500
            return "Category ID not provided", 400

    return render_template("/admin/category.html", main_categories=categories)

#PRODUCT DONE
@admin_blueprint.route('/product', methods=["GET", "POST"])
@check_admin
def product():
    search_query = request.args.get('searchProduct', '')  
    filter_status = request.args.get('filter', 'all')
    category_filter = request.args.get('categoryFilter', 'all')

    per_page = 10
    page = request.args.get('page', 1, type=int)

    query = Product.query

    if search_query:
        query = query.filter(
            (Product.productName.ilike(f'%{search_query}%')) | 
            (Product.productID.ilike(f'%{search_query}%'))
        )

    if filter_status == 'active':
        query = query.filter(Product.status == 'active')
    elif filter_status == 'inactive':
        query = query.filter(Product.status == 'inactive')

    if category_filter != 'all':
        query = query.join(Category).filter(Category.parentID == category_filter)

    products = query.paginate(page=page, per_page=per_page, error_out=False)

    if request.method == 'POST':
        if 'btnadd' in request.form:
            try:
                img = request.files['p_img']
                if img:
                    img_filename = secure_filename(img.filename)
                    img_folder = os.path.join('static', 'images')
                    if not os.path.exists(img_folder):
                        os.makedirs(img_folder)
                    img_path = os.path.join('images', img_filename)
                    img.save(os.path.join(img_folder, img_filename))
                else:
                    img_path = None
                
                total_product_count = Product.query.count()
                new_product_id = f"KP{total_product_count + 1:03d}"
                new_product = Product(
                    productID = new_product_id,
                    productName= request.form['p_name'],
                    description= request.form['p_desc'],
                    img = img_path,
                    price= float(request.form['p_price']),
                    stock= int(request.form['p_stock']),
                    categoryID= request.form['p_category']
                )
                db.session.add(new_product)
                db.session.commit()
                flash('New product added.', 'success')
                return redirect(url_for('admin.product'))
            except Exception as e:
                db.session.rollback()
                flash('Failed adding new product.', 'danger')
                return f"An error occurred: {e}"
            
        if 'btndelete' in request.form:
            deleteID = request.form.get('btndelete')
            product = Product.query.get_or_404(deleteID)
            try:
                db.session.delete(product)
                db.session.commit()
                flash('Product deleted successfully.', 'success')
                return redirect(url_for('admin.product'))
            except Exception as e:
                db.session.rollback()
                flash('Failed deleting product.', 'danger')
                return f"An error occurred while deleting the product: {e}", 500

        if 'btnedit' in request.form:
            productID = request.form.get('btnedit')
            product = Product.query.get_or_404(productID) 
            try:
                product.productName = request.form['p_name']
                product.description = request.form['p_desc']
                product.price = float(request.form['p_price'])
                product.stock = int(request.form['p_stock'])
                product.status = 'active' if request.form.get('p_status') == 'active' else 'inactive'
                db.session.commit()
                flash('Product updated successfully.', 'success')
                return redirect(url_for('admin.product'))
            except Exception as e:
                db.session.rollback()
                flash('Failed updating product.', 'danger')
                return f"An error occurred while updating the product: {e}", 500
    
    category = Category.query.filter_by(parentID=None).all()
    all_categories = Category.query.all()
    category_data = {
        "main_categories": [{"id": cat.categoryID, "name": cat.name} for cat in category],
        "all_categories": [{"id": cat.categoryID, "name": cat.name, "parentID": cat.parentID} for cat in all_categories]
    }

    return render_template("/admin/product.html", product=products, category=category, category_data=category_data)

#CUSTOMER
@admin_blueprint.route('/customer', methods=["GET", "POST"])
@check_admin
def customer():
    search_query = request.args.get('searchCust', '')  
    if search_query:
        user = User.query.filter(
            (User.userID.ilike(f'%{search_query}%')) |
            (User.firstName.ilike(f'%{search_query}%')) |
            (User.lastName.ilike(f'%{search_query}%'))
        ).all()  
    else:
        user = User.query.all()

    if request.method == 'POST':
        email = request.form['btnmail']
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
            msg = Message(subject=subject, recipients=[email], body=email_body)
            mail.send(msg)

            flash('Email send successfully.', 'success')
            return redirect(url_for('admin.customer'))

        except Exception as e:
            flash('Failed sending email.', 'danger')
            return redirect(url_for('admin.customer'))
        
    return render_template("/admin/customer.html", user=user)

#ORDER DONE
@admin_blueprint.route('/order', methods=["GET", "POST"])
@check_admin
def order():
    search_query = request.args.get('searchOrder', '')  
    status_filter = request.args.get('statusOrder', '')  
    method_filter = request.args.get('method', '')  

    if search_query:
        orders = Order.query.join(User).filter(
            (Order.orderID == search_query) |
            (Order.userID == search_query) |
            (User.firstName.ilike(f'%{search_query}%')) |
            (User.lastName.ilike(f'%{search_query}%'))
        ).order_by(Order.createdAt.desc()).all()
    elif status_filter != "":
        orders = Order.query.filter(
            Order.status.ilike(f'%{status_filter}%')
        ).order_by(Order.createdAt.desc()).all()
    elif method_filter != "":
        orders = Order.query.filter(
            Order.shippingMethod.ilike(f'%{method_filter}%')
        ).order_by(Order.createdAt.desc()).all()
    else:
        orders = Order.query.order_by(Order.createdAt.desc()).all()

    order_ids = [order.orderID for order in orders]
    orderItems = OrderItem.query.filter(OrderItem.orderID.in_(order_ids)).all()

    if request.method == 'POST':
        ID = request.form.get('btnsave')
        status = request.form.get('status')

        try:
            order = Order.query.get(ID)

            if order:
                order.status = status
                db.session.commit()
                flash('Updated successfully.', 'success')
                return redirect(url_for('admin.order'))
            else:
                flash('Failed to update', 'danger')

        except Exception as e:
            db.session.rollback()
            flash('Failed to update', 'danger')

    return render_template("/admin/order.html", order=orders, order_items=orderItems)

#REVIEW DONE
@admin_blueprint.route('/review', methods=["GET", "POST"])
@check_admin
def review():
    search_query = request.args.get('searchReview', '')
    filter_query = request.args.get('ratingSearch', '') 

    if search_query:
        reviews = Review.query.join(Product).join(User).filter(
            (Review.reviewID == search_query) |
            (Review.productID == search_query) |
            (Review.userID == search_query) |
            (Product.productName.ilike(f'%{search_query}%')) |
            (User.firstName.ilike(f'%{search_query}%')) |
            (User.lastName.ilike(f'%{search_query}%'))
        ).order_by(Review.updatedAt.desc()).all()
    elif filter_query != "":
        reviews = Review.query.filter(
            Review.rating == filter_query
        ).order_by(Review.updatedAt.desc()).all()
    else:
        reviews = Review.query.order_by(Review.updatedAt.desc()).all()

    
    if request.method == 'POST':
        if 'btnsend' in request.form:
                response = request.form['reply']
                id = request.form['btnsend']

                review = Review.query.get_or_404(id)
                        
                try:
                    review.response = response
                    db.session.commit()
                    flash('New reply is successfully sent.', 'success')
                    return redirect(url_for('admin.review'))
                except Exception as e:
                    db.session.rollback()
                    flash('Failed to send a reply.', 'danger')
        
        if 'btndelete' in request.form:
                id = request.form['btndelete']
                review = Review.query.get_or_404(id)
                        
                try:
                    review.response = None
                    db.session.commit()
                    flash('Reply is successfully deleted.', 'success')
                    return redirect(url_for('admin.review'))
                except Exception as e:
                    db.session.rollback()
                    flash('Failed to delete a reply.', 'danger')

    return render_template("/admin/review.html", review=reviews)

#SALE DONE
@admin_blueprint.route('/sale', methods=["GET", "POST"])
@check_admin
def sale():
    search_query = request.args.get('searchPayment', '')
    filter_query = request.args.get('searchStatus', '')  
    if search_query:
        payment = Payment.query.filter(
            (Payment.paymentID == search_query) |
            (Payment.orderID == search_query) |
            (Payment.paymentMethod.ilike(f'%{search_query}%'))
        ).order_by(Payment.createdAt.desc()).all()
    elif filter_query != "":
        payment = Payment.query.filter(
            Payment.status.ilike(f'%{filter_query}%')
        ).order_by(Payment.createdAt.desc()).all()
    else:
        payment = Payment.query.order_by(Payment.createdAt.desc()).all()

    if request.method == 'POST':
        paymentID = request.form.get('btnsave')
        paymentStatus = request.form.get('status')

        try:
            payment = Payment.query.get(paymentID)

            if payment:
                payment.status = paymentStatus
                db.session.commit()
                flash('Updated successfully.', 'success')
                return redirect(url_for('admin.sale'))
            else:
                flash('Failed to update.', 'danger')

        except Exception as e:
            db.session.rollback()
            flash('Failed to update.', 'danger')
        
    return render_template("/admin/sale.html", payment=payment)

#FEEDBACK DONE
@admin_blueprint.route('/feedback', methods=["GET", "POST"])
@check_admin
def feedback():
    search_query = request.args.get('searchFeedback', '')
    statusfilter = request.args.get('statusfilter', 'all')
    severityfilter = request.args.get('severityfilter', 'all')
    typefilter = request.args.get('typefilter', 'all')
    
    query = Feedback.query

    if search_query:
        query = query.filter(
            (Feedback.name.ilike(f'%{search_query}%')) |
            (Feedback.email.ilike(f'%{search_query}%'))
        )
    if typefilter != 'all':
        query = query.filter(Feedback.feedbackType == typefilter)
    if severityfilter != 'all':
        if severityfilter == 'None':
            query = query.filter(Feedback.severity.is_(None))
        else:
            query = query.filter(Feedback.severity == severityfilter)
    if statusfilter != 'all':
        query = query.filter(Feedback.status == statusfilter)

    query = query.order_by(Feedback.createdAt.desc())
    feedback = query.all()

    if request.method == 'POST':
        if 'btnsave' in request.form:
                status = request.form['status']
                severity = request.form['severity']
                id = request.form['btnsave']

                feedback = Feedback.query.get_or_404(id)
                        
                try:
                    feedback.status = status
                    if severity == "None":
                        feedback.severity = None
                    else:
                        feedback.severity = severity
                    db.session.commit()
                    flash('Updated successfully.', 'success')
                    return redirect(url_for('admin.feedback'))
                except Exception as e:
                    db.session.rollback()
                    flash('Failed to update.', 'danger')
                    return f"An error occurred: {e}", 500
                
        if 'btnsend' in request.form:
            response = request.form['reply']
            id = request.form['btnsend']

            feedback = Feedback.query.get_or_404(id)
            email = feedback.email
                    
            try:
                email_body = response
                subject = "Thank You for your feedback!"
                msg = Message(subject=subject, recipients=[email], body=email_body)
                mail.send(msg)
                feedback.response = response
                db.session.commit()
                flash('Feedback reply sent successfully.', 'success')
                return redirect(url_for('admin.feedback'))
            except Exception as e:
                db.session.rollback()
                flash('Feedback failed to send.', 'danger')

    return render_template("/admin/feedback.html", feedback=feedback)

@admin_blueprint.route('/branch', methods=["GET", "POST"])
@check_admin
def branch():
    search_query = request.args.get('searchBranch', '')
    if search_query:
        branches = Branch.query.filter(
            (Branch.branchID.ilike(f'%{search_query}%')) |
            (Branch.name.ilike(f'%{search_query}%'))
        ).all()
    else:
        branches = Branch.query.all()
        
    if request.method == 'POST':
        if 'btnadd' in request.form:
            try:
                new_branch = Branch(
                    branchID=request.form['b_id'],
                    name=request.form['b_name'],
                    address=request.form['b_address'],
                    operating_hours=request.form['b_hour'],
                    link=request.form['b_link']
                )
                db.session.add(new_branch)
                db.session.commit()
                flash('New branch added.', 'success')
            except Exception as e:
                db.session.rollback()
                flash(f'Failed to add branch: {str(e)}', 'danger')
            return redirect(url_for('admin.branch'))

        if 'btndelete' in request.form:
            deleteID = request.form.get('btndelete')
            try:
                branch = Branch.query.get_or_404(deleteID)
                db.session.delete(branch)
                db.session.commit()
                flash('Branch deleted successfully.', 'success')
            except Exception as e:
                db.session.rollback()
                flash(f'Failed to delete branch: {str(e)}', 'danger')
            return redirect(url_for('admin.branch'))

        if 'btnsave' in request.form:
            print(request.form)
            ID = request.form.get('btnsave')
            try:
                branch = Branch.query.get_or_404(ID)
                branch.name = request.form['b_name']
                branch.address = request.form['b_address']
                branch.operating_hours = request.form['b_hour']
                branch.link = request.form['b_link']
                db.session.commit()
                flash('Branch updated successfully.', 'success')
            except Exception as e:
                db.session.rollback()
                flash(f'Failed to update branch: {str(e)}', 'danger')
            return redirect(url_for('admin.branch'))
    
    return render_template("/admin/branch.html", branch=branches)

