document.addEventListener('DOMContentLoaded', () => {
    // Check for the existence of the category accordion before initializing
    if (document.getElementById('categoryAccordion')) {
        fetchAndRenderCategories();
    } else {
        console.warn('Category accordion not found on this page.');
    }

    // Initialize cart-related functionality only if cart elements exist
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        fetch('/get-cart')
            .then(response => response.json())
            .then(cart => {
                updateCartCount(cart);
                updateCartItems(cart);
            })
            .catch(error => console.error('Error fetching cart:', error));
    } else {
        console.warn('Cart count element not found in the DOM.');
    }

    // Attach event listeners to all "Add to cart" buttons
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.stopPropagation();
            const name = button.dataset.name;
            const price = parseFloat(button.dataset.price);
            const image = button.dataset.img;

            // Call the addToCart function with the product details
            addToCart({ name, price, image });
        });
    });

    const productCards = document.querySelectorAll('.card-wrapper');
    productCards.forEach(card => {
        card.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = card.dataset.productId;
            const context = card.dataset.context || 'main';
            const endpoint = context === 'user' ? `user/product/${productId}` : `/product/${productId}`;
            if (!productId) {
                console.error('Product ID is undefined. Check the data-product-id attribute in your HTML.');
                return;
            }
            fetch(endpoint)
                .then(response => response.json())
                .then(data => {
                    if(data.success){
                        console.log('Product details fetched:', data.product);
                        showProductModal(data.product);
                    } else {
                        alert(data.message || 'Failed to fetch product details.');
                    }
                })
                .catch(error => {
                    console.error('Error fetch product details:', error);
                });
        });
    });
});

// Function to handle adding to the cart
function addToCart(product, endpoint = '/add-to-cart'){
    console.log(`Adding ${product.name} to cart at RM${product.price}`);

    // Send the product to the server using Fetch API
    fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ product }),
    })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                console.log('Product successfully added to cart:', data.cart);
                updateCartCount(data.cart);
                updateCartItems(data.cart);
                showCartToast('Cart Updated', `${product.name} has been added to your cart!`);
            } else{
                alert('Failed to add the product to the cart.');
            }
        })
        .catch(error => {
            console.error('Error adding product to cart:', error);
        });
}

// Function to update the cart count in the UI
function updateCartCount(cart){
    console.log('Updating cart count...');
    const cartCountElement = document.getElementById('cart-count');
    if(!cartCountElement){
        console.warn(`Cart count element not found in the DOM.`);
        return;
    }

    console.log('Cart element found, updating count.');
    if(!cart || Object.keys(cart).length === 0){
        cartCountElement.textContent = 0;
        return;
    }
    const count = cart ? Object.values(cart).reduce((total, item) => total + item.quantity, 0) : 0;
    cartCountElement.textContent = count;
}


