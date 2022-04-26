import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import AboutTab from './tabs/AboutTab';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	layoutHeader: {
		height: 200,
		minHeight: 200,
		[theme.breakpoints.down('md')]: {
			height: 200,
			minHeight: 200
		}
	},
}));

function Profile() {
	const classes = useStyles();
	const user = useSelector(({ user }) => user.auth.user);

	return (
		<FusePageSimple
			classes={{
				header: classes.layoutHeader,
				toolbar: 'min-h-56 h-56 items-end'
			}}
			header={
				<div className="p-24 flex flex-1 flex-codisableRipple l items-center justify-center md:flex-row md:items-end">
					<div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
						<FuseAnimate animation="transition.expandIn" delay={300}>
							<Avatar className="w-96 h-96" src={user.avatar} />
						</FuseAnimate>
						<FuseAnimate animation="transition.slideLeftIn" delay={300}>
							<Typography
								className="md:mx-24 text-24 md:text-32 my-8 md:my-0"
								variant="h4"
								color="inherit"
							>
								{user.name}
							</Typography>
						</FuseAnimate>
					</div>
				</div>
			}
			content={
				<div className="p-16 sm:p-24">
					<AboutTab />
				</div>
			}
		/>
	);
}

export default Profile;
