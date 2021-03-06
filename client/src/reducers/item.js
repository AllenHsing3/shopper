import {
  ITEMS_LOADED,
  LOAD_ITEMS_FAIL,
  ITEM_LOADED,
  ADDED_CART,
  ADD_CART_FAIL,
  LOAD_CART_SUCCESS,
  LOAD_CART_FAIL,
  LOGGED_OUT,
  REMOVED_ITEM,
  PAYMENTINTENT_SUCCESS,
  RECEIPT_CREATED,
  RECEIPT_FAIL,
  RECEIPTS_LOADED,
  RECEIPTS_LOAD_FAIL,
} from '../actions/types';

const intialState = {
  loading: true,
  items: [],
  item: { name: '', description: '', longDescription: '', price: '' },
  cart: {},
  paymentIntent: null,
  receipts: [],
};
export default function (state = intialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ITEMS_LOADED:
      return {
        ...state,
        loading: false,
        items: [...payload],
      };
    case ITEM_LOADED:
      return {
        ...state,
        loading: false,
        item: payload,
      };
    case ADDED_CART:
    case LOAD_CART_SUCCESS:
      return {
        ...state,
        cart: { ...payload },
      };
    case LOAD_ITEMS_FAIL:
    case ADD_CART_FAIL:
    case LOAD_CART_FAIL:
    case RECEIPT_FAIL:
    case RECEIPTS_LOAD_FAIL:
      return {
        ...state,
      };
    case LOGGED_OUT:
      return {
        ...state,
        loading: true,
        item: { name: '', description: '', longDescription: '', price: '' },
        cart: {},
      };
    case REMOVED_ITEM:
      return {
        ...state,
        cart: payload,
      };
    case PAYMENTINTENT_SUCCESS:
      return {
        ...state,
        paymentIntent: payload,
      };
    case RECEIPT_CREATED:
      return {
        ...state,
        cart: payload,
      };
    case RECEIPTS_LOADED:
      return {
        ...state,
        receipts: payload,
      };
    default:
      return state;
  }
}
