from flask import Flask, jsonify, request
import razorpay
from flask_cors import CORS

app = Flask(__name__) 
CORS(app)

client = razorpay.Client(auth=("rzp_test_j5Kw2jj4nakv3i", "ek1zr5pdACe5szVGMmTLENKU"))

@app.route('/create-order', methods=['POST'])
def create_order():
    # Retrieve the amount and currency from the request body
    data = request.get_json()
    amount = data['amount']
    currency = data['currency']

    # Create the Razorpay order
    order = client.order.create({'amount': amount, 'currency': currency})

    # Return the order details as a JSON response
    return jsonify({'orderId': order})

@app.route('/confirm-payment', methods=['POST'])
def confirm_payment():
    # Retrieve the payment details from the request
    data = request.get_json()
    order_id = data['orderId']
    payment_id = data['paymentId']
    amount = data['amount']
    currency = data['currency']

    # Verify the payment with Razorpay
    payment = client.payment.fetch(payment_id)
    if payment['status'] == 'captured' and payment['amount'] == amount and payment['currency'] == currency:
        # Payment is successful, update your database or perform necessary actions
        # Return success response
        return jsonify({'status': 'success', 'message': 'Payment successful'})
    else:
        # Payment verification failed
        # Return failure response
        return jsonify({'status': 'failure', 'message': 'Payment verification failed'})

if __name__ == '__main__':
    app.run(debug=True)

