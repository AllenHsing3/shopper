import {
  ITEMS_LOADED,
  ITEM_LOADED,
  LOAD_ITEMS_FAIL,
  ADD_CART_FAIL,
  ADDED_CART,
  LOAD_CART_FAIL,
  LOAD_CART_SUCCESS,
  REMOVED_ITEM,
  PAYMENTINTENT_SUCCESS,
  RECEIPT_FAIL,
  RECEIPT_CREATED,
  RECEIPTS_LOADED,
  RECEIPTS_LOAD_FAIL,
} from './types';
import axios from 'axios';
import setAuthToken from '../util/setAuthToken';

export const loadItems = (category) => async (dispatch) => {
  try {
    const res = await axios.get(`/item/${category}`);
    dispatch({
      type: ITEMS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: LOAD_ITEMS_FAIL,
    });
  }
};

export const loadItem = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/item/itempage/${id}`);
    dispatch({
      type: ITEM_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: LOAD_ITEMS_FAIL,
    });
  }
};

export const addToCart = ({ _id, quantity, userId }) => async (dispatch) => {
  const body = JSON.stringify({
    itemId: _id,
    quantity,
    userId,
  });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.post('/cart/addItem', body, config);
    dispatch({
      type: ADDED_CART,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ADD_CART_FAIL,
    });
  }
};

export const loadCart = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await axios.get(`/cart/`);
    dispatch({
      type: LOAD_CART_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOAD_CART_FAIL,
    });
  }
};

export const removeItem = (cartItemId) => async (dispatch) => {
  try {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    const res = await axios.delete(`/cart/${cartItemId}`);
    dispatch({
      type: REMOVED_ITEM,
      payload: res.data,
    });
  } catch (err) {
    console.log(err.message);
  }
};

// Create payment intent:
export const createPaymentIntent = (items) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify(items);
    const res = await axios.post(
      '/payment/create-payment-intent',
      body,
      config
    );
    // setClientSecret(res.clientSecret)
    dispatch({
      type: PAYMENTINTENT_SUCCESS,
      payload: res.data.clientSecret,
    });
  } catch (err) {
    console.error(err.message);
  }
};

// Save Cart to Receipt, delete cartItems, email receipt
export const createReceipt = (email, name, cart) => async (dispatch) => {
  try {
    cart.name = name;
    cart.email = email;
    const body = JSON.stringify(cart);
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const newReceipt = await axios.post(
      '/receipt/create-receipt',
      body,
      config
    );
    console.log(newReceipt);
    await axios.post(`/email/${newReceipt.data._id}`, body, config);
    const res = await axios.delete(`/cart/delete-cart-items/${cart.userId}`);
    dispatch({
      type: RECEIPT_CREATED,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: RECEIPT_FAIL,
    });
  }
};

// Load Receipts
export const loadReceipts = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/receipt/${userId}`);
    dispatch({
      type: RECEIPTS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    console.error(err.message);
    dispatch({
      type: RECEIPTS_LOAD_FAIL,
    });
  }
};
