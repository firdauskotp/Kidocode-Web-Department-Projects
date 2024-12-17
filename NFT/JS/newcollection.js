// Get the necessary DOM elements
const newCollectionLink = document.querySelector('a[href="#wallet"]');
const collectionSelect = document.getElementById('nft-collection');

// Function to create and show the modal
function showCollectionModal() {
    // Create modal elements
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        width: 300px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    `;

    const title = document.createElement('h3');
    title.textContent = 'Create New Collection';
    title.style.marginBottom = '15px';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Collection Name';
    input.style.cssText = `
        width: 100%;
        padding: 8px;
        margin-bottom: 15px;
        border: 1px solid #ddd;
        border-radius: 4px;
        box-sizing: border-box;
    `;

    const buttonContainer = document.createElement('div');
    buttonContainer.style.cssText = `
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    `;

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancel';
    cancelButton.style.cssText = `
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background-color: #ddd;
    `;

    const createButton = document.createElement('button');
    createButton.textContent = 'Create';
    createButton.style.cssText = `
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background-color: #6c5ce7;
        color: white;
    `;

    // Add elements to the modal
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(createButton);
    modalContent.appendChild(title);
    modalContent.appendChild(input);
    modalContent.appendChild(buttonContainer);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    // Add event listeners
    cancelButton.onclick = () => modal.remove();
    modal.onclick = (e) => {
        if (e.target === modal) modal.remove();
    };
    
    createButton.onclick = () => {
        const collectionName = input.value.trim();
        if (collectionName) {
            addNewCollection(collectionName);
            modal.remove();
        } else {
            input.style.borderColor = 'red';
        }
    };

    // Focus the input
    input.focus();
}

// Function to add new collection to the select element
function addNewCollection(collectionName) {
    // Create new option
    const option = document.createElement('option');
    option.value = collectionName;
    option.textContent = collectionName;
    
    // Add to select element
    collectionSelect.appendChild(option);
    
    // Select the new option
    collectionSelect.value = collectionName;
    
    // Save to localStorage (optional, for persistence)
    saveCollections();
}

// Function to save collections to localStorage
function saveCollections() {
    const collections = Array.from(collectionSelect.options).map(option => option.value);
    localStorage.setItem('nftCollections', JSON.stringify(collections));
}

// Function to load collections from localStorage
function loadCollections() {
    const savedCollections = localStorage.getItem('nftCollections');
    if (savedCollections) {
        const collections = JSON.parse(savedCollections);
        collections.forEach(collection => {
            if (collection !== 'My Default') {
                addNewCollection(collection);
            }
        });
    }
}

// Add click event listener to the "New Collection" link
newCollectionLink.addEventListener('click', (e) => {
    e.preventDefault();
    showCollectionModal();
});

// Load saved collections when the page loads
document.addEventListener('DOMContentLoaded', loadCollections);