import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE
 } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  return function(dispatch) {

    // Did user provide email and password
    if (email && password) {

      // Submit email password to the server if
      axios.post(`${ROOT_URL}/signin`, { email, password })
        .then(response => {
          // If request is good,
          // - Update state to indicate user is authenticated
          dispatch( { type: AUTH_USER });

          // - Save the JWT token
          localStorage.setItem('token', response.data.token);

          // - Redirect to route '/feature'
          browserHistory.push('/feature');

        })
        .catch((e) => {
          // Request is bad
          dispatch(authError('Bad Login Info'));
        });

      }
      else {
        // Email and/or password not supplied, provide message
        dispatch(authError('You must provide e-mail and password'));
      }

  }

}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}

export function signupUser({ email, password }) {

  return function(dispatch){

    axios.post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {

        // If request is good,
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });

        // - Save the JWT token
        localStorage.setItem('token', response.data.token);

        // - Redirect to route '/feature'
        browserHistory.push('/feature');

      })
      .catch(serve => {
            dispatch(authError(serve.response.data.error))
        });

  }

}


export function signoutUser() {

  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}


export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL,{
      headers: { authorization: localStorage.getItem('token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      })

  }
}
