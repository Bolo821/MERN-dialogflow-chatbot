//import { getUserData } from 'app/main/apps/contacts/store/actions/user.actions';
import axios from 'axios';
import { SERVER_URL } from 'app/ApiConfig';
import { SET_GUEST_ORDER_HISTORY } from  'app/user/actions/types';

export const SET_MESSAGE = '[CHAT APP] SET MESSAGE';
export const SET_ORDER = '[CHAT APP] SET ORDER';
export const SET_SHOW_ORDERS = '[CHAT APP] SET SHOW ORDERS';
export const RESET_ORDERS = '[CHAT APP] RESET ORDERS';
export const RESET_CHAT_MESSAGES = '[CHAT APP] RESET CHAT MESSAGES';

export const setMessage = (msg) => {
	const time = getTime();
	return {
		type: SET_MESSAGE,
		payload: {
			messages: [{...msg, time: time}], 
			items: [],
			type: '',
			showOrders: false,
		},
	}
}

export const sendTextQuery = (text, userID) => dispatch => {
	axios.post(`${SERVER_URL}/api/df_text_query`, {
		text,
		userID: userID,
	}).then((res) => {
		const time = getTime();
		let saveData = res.data.queryResult.fulfillmentMessages.map(ele => {
			let message = {
				sender: "bot",
				content: ele.text.text[0],
				time: time,
			};
			return message
		})
		dispatch({
			type: SET_MESSAGE,
			payload: {
				messages: saveData, 
				items: res.data.items,
				type: res.data.type,
				showOrders: res.data.showOrders,
			},
		});
	}).catch(e => {
		const time = getTime();
		let message = {
			sender: 'bot',
			content: 'I am having troubles. I need to terminate, will be back later',
			time: time,
		}
		setTimeout(function() {
			dispatch({
				type: SET_MESSAGE,
				payload: {
					messages: [message],
					items: [],
					type: '',
					showOrders: false,
				},
			});
		}, 2000);
	});
}

export const sendEventQuery = (event, userID) => dispatch => {
	axios.post(`${SERVER_URL}/api/df_event_query`, {
		event, 
		userID: userID
	}).then(res => {
		const time = getTime();
		let saveData = res.data.queryResult.fulfillmentMessages.map(ele => {
			let message = {
				sender: "bot",
				content: ele.text.text[0],
				time: time,
			};
			return message;
		})
		dispatch({
			type: SET_MESSAGE,
			payload: {
				messages: saveData,
				items: [],
				type: '',
				flag: res.data.showOrders,
			},
		});
	}).catch(e => {
		const time = getTime();
		let message = {
			sender: 'bot',
			content: 'I am having troubles. I need to terminate, will be back later',
			time: time,
		}
		setTimeout(function() {
			dispatch({
				type: SET_MESSAGE,
				payload: {
					messages: [message], 
					items: [],
					type: '',
				},
			});
		}, 2000);
	});
}

const getTime = () => {
	let date = new Date();
	// let time = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}:${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}`;
	return date.toISOString();
}

export const orderDish = (type, dish, userID) => dispatch => {
	axios.post(`${SERVER_URL}/api/order_dish`, {dish: dish, userID: userID}).then((res) => {
		const time = getTime();
		let saveData = res.data.fulfillmentMessages.map(ele => {
			let message = {
				sender: "bot",
				content: ele.text.text[0],
				time: time,
			};
			return message;
		})
		dispatch({
			type: SET_MESSAGE,
			payload: {
				messages: saveData,
				items: [],
				type: '',
			},
		});
		dispatch({
			type: SET_ORDER,
			payload: {
				type: type,
				dish: dish,
			}
		})
	}).catch(e => {
		const time = getTime();
		let message = {
			sender: 'bot',
			content: 'I am having troubles. I need to terminate, will be back later',
			time: time,
		}
		setTimeout(function() {
			dispatch({
				type: SET_MESSAGE,
				payload: {
					messages: [message], 
					items: [],
					type: '',
				},
			});
		}, 2000);
	});
}

