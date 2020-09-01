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
} from '../actions/types';

const intialState = {
  loading: true,
  items: [],
  item: { name: '', description: '', longDescription: '', price: '' },
  cart: null,
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
        cart: {...payload},
      };
    case LOAD_ITEMS_FAIL:
    case ADD_CART_FAIL:
    case LOAD_CART_FAIL:
      return {
        ...state,
      };
    case LOGGED_OUT:
      return {
        ...state,
        loading: true,
        items: [],
        item: { name: '', description: '', longDescription: '', price: '' },
        cart: null,
      }
    case REMOVED_ITEM:
      return {
        ...state,
        cart: payload   
      }
    default:
      return state;
  }
}
