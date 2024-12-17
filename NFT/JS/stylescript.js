// Get all navigation links
const navLinks = document.querySelectorAll('.nav-links .navigate');

// Function to update the active link based on the current page
function setActiveLink() {
  const currentPath = window.location.pathname;
  
  navLinks.forEach(link => {
    // Remove 'navigate-active' from all links
    link.classList.remove('navigate-active');

    // Check if link href matches the current page path
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('navigate-active');
    }
  });
}

// Add event listeners to update the active class on click
navLinks.forEach(link => {
  link.addEventListener('click', function () {
    // Remove 'navigate-active' from all links
    navLinks.forEach(nav => nav.classList.remove('navigate-active'));

    // Add 'navigate-active' to the clicked link
    this.classList.add('navigate-active');
  });
});

// Set the active link on page load
setActiveLink();

document.addEventListener('DOMContentLoaded', function () {
  const profilePic = document.getElementById('profile-pic');
  const dropdownMenu = document.getElementById('dropdown-menu');

  // Simulate a user login check
  const isLoggedIn = true; // Change this based on actual login status
  const userProfilePic = 'user-profile.jpg'; // Replace with the user's profile image URL

  // Update profile picture if user is logged in
  if (isLoggedIn) {
    profilePic.src = userProfilePic;
  }

  // Toggle dropdown menu visibility on click
  profilePic.addEventListener('click', function (event) {
    event.stopPropagation(); // Prevent click from propagating
    dropdownMenu.style.display =
      dropdownMenu.style.display === 'flex' ? 'none' : 'flex';
  });

  // Hide dropdown menu if user clicks outside
  document.addEventListener('click', function () {
    dropdownMenu.style.display = 'none';
  });

    // Toggle dropdown menu visibility on profile picture click
    profileContainer.addEventListener('mouseenter', () => {
      profileContainer.classList.add('active');
    });
  
    // Keep dropdown visible while interacting with it
    profileContainer.addEventListener('mouseleave', () => {
      profileContainer.classList.remove('active');
    });
});
