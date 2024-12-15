
// Function to toggle password visibility
function togglePassword() {
    const passwordField = document.getElementById("password");
    const toggleIcon = document.getElementById("togglePasswordIcon");
    
    // Toggle password visibility
    if (passwordField.type === "password") {
    passwordField.type = "text";
    toggleIcon.classList.remove("bi-eye-slash");
    toggleIcon.classList.add("bi-eye");
    } else {
    passwordField.type = "password";
    toggleIcon.classList.remove("bi-eye");
    toggleIcon.classList.add("bi-eye-slash");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Get all category filter buttons and product cards
    const filterButtons = document.querySelectorAll(".list-group-item");
    const productCards = document.querySelectorAll(".card-wrapper");

    // Add event listeners to each filter button
    filterButtons.forEach(button => {
        button.addEventListener("click", function () {
            // Get the category to filter
            const category = this.getAttribute("data-category");

            // Highlight the selected button
            filterButtons.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");

            // Show or hide products based on the selected category
            productCards.forEach(card => {
                const productCategory = card.getAttribute("data-category");
                if (category === "all" || productCategory === category) {
                    card.style.display = "block"; // Show the card
                } else {
                    card.style.display = "none"; // Hide the card
                }
            });
        });
    });
});

// Initialize the toast
var toastElList = [].slice.call(document.querySelectorAll('.toast'));
var toastList = toastElList.map(function (toastEl) {
    return new bootstrap.Toast(toastEl);
});

// Function to show the toast
function showToast() {
    toastList[0].show(); // Show the first toast in the list (there's only one here)
}