export const setShowOrders = (flag) => {
	return {
		type: SET_SHOW_ORDERS,
		payload: flag,
	}
}

export const confirmOrders = (flag, userID, table=-1) => (dispatch, getState) => {
	if(flag) {
		const cstate = getState();
		let orders = cstate.chatApp.chats.orders;
		let drink = [];
		let starter = [];
		let meal = [];
		let dessert = [];
		let special = [];
		orders.map(ele => {
			switch(ele.type) {
				case 'drink': {
					drink.push(ele.dish._id);
					break;
				}
				case 'starter': {
					starter.push(ele.dish._id);
					break;
				}
				case 'meal': {
					meal.push(ele.dish._id);
					break;
				}
				case 'dessert': {
					dessert.push(ele.dish._id);
					break;
				}
				case 'special': {
					special.push(ele.dish._id);
					break;
				}
			}
		});
		let time = getTime();

		axios.post(`${SERVER_URL}/api/orders/add`, {
			user: userID,
			drink: drink,
			starter: starter,
			meal: meal,
			dessert: dessert,
			special: special,
			date: time,
			table: table,
		}).then(res => {
			const time = getTime();
			let saveData = res.data.queryResult.fulfillmentMessages.map(ele => {
				let message = {
					sender: "bot",
					content: ele.text.text[0],
					time: time,
				};
				return message
			})
			dispatch({
				type: SET_MESSAGE,
				payload: {
					messages: saveData, 
					items: [],
					type: '',
					showOrders: false,
				},
			});

			if(userID == -2) {
				let orders = cstate.chatApp.chats.orders;
				let drink = [];
				let starter = [];
				let meal = [];
				let dessert = [];
				let special = [];

				orders.map(ele => {
					switch(ele.type) {
						case 'drink': {
							drink.push(ele.dish);
							break;
						}
						case 'starter': {
							starter.push(ele.dish);
							break;
						}
						case 'meal': {
							meal.push(ele.dish);
							break;
						}
						case 'dessert': {
							dessert.push(ele.dish);
							break;
						}
						case 'special': {
							special.push(ele.dish);
							break;
						}
					}
				});
				dispatch({
					type: SET_GUEST_ORDER_HISTORY,
					payload: {
						user: userID,
						drink: drink,
						starter: starter,
						meal: meal,
						dessert: dessert,
						special: special,
						date: time,
						table: table,
					},
				})
			}

			dispatch({
				type: RESET_ORDERS,
			});

			
		}).catch(e => {
			const time = getTime();
			let message = {
				sender: 'bot',
				content: 'I am having troubles. I need to terminate, will be back later',
				time: time,
			}
			setTimeout(function() {
				dispatch({
					type: SET_MESSAGE,
					payload: {
						messages: [message],
						items: [],
						type: '',
						showOrders: false,
					},
				});
			}, 2000);
		});
	} else {
		axios.post(`${SERVER_URL}/api/orders/cancel_in_chat`, {userID: userID}).then(res => {
			const time = getTime();
			let saveData = res.data.queryResult.fulfillmentMessages.map(ele => {
				let message = {
					sender: "bot",
					content: ele.text.text[0],
					time: time,
				};
				return message
			})
			dispatch({
				type: SET_MESSAGE,
				payload: {
					messages: saveData, 
					items: [],
					type: '',
					showOrders: false,
				},
			});
			dispatch({
				type: RESET_ORDERS,
			})
		}).catch(e => {
			const time = getTime();
			let message = {
				sender: 'bot',
				content: 'I am having troubles. I need to terminate, will be back later',
				time: time,
			}
			setTimeout(function() {
				dispatch({
					type: SET_MESSAGE,
					payload: {
						messages: [message],
						items: [],
						type: '',
						showOrders: false,
					},
				});
			}, 2000);
		});
	}
}

export const resetChatMessages = () => {
	return {
		type: RESET_CHAT_MESSAGES,
	}
}
