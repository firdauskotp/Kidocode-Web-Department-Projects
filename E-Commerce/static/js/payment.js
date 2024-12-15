const stripe = Stripe('{{ public_key }}');
const elements = stripe.elements();
const card = elements.create('card', {
    style: {
        base: {
            fontSize: '14px',
            padding: '8px',
            lineHeight: '1.5',
            color: '#32325d',
        },
        invalid: {
            color: '#f44336',
        },
    },
});
card.mount('#card-element');

const form = document.getElementById('payment-form');
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const response = await fetch('/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: {{ product.price * 100 }} }),
    });

    const data = await response.json();
    const clientSecret = data.clientSecret;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: card },
    });

    if (error) {
        alert('Payment failed: ' + error.message);
    } else if (paymentIntent.status === 'succeeded') {
        alert('Payment Successful!');
        window.location.href = '/homepage';
    }
});
