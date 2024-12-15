document.addEventListener('DOMContentLoaded', () => {
    // Fetch the cart from the server on page load
    fetch('/get-cart')
        .then(response => response.json())
        .then(cart => {
            // Sync the client-side cart with the server cart
            updateCartCount(cart);
            updateCartItems(cart);
        })
        .catch(error => {
            console.error('Error fetching cart:', error);
        });

    // Attach event listeners to all "Add to cart" buttons
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const name = button.dataset.name; // Get the product name
            const price = parseFloat(button.dataset.price); // Get the product price

            // Call the addToCart function with the product details
            addToCart({ name, price });
        });
    });
});

// Function to handle adding to the cart
function addToCart(product){
    console.log(`Adding ${product.name} to cart at $${product.price}`);

    // Send the product to the server using Fetch API
    fetch('/add-to-cart', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ product }),
    })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                console.log('Product successfully added to cart:', data.cart);
                updateCartCount(data.cart);
                updateCartItems(data.cart);
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
    const cartCountElement = document.getElementById('cart-count');
    if(!cartCountElement){
        console.warn(`Cart count element not found in the DOM.`);
        return;
    }

    if(!cart || Object.keys(cart).length === 0) {
        cartCountElement.textContent = 0;
        return;
    }
    const count = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = count;
}


// Function to update cart items in the UI
function updateCartItems(cart){
    const cartItems = document.getElementById('cart-items');
    const cartItemsTable = document.getElementById('cart-items-table');
    const totalPriceElement = document.getElementById('total-price');
    const checkoutButton = document.getElementById('btn-checkout');
    const viewCartButton = document.getElementById('btn-viewCart');

    let totalPrice = 0;

    if(cartItems){
        cartItems.innerHTML = ''; // Clear existing content
        if(Object.keys(cart).length === 0) {
            cartItems.innerHTML = '<li class="list-group-item text-center">Your cart is empty!</li>';
            checkoutButton.classList.add('d-none');
            viewCartButton.classList.add('d-none');
        } else {
            for(const [name, { price, quantity }] of Object.entries(cart)) {
                const listItem = document.createElement('li');
                listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                listItem.innerHTML = `
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

            checkoutButton.classList.remove('d-none');
            viewCartButton.classList.remove('d-none');
        }
    }

    if(cartItemsTable){
        cartItemsTable.innerHTML = ''; // Clear existing content
        if(Object.keys(cart).length === 0) {
            cartItemsTable.innerHTML = '<tr><td colspan="5" class="text-center">Your cart is empty!</td></tr>';
        } else {
            for(const [name, { price, quantity }] of Object.entries(cart)) {
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

                totalPrice += price * quantity;
            }
        }
    }

    if(totalPriceElement){
        totalPriceElement.textContent = `RM${totalPrice.toFixed(2)}`;
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
        for(const[name, { price, quantity }] of Object.entries(cart)){
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <span>${name} (x${quantity})</span>
                <span>RM${(price * quantity).toFixed(2)}</span>
            `;

            cartItemsElement.appendChild(listItem);
            totalPrice += price * quantity;
        }
    }

    totalPriceElement.textContent = `RM${totalPrice.toFixed(2)}`;
}

function removeFromCart(productName){
    console.log(`Removing ${productName} from cart`);

    fetch('/remove-from-cart', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: productName }),
    })
        .then(response => response.json())
        .then(data => {
            if(data.success){
                console.log('${productName} removed from cart.');
                updateCartCount(data.cart);
                updateCartItems(data.cart);
            } else{
                alert('Failed to remove the product from the cart.');
            }
        })
        .catch(error => {
            console.error('Error removing produt from cart:', error);
        });
}