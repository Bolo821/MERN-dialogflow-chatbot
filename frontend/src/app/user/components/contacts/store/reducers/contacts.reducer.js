import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
	entities: [],
	searchText: '',
	routeParams: {},
	contactDialog: {
		type: 'new',
		props: {
			open: false
		},
		data: null
	},
	isOpenToast: false,
	toastMessage: '',
};

const contactsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_CONTACTS: {
			return {
				...state,
				entities: action.payload,
				routeParams: action.routeParams
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
			for(let i=0; i<state.entities.length; i++) {
				if(i == action.payload.no - 1)
					entities.push(action.payload);
				else
					entities.push(state.entities[i]);
			}
			return {
				...state,
				entities: entities,
			}
		}
		case Actions.ADD_CONTACT: {
			return {
				...state,
				entities: [...state.entities, {...action.payload, no: state.entities.length+1}],
			}
		}
		case Actions.REMOVE_CONTACT: {
			let entities = [];
			let count = 0;
			for(let i=0; i<state.entities.length; i++) {
				if(state.entities[i].id == action.payload.id)
					continue;
				else {
					entities.push(state.entities[i]);
					entities[count].no = ++count;
				}
			}
			return {
				...state,
				entities: entities,
			}
		}
		case Actions.SET_ALERT: {
			return {
				...state,
				isOpenToast: action.payload.isOpen,
				toastMessage: action.payload.message,
			}
		}
		default: {
			return state;
		}
	}
};

export default contactsReducer;
