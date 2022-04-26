
  import { 
    SET_GUEST_ORDER_HISTORY,
   } from './types';

  // Register User
  export const setGuestOrderHistory = (data) => {
    return {
      type: SET_GUEST_ORDER_HISTORY,
      payload: data,
    }
  };
