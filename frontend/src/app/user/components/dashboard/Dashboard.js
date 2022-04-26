import FusePageSimple from '@fuse/core/FusePageSimple';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import DashboardHeader from './DashboardHeader';

const useStyles = makeStyles(theme => ({
	layoutRoot: {}
}));

function Dashboard(props) {
	const classes = useStyles(props);

	return (
		<FusePageSimple
				classes={{
					contentWrapper: 'p-0 sm:p-24 h-full',
					content: 'flex flex-col h-full',
					leftSidebar: 'w-256 border-0',
					header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
					wrapper: 'min-h-0'
				}}
				header={<DashboardHeader />}
				content={<></>}
				sidebarInner
				innerScroll
			/>
	);
}

export default Dashboard;
