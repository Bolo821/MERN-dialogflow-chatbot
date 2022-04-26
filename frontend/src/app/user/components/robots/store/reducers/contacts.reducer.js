import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
	drink: [],
	starter: [],
	meal: [],
	dessert: [],
	special: [],
	searchText: '',
	routeParams: {},
	contactDialog: {
		type: 'new',
		props: {
			open: false
		},
		data: null
	}
};

const contactsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_CONTACTS: {
			return {
				...state,
				drink: action.payload.drink,
				starter: action.payload.starter,
				meal: action.payload.meal,
				dessert: action.payload.dessert,
				special: action.payload.special,
			};
		}
		case Actions.SET_SEARCH_TEXT: {
			return {
				...state,
				searchText: action.searchText
			};
		}
		case Actions.OPEN_NEW_CONTACT_DIALOG: {
			return {
				...state,
				contactDialog: {
					type: 'new',
					props: {
						open: true
					},
					data: null
				}
			};
		}
		case Actions.CLOSE_NEW_CONTACT_DIALOG: {
			return {
				...state,
				contactDialog: {
					type: 'new',
					props: {
						open: false
					},
					data: null
				}
			};
		}
		case Actions.OPEN_EDIT_CONTACT_DIALOG: {
			return {
				...state,
				contactDialog: {
					type: 'edit',
					props: {
						open: true
					},
					data: action.data
				}
			};
		}
		case Actions.CLOSE_EDIT_CONTACT_DIALOG: {
			return {
				...state,
				contactDialog: {
					type: 'edit',
					props: {
						open: false
					},
					data: null
				}
			};
		}
		case Actions.UPDATE_CONTACT: {
			let entities = [];
			let target;
			switch(action.payload.type) {
				case 'drink': {
					target = state.drink;
					break;
				}
				case 'starter': {
					target = state.starter;
					break;
				}
				case 'meal': {
					target = state.meal;
					break;
				}
				case 'dessert': {
					target = state.dessert;
					break;
				}
				case 'special': {
					target = state.special;
					break;
				}
			}
			for(let i=0; i<target.length; i++) {
				if(target[i]._id == action.payload.id)
					entities.push({...target[i], name: action.payload.name, price: action.payload.price, image: action.payload.image});
				else
					entities.push(target[i]);
			}
			switch(action.payload.type) {
				case 'drink': {
					return {
						...state,
						drink: entities,
					}
				}
				case 'starter': {
					return {
						...state,
						starter: entities,
					}
				}
				case 'meal': {
					return {
						...state,
						meal: entities,
					}
				}
				case 'dessert': {
					return {
						...state,
						dessert: entities,
					}
				}
				case 'special': {
					return {
						...state,
						special: entities,
					}
				}
				default: {
					return state;
				}
			}
			
		}
		case Actions.ADD_CONTACT: {
			switch(action.payload.type) {
				case 'drink': {
					return {
						...state,
						drink: [...state.drink, ...[action.payload]],
					}
				}
				case 'starter': {
					return {
						...state,
						starter: [...state.starter, ...[action.payload]],
					}
				}
				case 'meal': {
					return {
						...state,
						meal: [...state.meal, ...[action.payload]],
					}
				}
				case 'dessert': {
					return {
						...state,
						dessert: [...state.dessert, ...[action.payload]],
					}
				}
				case 'special': {
					return {
						...state,
						special: [...state.special, ...[action.payload]],
					}
				}
				default: {
					return state;
				}
			}
		}
		case Actions.REMOVE_CONTACT: {
			let entities = [];
			let target;
			switch(action.payload.type) {
				case 'drink': {
					target = state.drink;
					break;
				}
				case 'starter': {
					target = state.starter;
					break;
				}
				case 'meal': {
					target = state.meal;
					break;
				}
				case 'dessert': {
					target = state.dessert;
					break;
				}
				case 'special': {
					target = state.special;
					break;
				}
			}
			for(let i=0; i<target.length; i++) {
				if(target[i]._id == action.payload.id)
					continue;
				else
					entities.push(target[i]);
			}
			switch(action.payload.type) {
				case 'drink': {
					return {
						...state,
						drink: entities,
					}
				}
				case 'starter': {
					return {
						...state,
						starter: entities,
					}
				}
				case 'meal': {
					return {
						...state,
						meal: entities,
					}
				}
				case 'dessert': {
					return {
						...state,
						dessert: entities,
					}
				}
				case 'special': {
					return {
						...state,
						special: entities,
					}
				}
				default: {
					return state;
				}
			}
		}
		default: {
			return state;
		}
	}
};

export default contactsReducer;
