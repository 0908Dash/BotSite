const loginPasskey = process.env.LOGINPASSKEY;
const loginUsername = 'dash0908';

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from submitting

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === loginUsername && password === loginPasskey) {
    // if the entered username and password are correct, redirect to panel.html
    window.location.href = './pages/panel.html';
  } else {
    // if the entered username or password is incorrect, display an error message
    console.log('Username/Password is incorrect');
  }
});
