import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import {MdDashboard} from 'react-icons/md';


function DashboardHeader(props) {
	return (
		<div className="flex flex-1 items-center justify-between p-4 sm:p-24">
			<div className="flex flex-shrink items-center sm:w-224">
				<div className="flex items-center">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<MdDashboard size={32}/>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography variant="h6" className="mx-12 sm:flex">
							Dashboard
						</Typography>
					</FuseAnimate>
				</div>
			</div>
		</div>
	);
}

export default DashboardHeader;