// Function to update cart items in the UI
function updateCartItems(cart){
    const cartItems = document.getElementById('cart-items');
    const cartItemsTable = document.getElementById('cart-items-table');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('btn-checkout');
    const checkoutCartButton = document.getElementById('btn-cartCheckout')
    const viewCartButton = document.getElementById('btn-viewCart');

    let totalPrice = 0;
    let totalPriceTable = 0;

    if (!cartItems) {
        console.warn('Cart items element not found. Skipping cart update.');
        return;
    }

    if(cartItems){
        cartItems.innerHTML = '';

        if(Object.keys(cart).length === 0){
            cartItems.innerHTML = '<li class="list-group-item text-center">Your cart is empty!</li>';
            
            if (checkoutButton) disableCheckoutButton();
            viewCartButton.classList.add('d-none');
        } else {
            for(const [name, { price, quantity, image }] of Object.entries(cart)){
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                listItem.innerHTML = `
                    <img src="${STATIC_BASE_URL}${image}" alt="${name}" class="img-thumbnail" style="width: 60px; height: 60px; object-fit: cover;">
                    <span>${name} (x${quantity})</span>
                    <span>RM${(price * quantity).toFixed(2)}</span>
                `;

                const removeButton = document.createElement('button');
                removeButton.className = 'btn btn-danger btn-sm ms-2';
                removeButton.textContent = 'Remove';
                removeButton.dataset.name = name;
                removeButton.addEventListener('click', () => {
                    removeFromCart(name);
                });

                listItem.appendChild(removeButton);
                cartItems.appendChild(listItem);

                totalPrice += price * quantity;
            }

            if (checkoutButton) enableCheckoutButton();
            viewCartButton.classList.remove('d-none');
        }
    }

    if(cartItemsTable){
        cartItemsTable.innerHTML = ''; // Clear existing content
        
        if(Object.keys(cart).length === 0){
            cartItemsTable.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty!</td></tr>';
            if (checkoutButton) disableCheckoutButton();
        } else {
            if (checkoutButton) enableCheckoutButton();

            for(const [name, { price, quantity }] of Object.entries(cart)){
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${name}</td>
                    <td>RM${price.toFixed(2)}</td>
                    <td>${quantity}</td>
                    <td>RM${(price * quantity).toFixed(2)}</td>
                    <td><button class="btn btn-danger btn-sm remove-from-cart-btn" data-name="${name}">Remove</button></td>
                `;

                const removeButton = row.querySelector('.remove-from-cart-btn');
                removeButton.addEventListener('click', () => {
                    removeFromCart(name);
                });

                cartItemsTable.appendChild(row);

                totalPriceTable += price * quantity;
            }
        }
    }

    if(totalPriceElement){
        totalPriceElement.textContent = `RM${totalPrice.toFixed(2)}`;
        totalPriceElement.textContent = `RM${totalPriceTable.toFixed(2)}`;
    }
}

/*** Function to Disable Checkout Button ***/
function disableCheckoutButton() {
    const checkoutButton = document.getElementById('btn-checkout');
    const checkoutCartButton = document.getElementById('btn-cartCheckout')
    if (checkoutButton && checkoutCartButton) {
        checkoutButton.classList.add('disabled');
        checkoutCartButton.classList.add('disabled');
        checkoutButton.setAttribute('disabled', 'disabled');
        checkoutCartButton.setAttribute('disabled', 'disabled');
    }
}

/*** Function to Enable Checkout Button ***/
function enableCheckoutButton() {
    const checkoutButton = document.getElementById('btn-checkout');
    const checkoutCartButton = document.getElementById('btn-cartCheckout')
    if (checkoutButton && checkoutCartButton) {
        checkoutButton.classList.remove('disabled');
        checkoutCartButton.classList.remove('disabled');
        checkoutButton.removeAttribute('disabled');
        checkoutCartButton.removeAttribute('disabled');
    }
}

function updateCheckoutCart(cart){
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    let totalPrice = 0;
    
    cartItemsElement.innerHTML = '';

    if(Object.keys(cart).length === 0){
        cartItemsElement.innerHTML = '<li class="list-group-item">Your cart is empty!</li>';
    } else {
        for (const [name, { price, quantity, image }] of Object.entries(cart)) {
            const listItem = document.createElement('div');
            listItem.className = 'd-flex justify-content-between mb-2';
            listItem.innerHTML = `
                <div>
                    <img src="${image}" alt="${name}" class="img-thumbnail"
                         style="width: 60px; height: 60px; object-fit: cover;">
                    <span>${name} (x${quantity})</span>
                </div>
                <span>RM${(price * quantity).toFixed(2)}</span>
            `;

            cartItemsElement.appendChild(listItem);
            totalPrice += price * quantity;
        }
    }

    totalPriceElement.textContent = `RM${totalPrice.toFixed(2)}`;
}

// Function to fetch categories and render the list dynamically
function fetchAndRenderCategories() {
    const categoryAccordion = document.getElementById('categoryAccordion'); // Target the updated HTML
    if (!categoryAccordion) {
        console.info('Category accordion is not present on this page.');
    }

    fetch('/categories') // Backend endpoint to fetch categories
        .then(response => response.json())
        .then(data => {
            if (data.success && data.categories) {
                categoryAccordion.innerHTML = ''; // Clear the existing list

                // Add "All Products" button at the top
                const allProductsItem = document.createElement('div');
                allProductsItem.className = 'accordion-item';
                allProductsItem.innerHTML = `
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-category="all">All Products</button>
                    </h2>
                `;
                categoryAccordion.appendChild(allProductsItem);

                // Render main categories with subcategories
                data.categories.forEach(category => {
                    const categoryItem = document.createElement('div');
                    categoryItem.className = 'accordion-item';
                    categoryItem.innerHTML = `
                        <h2 class="accordion-header" id="heading-${category.id}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${category.id}" aria-expanded="false" aria-controls="collapse-${category.id}" data-category="${category.id}">
                                ${category.name}
                            </button>
                        </h2>
                        <div id="collapse-${category.id}" class="accordion-collapse collapse" aria-labelledby="heading-${category.id}" data-bs-parent="#categoryAccordion">
                            <div class="accordion-body">
                                <ul class="list-group subcategory-list" data-parent="${category.id}">
                                    ${category.subcategories.map(sub => `
                                        <li class="list-group-item list-group-item-action" data-category="${sub.id}" data-parent="${category.id}">
                                            ${sub.name}
                                        </li>
                                    `).join('')}
                                </ul>
                            </div>
                        </div>
                    `;
                    categoryAccordion.appendChild(categoryItem);
                });

                // Add event listeners to main categories and subcategories
                categoryAccordion.addEventListener('click', (event) => {
                    const target = event.target;
                    if (target.tagName === 'BUTTON' || target.tagName === 'LI') {
                        const categoryID = target.getAttribute('data-category');
                        const parentCategoryID = target.closest('.subcategory-list')?.getAttribute('data-parent');
                
                        if (categoryID) {
                            filterProductsByCategory(categoryID, parentCategoryID);
                        }
                    }
                });
            } else {
                console.error('Failed to fetch categories:', data.message);
            }
        })
        .catch(error => console.error('Error fetching categories:', error));
}

// Function to filter products by category or subcategory
function filterProductsByCategory(categoryID, parentCategoryID = null) {
    const allProducts = document.querySelectorAll('.card-wrapper');

    allProducts.forEach(product => {
        const productCategory = product.getAttribute('data-category');
        const productParentCategory = product.getAttribute('data-parent-category');

        if (categoryID === 'all') {
            product.style.display = 'block'; // Show all products
        } else if (categoryID === productCategory || categoryID === productParentCategory) {
            product.style.display = 'block'; // Show matching category or subcategory products
        } else {
            product.style.display = 'none'; // Hide non-matching products
        }
    });
}

function removeFromCart(name) {
    console.log(`Removing ${name} from cart`);

    fetch('/remove-from-cart', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: name }),
    })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                console.log(`${name} removed from cart.`);
                updateCartCount(data.cart);
                updateCartItems(data.cart);
            } else {
                alert('Failed to remove the product from the cart.');
            }
        })
        .catch(error => {
            console.error('Error removing product from cart:', error);
        });
}

function togglePassword() {
    const passwordField = document.getElementById("password");
    const toggleIcon = document.getElementById("togglePasswordIcon");
    
    if(passwordField.type === "password"){
        passwordField.type = "text";
        toggleIcon.classList.remove("bi-eye-slash");
        toggleIcon.classList.add("bi-eye");
    } else {
        passwordField.type = "password";
        toggleIcon.classList.remove("bi-eye");
        toggleIcon.classList.add("bi-eye-slash");
    }
}