  import axios from 'axios';
  import setAuthToken from '../utils/setAuthToken';
  import jwt_decode from 'jwt-decode';
  import { SERVER_URL } from 'app/ApiConfig';

  import { 
    GET_ERRORS, 
    SET_CURRENT_USER, 
    USER_PROPILE_UPDATE,
    SET_DISPLAY_UPDATE_TOAST,
    USER_PASSWORD_UPDATE,
    SET_DISPLAY_UPDATE_PASSWORD,
    SET_LOGIN_FAIL_TOAST,
   } from './types';

  // Register User
  export const registerUser = (userData, history) => dispatch => {
    axios
      .post(`${SERVER_URL}/api/users/register`, userData)
      .then((res) => {
        history.push('/login');
      })
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err
        })
      );
  };

  // Login - Get User Token
  export const loginUser = userData => dispatch => {
    axios
      .post(`${SERVER_URL}/api/users/login`, userData)
      .then(res => {
        if(res.data.success) {
          const { token } = res.data;
          localStorage.setItem('jwtToken', token);
          setAuthToken(token);
          const decoded = jwt_decode(token);
          dispatch(setCurrentUser(decoded));
        } else {
          dispatch(displayLoginFail());
        }
        
      })
      .catch(err =>{
        dispatch({
          type: GET_ERRORS,
          payload: err,
        })}
      );
  };
  export const verifyEmail = userData => dispatch => {
    axios
      .post(`${SERVER_URL}/api/users/verify_email`, userData)
      .then(res => {
      })
      .catch(err =>{
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })}
      );
  };
  export const verifyPassword = userData => dispatch => {
    axios
      .post(`${SERVER_URL}/api/users/verify_password`, userData)
      .then(res => {
      })
      .catch(err =>{
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })}
      );
  };
  export const changePassword = userData => dispatch => {
    axios
      .post(`${SERVER_URL}/api/users/change_password`, userData)
      .then(res => {
      })
      .catch(err =>{
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })}
      );
  };
  // Set logged in user
  export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  };

  // Log user out
  export const logoutUser = (history) => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('examid');
    localStorage.removeItem('pass');
    // Remove auth header for future requests
    setAuthToken(false);
    history.push('/');
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };

export const updateUserProfile = (userData) => dispatch => {
  axios
    .post(`${SERVER_URL}/api/users/update_profile`, userData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(res => {
      if(res.data.success !== undefined && res.data.success) {

        localStorage.setItem('jwtToken', res.data.token);
        setAuthToken(res.data.token);

        dispatch({
          type: USER_PROPILE_UPDATE,
          payload: res.data.data,
        });
      }
    })
    .catch(err =>{
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })}
    );
}
export const updateUserPassword = (userData) => dispatch => {
  axios
    .post(`${SERVER_URL}/api/users/change_password`, userData)
    .then(res => {
      if(res.data.success){
        dispatch({
          type: USER_PASSWORD_UPDATE,
          payload: userData,
        });
      }
      else {
        dispatch({
          type: SET_DISPLAY_UPDATE_PASSWORD,
          payload: true,
        });
      }
    })
  
  }

export function setDisplayUpdateToast(data) {
  return {
    type: SET_DISPLAY_UPDATE_TOAST,
    payload: data,
  }
}

export function displayLoginFail() {
  return {
    type: SET_LOGIN_FAIL_TOAST,
  }
}