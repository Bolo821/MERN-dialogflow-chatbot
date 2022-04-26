import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import HistoryHeader from './HistoryHeader';
import HistoryList from './HistoryList';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import HistoryDialog from './HistoryDialog';

function HistoryApp(props) {
	const dispatch = useDispatch();

	const user = useSelector(({user}) => user.auth.user);
	let id = user.id;
	if(user.permission === 'superadmin') id = -1;

	const pageLayout = useRef(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		dispatch(Actions.getContacts({id}));
	}, [dispatch, routeParams]);

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
				header={<HistoryHeader />}
				content={<HistoryList />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<HistoryDialog />
		</>
	);
}

export default withReducer('historyApp', reducer)(HistoryApp);
