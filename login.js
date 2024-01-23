// Whitelist of allowed IP addresses
const whitelist = ['173.17.76.238', '172.59.104.33'];

// Function to check if an IP address is in the whitelist
function isAllowedIP(ip) {
  return whitelist.includes(ip);
}

// Function to redirect to the appropriate page based on the IP address
function redirectPage(ip) {
  if (isAllowedIP(ip)) {
    window.location.href = './panel.html'; // redirect to panel.html
  } else {
    window.location.href = './accessDenied.html'; // redirect to accessDenied.html
  }
}

// Get the user's IP address using the ipify.org API
fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
    const ipAddress = data.ip;
    redirectPage(ipAddress);
  })
  .catch(error => {
    console.log('Error:', error);
  });
