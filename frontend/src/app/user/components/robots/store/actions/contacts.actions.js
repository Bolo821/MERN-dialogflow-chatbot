//import { getUserData } from 'app/main/apps/contacts/store/actions/user.actions';
import axios from 'axios';
import { SERVER_URL } from 'app/ApiConfig';
export const GET_CONTACTS = '[STOCK APP] GET ROBOTS';
export const SET_SEARCH_TEXT = '[STOCK APP] SET SEARCH TEXT';
export const OPEN_NEW_CONTACT_DIALOG = '[STOCK APP] OPEN NEW ROBOTS DIALOG';
export const CLOSE_NEW_CONTACT_DIALOG = '[STOCK APP] CLOSE NEW ROBOTS DIALOG';
export const OPEN_EDIT_CONTACT_DIALOG = '[STOCK APP] OPEN EDIT ROBOTS DIALOG';
export const CLOSE_EDIT_CONTACT_DIALOG = '[STOCK APP] CLOSE EDIT ROBOTS DIALOG';
export const ADD_CONTACT = '[STOCK APP] ADD ROBOTS';
export const UPDATE_CONTACT = '[STOCK APP] UPDATE ROBOTS';
export const REMOVE_CONTACT = '[STOCK APP] REMOVE ROBOT';
export const REMOVE_CONTACTS = '[STOCK APP] REMOVE ROBOTS';

export const getContacts = () => dispatch =>  {
	axios
    .post(`${SERVER_URL}/api/stock/getItems`)
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
		data
	};
}

export function closeEditContactDialog() {
	return {
		type: CLOSE_EDIT_CONTACT_DIALOG
	};
}

export const addContact = (newContact) => dispatch => {
	axios
    .post(`${SERVER_URL}/api/stock/add_item`, newContact)
    .then(res => {
		dispatch({
			type: ADD_CONTACT,
			payload: {...res.data.item},
		});
    })
    .catch(err =>{
      console.log('error: ', err);
	});
}

export const updateContact = (contact) => dispatch => {
	axios
    .post(`${SERVER_URL}/api/stock/update_item`, contact)
    .then(res => {
		dispatch({
			type: UPDATE_CONTACT,
			payload: res.data.item,
		});
    })
    .catch(err =>{
      console.log('error: ', err);
	});
}

export const removeContact = (data) => dispatch => {
	axios
    .post(`${SERVER_URL}/api/stock/delete_item`, data)
    .then(res => {
		dispatch({
			type: REMOVE_CONTACT,
			payload: data,
		});
    })
    .catch(err =>{
      console.log('error: ', err);
	});
}
