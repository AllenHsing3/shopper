import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { createPaymentIntent, createReceipt } from '../../actions/item';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';


const CheckoutForm = ({ emailReceipt, user ,createReceipt, createPaymentIntent, paymentIntent, items, cartTotal, isAuthenticated, cart }) => {
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
    createPaymentIntent({ items })
    // Create PaymentIntent as soon as the page loads
    // async function loadIntent() {
    //   try {
    //     await createPaymentIntent({ items });
    //   } catch (err) {
    //     console.error(err.message)
    //   }
    // }
    // loadIntent();
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
      createReceipt(user.email, user.name, cart)
      // emailReceipt(user.email, user.name, cart)
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
      Payment succeeded, you should recieve an email confirmation email shortly! Click <Link to='/'>here</Link> to return.
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
  cart: PropTypes.object.isRequired,
  createReceipt: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  paymentIntent: state.item.paymentIntent,
  items: state.item.cart.cartItems,
  cartTotal: state.item.cart.cartTotal,
  cart: state.item.cart,
  user: state.auth.user
});

export default connect(mapStateToProps, { createPaymentIntent, createReceipt })(CheckoutForm);
