import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
	table: [],
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
				table: action.payload.items,
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
			for(let i=0; i<state.table.length; i++) {
				if(state.table[i]._id === action.payload._id) {
					entities.push(action.payload);
				} else {
					entities.push(state.table[i]);
				}
			}
			return {
				...state,
				table: entities,
			}
			
		}
		case Actions.ADD_CONTACT: {
			return {
				...state,
				table: [...state.table, ...[action.payload]],
			}
		}
		case Actions.REMOVE_CONTACT: {
			let entities = [];
			for(let i=0; i<state.table.length; i++) {
				if(state.table[i]._id === action.payload._id) {
					continue;
				}
				entities.push(state.table[i]);
			}
			return {
				...state,
				table: entities,
			}
		}
		default: {
			return state;
		}
	}
};

export default contactsReducer;
