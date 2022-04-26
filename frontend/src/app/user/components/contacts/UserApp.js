import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import UserHeader from './UserHeader';
import UserList from './UserList';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import Paper from '@material-ui/core/Paper';
import UserDialog from './UserDialog';
import { makeStyles } from '@material-ui/core/styles';

import { setAlert } from './store/actions';

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
	toast: {
		'& > *': {
			position: 'fixed', 
			right: '50px', 
			top: '100px'
		}
	}
  }));

function UserApp(props) {
	const dispatch = useDispatch();
	const classes = useStyles();

	const pageLayout = useRef(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		dispatch(Actions.getContacts());
		// dispatch(Actions.getUserData());
	}, [dispatch, routeParams]);

	const shouldToast = useSelector(state => state.contactsApp.contacts.isOpenToast);
	const message = useSelector(state => state.contactsApp.contacts.toastMessage);
	useEffect(() => {
		if(shouldToast) {
			toast(message);
			dispatch(setAlert({isOpen: false, message: ''}));
		}
	}, [shouldToast])

	return (
		<>
			<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				header={<UserHeader />}
				content={<UserList />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<ToastContainer className={classes.toast}/>
			<UserDialog />
		</>
	);
}

export default withReducer('contactsApp', reducer)(UserApp);
