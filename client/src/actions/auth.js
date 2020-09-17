import { LOGIN_SUCCESS, LOGIN_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, AUTH_FAIL, USER_LOADED, LOGGED_OUT } from './types';
import axios from 'axios';
import setAuthToken from '../util/setAuthToken'
import { setAlert } from './alert';
import { loadCart } from './item';

export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/user/login', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser())
    dispatch(loadCart())
  } catch (err) {
    dispatch(setAlert('Invalid Credentials', 'error'))

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/user/register', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser())
    
    // dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors
    if(errors){
      errors.forEach((error) => dispatch(setAlert(error.msg, 'error')))
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const loadUser = () => async dispatch => {
  if(localStorage.token){
    setAuthToken(localStorage.token)
  }
  try {
    const res = await axios.get('/user')
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  } catch (err) {

    dispatch({
      type: AUTH_FAIL
    })
  }
}

export const logout = () => dispatch => {
  dispatch({type: LOGGED_OUT})
}
