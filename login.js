const loginPasskey = `${(secrets.LOGINPASS)}`;
const loginUsername = `${(secrets.LOGINUSER)}`;

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === loginUsername && password === loginPasskey) {
    
  }
});
