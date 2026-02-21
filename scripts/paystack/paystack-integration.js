// paystack-integration.js

// Function to initialize Paystack payment
function initializePayment() {
    // Sample configuration, replace with actual
    var paystackPublicKey = 'YOUR_PUBLIC_KEY';
    var handler = PaystackPop.setup({
        key: paystackPublicKey,
        email: document.getElementById('email').value,
        amount: document.getElementById('amount').value * 100, // Amount in kobo
        currency: 'NGN',
        callback: function (response) {
            // Payment successful
            alert('Payment successfully completed. Transaction reference: ' + response.reference);
            verifyPayment(response.reference);
        },
        onClose: function () {
            alert('Payment process was interrupted.');
        }
    });
    handler.openIframe();
}

// Function to verify Paystack payment
function verifyPayment(reference) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.paystack.co/transaction/verify/' + reference, true);
    xhr.setRequestHeader('Authorization', 'Bearer YOUR_SECRET_KEY');
    xhr.onload = function () {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.data.status === 'success') {
                alert('Payment verified successfully.');
            } else {
                alert('Payment verification failed.');
            }
        } else {
            alert('Error occurred during verification.');
        }
    };
    xhr.send();
}