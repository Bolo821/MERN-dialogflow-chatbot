import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import guestReducer from './guestReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  guest: guestReducer,
});
