import isEmpty from '../validation/is-empty';

import { 
  SET_CURRENT_USER, 
  USER_PROPILE_UPDATE,
  SET_DISPLAY_UPDATE_TOAST,
  USER_PASSWORD_UPDATE, 
  SET_DISPLAY_UPDATE_PASSWORD,
  SET_LOGIN_FAIL_TOAST,
} from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  shouldDisplayUpdateToast: false,
	displayText:"",
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case USER_PROPILE_UPDATE:
      return {
        ...state,
        user: {...state.user, ...action.payload},
        shouldDisplayUpdateToast: true,
        displayText: "Updated successfully!",
      }
    case SET_DISPLAY_UPDATE_TOAST:
      return {
        ...state,
        shouldDisplayUpdateToast: action.payload,
      }
    case USER_PASSWORD_UPDATE:
      return{
        ...state,
        shouldDisplayUpdateToast: true,
        displayText: "Password change success!"
      }
    case SET_DISPLAY_UPDATE_PASSWORD:
      return{
        ...state,
        shouldDisplayUpdateToast: action.payload,
        displayText:"Password change failed."
      }
    case SET_LOGIN_FAIL_TOAST: {
      return {
        ...state,
        displayText: "Login failed. Please ensure your information.",
        shouldDisplayUpdateToast: true,
      }
    }
    default:
      return state;
  }
}
