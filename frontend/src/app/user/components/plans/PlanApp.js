import FusePageSimple from '@fuse/core/FusePageSimple';
import withReducer from 'app/store/withReducer';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useDeepCompareEffect } from '@fuse/hooks';
import PlanHeader from './PlanHeader';
import PlanList from './PlanList';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import PlanDialog from './PlanDialog';
import AcceptDialog from './AcceptDialog';

function PlanApp(props) {
	const dispatch = useDispatch();

	const user = useSelector(({user}) => user.auth.user);
	let id = user.id;
	if(user.permission === 'superadmin') id = -1;

	const pageLayout = useRef(null);
	const routeParams = useParams();

	useDeepCompareEffect(() => {
		dispatch(Actions.resetOrderList());
		if(user.name) {
			dispatch(Actions.getContacts({id}));
		}
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
				header={<PlanHeader />}
				content={<PlanList />}
				sidebarInner
				ref={pageLayout}
				innerScroll
			/>
			<PlanDialog />
			<AcceptDialog />
		</>
	);
}

export default withReducer('plansApp', reducer)(PlanApp);
