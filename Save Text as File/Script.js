// Select HTML elements for interaction
const textarea = document.querySelector("textarea"),
fileNameInput = document.querySelector(".file-name input"),
selectMenu = document.querySelector(".save-as select"),
saveBtn = document.querySelector(".save-btn");

// Update button text based on selected file format
selectMenu.addEventListener("change", () => {
    const selectedFormat = selectMenu.options[selectMenu.selectedIndex].text;
    saveBtn.innerText = `Save As ${selectedFormat.split(" ")[0]} File`;
});

saveBtn.addEventListener("click", () => {
    // Check if textarea or filename input is empty
    if (!textarea.value.trim()) {
        alert("Please enter some text to save.");
        return;
    }
    if (!fileNameInput.value.trim()) {
        alert("Please enter a file name.");
        return;
    }
    
    // Create a Blob (file) with the content of the textarea and selected file type
    const blob = new Blob([textarea.value], {type: selectMenu.value});
    const fileUrl = URL.createObjectURL(blob);  // Generate URL for download

    // Create a temporary link to download the file
    const link = document.createElement("a");
    link.download = fileNameInput.value;  // Set file name from input
    link.href = fileUrl;
    link.click();  // Trigger the download
});
