import { 
  SET_GUEST_ORDER_HISTORY
} from '../actions/types';

const initialState = {
  orderHistory: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_GUEST_ORDER_HISTORY:
      return {
        ...state,
        orderHistory: [...state.orderHistory, ...[action.payload]],
      };
    default:
      return state;
  }
}
