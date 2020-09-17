import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent, loadCart } from '../../actions/item';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

const CheckoutForm = ({ createPaymentIntent, paymentIntent, items, cartTotal, isAuthenticated }) => {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    if(!isAuthenticated){
      return <Redirect to='/' />
    }
    // Create PaymentIntent as soon as the page loads
    async function loadIntent() {
      await createPaymentIntent({ items });
    }
    loadIntent();
  }, []);

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {},
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };
  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(paymentIntent, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return paymentIntent == null ? (
    <Spinner />
  ) : (
    <div align='center' >
      <h3>Your cart total is: ${cartTotal}</h3>
    <form id="payment-form" onSubmit={handleSubmit}>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? <div className="spinner" id="spinner"></div> : 'Pay'}
        </span>
      </button>

      {/* Show any error that happens when processing the payment */}

      {error && (
        <div className="card-error" role="alert">
          {error}
        </div>
      )}

      {/* Show a success message upon completion */}
      <p className={succeeded ? 'result-message' : 'result-message hidden'}>
        Payment succeeded! Thank you for trying out my website!
      </p>
    </form>
    </div>
  );
};

CheckoutForm.propTypes = {
  createPaymentIntent: PropTypes.func.isRequired,
  paymentIntent: PropTypes.string.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  cartTotal: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  paymentIntent: state.item.paymentIntent,
  items: state.item.cart.cartItems,
  cartTotal: state.item.cart.cartTotal
});

export default connect(mapStateToProps, { createPaymentIntent })(CheckoutForm);
