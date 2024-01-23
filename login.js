const loginPasskey = process.env.LOGINPASSKEY || '11192022';
const loginUsername = 'dash0908';

document.querySelector('form').addEventListener('submit', (event) => {

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const passkey = document.getElementById('passkey').value;

  if (username === loginUsername && password === loginPasskey || passkey === 111920227195348260) {
    // if the entered username and password are correct, redirect to panel.html
    window.location.href = './panel.html';
  } else {
    // if the entered username or password is incorrect, display an error message
    console.log('Username/Password is incorrect');
  }
});
