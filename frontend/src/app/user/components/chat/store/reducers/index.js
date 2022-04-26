import { combineReducers } from 'redux';
import chats from './chats.reducer';

const reducer = combineReducers({
	chats,
});

export default reducer;
