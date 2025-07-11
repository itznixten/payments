// --- Registration logic ---
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const regUsername = document.getElementById('regUsername').value;
    const regPassword = document.getElementById('regPassword').value;
    if (regUsername && regPassword) {
      let users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.find(u => u.username === regUsername)) {
        alert('Username already exists!');
        return;
      }
      users.push({ username: regUsername, password: regPassword });
      localStorage.setItem('users', JSON.stringify(users));
      alert('Registration successful! You can now sign in.');
      registerForm.reset();
      document.getElementById('showSignIn').click();
    } else {
      alert('Please enter username and password');
    }
  });
}

// --- Login/sign-in logic ---
const loginForm = document.getElementById('loginForm');
const mainApp = document.getElementById('mainApp');
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  let users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => u.username === username && u.password === password);
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
    loginForm.style.display = 'none';
    if (registerForm) registerForm.style.display = 'none';
    mainApp.style.display = 'block';
    document.getElementById('showSignIn').style.display = 'none';
    document.getElementById('showRegister').style.display = 'none';
    updateUserProfile();
  } else {
    alert('Invalid username or password');
  }
});

function updateUserProfile() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    document.querySelector('#userProfile h3').textContent = user.username;
    document.querySelector('#userProfile p').textContent = user.username + '@email.com';
  }
}

// Toggle between Sign In and Register forms
const showSignIn = document.getElementById('showSignIn');
const showRegister = document.getElementById('showRegister');
const loginFormEl = document.getElementById('loginForm');
const registerFormEl = document.getElementById('registerForm');

showSignIn.addEventListener('click', function() {
  loginFormEl.style.display = 'block';
  registerFormEl.style.display = 'none';
});
showRegister.addEventListener('click', function() {
  loginFormEl.style.display = 'none';
  registerFormEl.style.display = 'block';
});

// Payment/profile logic (unchanged)
const checkbox = document.getElementById('mycheckbox');
const paypal = document.getElementById('Paypal');
const visa = document.getElementById('Visa');
const master = document.getElementById('Master');
const paymentResult = document.getElementById('paymentResult');
const form = document.getElementById('paymentForm');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (checkbox.checked) {
    paymentResult.textContent = 'Subscription active. You may continue.';
    document.getElementById('userProfile').style.display = 'block';
    updateUserProfile();
    return;
  }
  const selectedPayments = [paypal.checked, visa.checked, master.checked].filter(Boolean);
  if (selectedPayments.length > 1) {
    alert('Please select only one payment option.');
    return;
  }
  if (paypal.checked) {
    paymentResult.textContent = 'You selected PayPal.';
    window.location.href = 'https://www.paypal.com';
    return;
  } else if (visa.checked) {
    paymentResult.textContent = 'You selected Visa.';
    window.location.href = 'https://www.visa.com'; 
    return;
  } else if (master.checked) {
    paymentResult.textContent = 'You selected MasterCard.';
    window.location.href = 'https://www.mastercard.com'; 
    return;
  } else {
    paymentResult.textContent = 'Please select a payment option.';
  }
});

// iPhone status bar time and date
function updateIphoneStatusBar() {
  const timeElem = document.getElementById('iphone-time');
  const dateElem = document.getElementById('iphone-date');
  const now = new Date();
  // Format time as HH:MM
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  timeElem.textContent = `${hours}:${minutes} ${ampm}`;
  // Format date as Month Day, Year
  const options = { month: 'short', day: 'numeric', year: 'numeric' };
  dateElem.textContent = now.toLocaleDateString(undefined, options);
}
setInterval(updateIphoneStatusBar, 1000);
updateIphoneStatusBar();
