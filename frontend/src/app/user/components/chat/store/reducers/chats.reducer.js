import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
	messages: [],
	items: [],
	type: '',
	orders: [],
	showOrders: false,
};

const chatsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.SET_MESSAGE: {
			return {
				...state,
				messages: [...state.messages, ...action.payload.messages],
				items: action.payload.items,
				type: action.payload.type,
				showOrders: action.payload.showOrders,
			};
		}
		case Actions.SET_ORDER: {
			return {
				...state,
				orders: [...state.orders, ...[action.payload]]
			}
		}
		case Actions.RESET_ORDERS: {
			return {
				...state,
				orders: [],
			}
		}
		case Actions.SET_SHOW_ORDERS: {
			return {
				...state,
				showOrders: action.payload,
			}
		}
		case Actions.RESET_CHAT_MESSAGES: {
			return initialState;
		}
		
		default: {
			return state;
		}
	}
};

export default chatsReducer;
