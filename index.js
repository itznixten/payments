const checkbox = document.getElementById('mycheckbox');
const paypal = document.getElementById('Paypal');
const visa = document.getElementById('Visa');
const master = document.getElementById('Master');
const submitBtn = document.getElementById('Mysubmit');
const paymentResult = document.getElementById('paymentResult');

// Wrap payment options in a form for accessibility
const form = document.querySelector('.container');
form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (checkbox.checked) {
    paymentResult.textContent = 'Subscription active. You may continue.';
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