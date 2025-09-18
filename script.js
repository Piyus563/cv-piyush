// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Burger Menu Functionality
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

// Initialize AOS
AOS.init({
    duration: 1000,
    once: true, // Whether animation should happen only once - while scrolling down
});

// Function to set theme
function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
setTheme(currentTheme);

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    const current = body.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});

// Burger menu toggle
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle'); // Optional: for burger animation
});

// Close nav menu when a link is clicked (for mobile)
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            burger.classList.remove('toggle');
        }
    });
});


// Contact form handling
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent default form submission

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // In a real application, you would send this data to a server
    // For now, we'll just show an alert and reset the form
    alert('Thank you for your message, ' + name + '! I will get back to you soon.');
    this.reset();
});

// Basic email validation function
function validateEmail(email) {
    const re = /^(([^<>()[\$\\.,;:\s@"]+(\.[^<>()[\$\\.,;:\s@"]+)*)|(".+"))@((\$[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\$)|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            // Calculate offset for fixed header
            const headerOffset = document.querySelector('nav').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
