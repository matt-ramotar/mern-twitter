import * as APIUtil from '../util/session';

import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';
export const RECEIVE_USER_SIGN_IN = 'RECEIVE_USER_SIGN_IN';

// Dispatched when user signs in
export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser,
});

// Will be used to redirect user to login page upon signup
export const receiveUserSignIn = () => ({
  type: RECEIVE_USER_SIGN_IN,
});

// Dispatched to show auth errors on front end

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors,
});

// Will be dispatched when user logged out to set isAuthenticated to false
export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

// On signup, dispatch appropriate action depending on backend response
export const signup = user => async dispatch => {
  try {
    await APIUtil.signup(user);
    dispatch(receiveUserSignIn());
  } catch (e) {
    dispatch(receiveErrors(e.response.data));
  }
};

// On login, set session token and dispatch current user
// Dispatch errors on failure

export const login = user => async dispatch => {
  try {
    const res = await APIUtil.login(user);
    const token = await res.data;
    localStorage.setItem('jwtToken', token);
    APIUtil.setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(receiveCurrentUser(decoded));
  } catch (e) {
    dispatch(receiveErrors(e.response.data));
  }
};

export const logoutUser = () => ({
  type: RECEIVE_USER_LOGOUT,
});

export const logout = () => dispatch => {
  // Remove the token from local storage
  localStorage.removeItem('jwtToken');
  // Remove the token from the common axios header
  APIUtil.setAuthToken(false);
  // Dispatch a logout action
  dispatch(logoutUser());
};
