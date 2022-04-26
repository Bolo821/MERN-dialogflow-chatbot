//import { getUserData } from 'app/main/apps/contacts/store/actions/user.actions';
import axios from 'axios';
import { SERVER_URL} from  'app/ApiConfig';
export const GET_CONTACTS = '[HISTORY APP] GET CONTACTS';
export const SET_SEARCH_TEXT = '[HISTORY APP] SET SEARCH TEXT';
export const OPEN_NEW_CONTACT_DIALOG = '[HISTORY APP] OPEN NEW CONTACT DIALOG';
export const CLOSE_NEW_CONTACT_DIALOG = '[HISTORY APP] CLOSE NEW CONTACT DIALOG';
export const OPEN_EDIT_CONTACT_DIALOG = '[HISTORY APP] OPEN EDIT CONTACT DIALOG';
export const CLOSE_EDIT_CONTACT_DIALOG = '[HISTORY APP] CLOSE EDIT CONTACT DIALOG';
export const ADD_CONTACT = '[HISTORY APP] ADD CONTACT';
export const UPDATE_CONTACT = '[HISTORY APP] UPDATE CONTACT';
export const REMOVE_CONTACT = '[HISTORY APP] REMOVE CONTACT';
export const REMOVE_CONTACTS = '[HISTORY APP] REMOVE CONTACTS';
export const OPEN_ACCEPT_DIALOG = '[HISTORY APP] OPEN ACCEPT DIALOG';
export const CLOSE_ACCEPT_DIALOG = '[HISTORY APP] CLOSE ACCEPT DIALOG';

export const getContacts = (data) => dispatch =>  {
	axios
    .post(`${SERVER_URL}/api/orders/get_orders_history`, data)
    .then(res => {
		dispatch({
			type: GET_CONTACTS,
			payload: res.data,
		});
    })
    .catch(err =>{
      console.log('error: ', err);
	});
}

export function setSearchText(event) {
	return {
		type: SET_SEARCH_TEXT,
		searchText: event.target.value
	};
}

export function openNewContactDialog() {
	return {
		type: OPEN_NEW_CONTACT_DIALOG
	};
}

export function closeNewContactDialog() {
	return {
		type: CLOSE_NEW_CONTACT_DIALOG
	};
}

export function openEditContactDialog(data) {
	return {
		type: OPEN_EDIT_CONTACT_DIALOG,
		payload: data,
	};
}

export function closeEditContactDialog() {
	return {
		type: CLOSE_EDIT_CONTACT_DIALOG
	};
}

export function openAcceptDialog(data) {
	return {
		type: OPEN_ACCEPT_DIALOG,
		payload: data,
	};
}

export function closeAcceptDialog() {
	return {
		type: CLOSE_ACCEPT_DIALOG
	};
}

export const addContact = (newContact) => dispatch => {
	axios
    .post(`${SERVER_URL}/api/orders/add_orders`, newContact)
    .then(res => {
		dispatch({
			type: ADD_CONTACT,
			payload: {...newContact, id: res.data.id},
		});
    })
    .catch(err =>{
      console.log('error: ', err);
	});
}

export const updateContact = (data) => async dispatch => {
	console.log('request data: ', data);
	axios
    .post(`${SERVER_URL}/api/orders/update_order`, data)
    .then(async res => {
		const table = await getUsableTables();
		if(res.data.success) {
			dispatch({
				type: UPDATE_CONTACT,
				payload: {data: data, table: table},
			});
		}
    })
    .catch(err =>{
      console.log('error: ', err);
	});
}

export const removeContact = (contactId) => dispatch => {
	axios
    .post(`${SERVER_URL}/api/orders/delete_order`, contactId)
    .then(res => {
		dispatch({
			type: REMOVE_CONTACT,
			payload: contactId,
		});
    })
    .catch(err =>{
      console.log('error: ', err);
	});
}

const getUsableTables = async () => {
	const res = await axios.post(`${SERVER_URL}/api/orders/get_active_tables`);
	return res.data.table;
}