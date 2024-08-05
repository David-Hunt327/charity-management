function loadNavbar() {
  fetch('/components/navigation.html')
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text();
      })
      .then(data => {
          document.getElementById('navbar-placeholder').innerHTML = data;
          setActiveLink();
          setAuthLink();
      })
      .catch(error => console.error('Error loading navbar:', error));
}

function setActiveLink() {
  const currentPath = window.location.pathname;
  const menuLinks = document.querySelectorAll('.navbar .nav-links a');

  menuLinks.forEach(link => {
      if (link.getAttribute('href') === currentPath) {
          link.classList.add('active');
      }
  });
}

function toggleNav() {
  var navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('show');

  var button = document.querySelector('.button');
  button.classList.toggle('show');
}


function setAuthLink() {
  const authLink = document.getElementById('auth-link');
  const token = localStorage.getItem('token');

  if (token) {
      authLink.innerText = 'Logout';
      authLink.addEventListener('click', logout);
      authLink.href = '#'; // Prevent default link behavior
  } else {
      authLink.innerText = 'Customer Login';
      authLink.href = '../views/register.html';
  }
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = '../views/register.html';
}

document.addEventListener('DOMContentLoaded', loadNavbar);