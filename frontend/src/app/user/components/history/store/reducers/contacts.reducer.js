import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
	entities: [],
	table: [],
	searchText: '',
	routeParams: {},
	contactDialog: {
		type: 'new',
		props: {
			open: false
		},
		orderNum: -1
	},
	acceptDialog: {
		props: {
			open: false
		},
		data: {
			qrcode: '',
		}
	}
};

const contactsReducer = (state = initialState, action) => {
	switch (action.type) {
		case Actions.GET_CONTACTS: {
			return {
				...state,
				entities: action.payload.items,
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
					orderNum: -1
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
					orderNum: -1
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
					orderNum: action.payload
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
					orderNum: -1
				}
			};
		}
		case Actions.OPEN_ACCEPT_DIALOG: {
			return {
				...state,
				acceptDialog: {
					props: {
						open: true
					},
					data: action.payload
				}
			};
		}
		case Actions.CLOSE_ACCEPT_DIALOG: {
			return {
				...state,
				acceptDialog: {
					props: {
						open: false
					},
					data: {
						qrcode: ''
					}
				}
			};
		}
		case Actions.UPDATE_CONTACT: {
			let entities = [];
			for(let i=0; i<state.entities.length; i++) {
				if(state.entities[i].id == action.payload.data.id) {
					if(!action.payload.data.deleted) {
						entities.push({...state.entities[i], ...action.payload.data});
					}
				}
				else {
					entities.push(state.entities[i]);
				}
			}
			return {
				...state,
				entities: entities,
				table: action.payload.table,
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
		default: {
			return state;
		}
	}
};

export default contactsReducer;
