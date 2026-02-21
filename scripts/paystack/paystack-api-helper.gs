// Paystack API Helper Utilities

const PAYSTACK_SECRET_KEY = 'your_paystack_secret_key';

/**
 * Function to make API calls to Paystack
 * @param {string} endpoint - The API endpoint you want to call
 * @param {object} options - Options to be sent with the fetch call
 * @returns {Promise<object>} - The response from the Paystack API
 */
async function apiCall(endpoint, options = {}) {
    options.method = options.method || 'GET';
    options.headers = { ...options.headers, 
        'Authorization': `Bearer ${PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
    };

    const response = await UrlFetchApp.fetch(`https://api.paystack.co/${endpoint}`, options);
    return JSON.parse(response.getContentText());
}

/**
 * Function to verify payment with Paystack
 * @param {string} reference - The payment reference to verify
 * @returns {Promise<object>} - The response containing payment verification details
 */
async function verifyPayment(reference) {
    return apiCall(`transaction/verify/${reference}`);
}

/**
 * Function to get the status of a transaction
 * @param {string} transactionId - The ID of the transaction to check
 * @returns {Promise<object>} - The response containing transaction status
 */
async function getTransactionStatus(transactionId) {
    return apiCall(`transaction/${transactionId}`);
}