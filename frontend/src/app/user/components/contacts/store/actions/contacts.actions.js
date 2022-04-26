//import { getUserData } from 'app/main/apps/contacts/store/actions/user.actions';
import axios from 'axios';
import { SERVER_URL } from 'app/ApiConfig';

export const GET_CONTACTS = '[CONTACTS APP] GET CONTACTS';
export const SET_SEARCH_TEXT = '[CONTACTS APP] SET SEARCH TEXT';
export const OPEN_NEW_CONTACT_DIALOG = '[CONTACTS APP] OPEN NEW CONTACT DIALOG';
export const CLOSE_NEW_CONTACT_DIALOG = '[CONTACTS APP] CLOSE NEW CONTACT DIALOG';
export const OPEN_EDIT_CONTACT_DIALOG = '[CONTACTS APP] OPEN EDIT CONTACT DIALOG';
export const CLOSE_EDIT_CONTACT_DIALOG = '[CONTACTS APP] CLOSE EDIT CONTACT DIALOG';
export const ADD_CONTACT = '[CONTACTS APP] ADD CONTACT';
export const UPDATE_CONTACT = '[CONTACTS APP] UPDATE CONTACT';
export const REMOVE_CONTACT = '[CONTACTS APP] REMOVE CONTACT';
export const REMOVE_CONTACTS = '[CONTACTS APP] REMOVE CONTACTS';
export const TOGGLE_STARRED_CONTACT = '[CONTACTS APP] TOGGLE STARRED CONTACT';
export const TOGGLE_STARRED_CONTACTS = '[CONTACTS APP] TOGGLE STARRED CONTACTS';
export const SET_CONTACTS_STARRED = '[CONTACTS APP] SET CONTACTS STARRED ';
export const SET_ALERT = '[CONTACTS APP] SET ALERT';

export const getContacts = () => dispatch =>  {
	axios
    .post(`${SERVER_URL}/api/users/get_users`)
    .then(res => {
		dispatch({
			type: GET_CONTACTS,
			payload: res.data.data,
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
    .post(`${SERVER_URL}/api/users/add_user`, newContact)
    .then(res => {
		if(res.data.success) {
			dispatch({
				type: ADD_CONTACT,
				payload: {...newContact, avatar: res.data.avatar, id: res.data.id},
			});
		} else {
			dispatch({
				type: SET_ALERT,
				payload: {message: "User already exist.", isOpen: true}
			})
		}
    })
    .catch(err =>{
      console.log('error: ', err);
	});
}

export const updateContact = (contact) => dispatch => {
	axios
    .post(`${SERVER_URL}/api/users/update_user`, contact)
    .then(res => {
		dispatch({
			type: UPDATE_CONTACT,
			payload: contact,
		});
    })
    .catch(err =>{
      console.log('error: ', err);
	});
}

export const removeContact = (contactId) => dispatch => {
	axios
    .post(`${SERVER_URL}/api/users/delete_user`, contactId)
    .then(res => {
		if(res.data.success) {
			dispatch({
				type: REMOVE_CONTACT,
				payload: contactId,
			});
		}
    })
    .catch(err =>{
      console.log('error: ', err);
	});
}

export const setAlert = (data) => {
	return {
		type: SET_ALERT,
		payload: data,
	}
}

// export function removeContacts(contactIds) {
// 	return (dispatch, getState) => {
// 		const { routeParams } = getState().contactsApp.contacts;

// 		const request = axios.post('/api/contacts-app/remove-contacts', {
// 			contactIds
// 		});

// 		return request.then(response =>
// 			Promise.all([
// 				dispatch({
// 					type: REMOVE_CONTACTS
// 				})
// 			]).then(() => dispatch(getContacts(routeParams)))
// 		);
// 	};
// }
