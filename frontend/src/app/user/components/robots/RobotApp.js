import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import RobotHeader from './RobotHeader';
import RobotList from './RobotList';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import Paper from '@material-ui/core/Paper';
import RobotDialog from './RobotDialog';

function RobotApp(props) {
	const dispatch = useDispatch();

	const pageLayout = useRef(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		dispatch(Actions.getContacts());
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
				header={<RobotHeader />}
				content={<RobotList />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<RobotDialog />
		</>
	);
}

export default withReducer('robotsApp', reducer)(RobotApp);
