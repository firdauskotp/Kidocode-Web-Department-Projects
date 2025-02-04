document.addEventListener('DOMContentLoaded', function () {
    const mainCategorySelect = document.getElementById('mainCategory');
    const subCategorySelect = document.getElementById('subCategory');
    const form = document.querySelector('form[name="addproductform"]');

    // Populate main categories
    categoryData.main_categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id; // Set the main category ID
        option.textContent = cat.name;
        mainCategorySelect.appendChild(option);
    });

    // Initially disable subCategory dropdown if no main category is selected
    subCategorySelect.disabled = true;

    // Handle main category selection
    mainCategorySelect.addEventListener('change', function () {
        const selectedMainCategory = this.value;

        if (!selectedMainCategory || selectedMainCategory === "Select category") {
            // If no main category is selected, reset and disable subCategory
            subCategorySelect.innerHTML = '<option value="" disabled selected>Select Subcategory</option>';
            subCategorySelect.disabled = true;
        } else {
            // Enable and populate the subCategory dropdown
            subCategorySelect.disabled = false;

            // Clear and populate subcategories for the selected main category
            subCategorySelect.innerHTML = '<option value="" disabled selected>Select Subcategory</option>';
            categoryData.all_categories
                .filter(cat => cat.parentID === selectedMainCategory)
                .forEach(subcat => {
                    const option = document.createElement('option');
                    option.value = subcat.id; // Set the subcategory ID
                    option.textContent = subcat.name;
                    subCategorySelect.appendChild(option);
                });
        }
    });

    // Ensure subCategory is not disabled during form submission
    form.addEventListener('submit', function (event) {
        if (!mainCategorySelect.value || mainCategorySelect.value === "Select category") {
            alert('Please select a main category before submitting.');
            mainCategorySelect.focus();
            event.preventDefault();
        }

        if (subCategorySelect.disabled || !subCategorySelect.value) {
            alert('Please select a subcategory before submitting.');
            subCategorySelect.focus();
            event.preventDefault();
        }
    });
});
