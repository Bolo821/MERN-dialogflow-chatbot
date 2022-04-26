import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfile, setDisplayUpdateToast, updateUserPassword } from '../../../actions/authActions';

const useStyles = makeStyles((theme) => ({
	root: {
	  '& > *': {
		margin: theme.spacing(1),
		width: '100%',
	  },
	},
	toast: {
		'& > *': {
			position: 'fixed', 
			right: '50px', 
			top: '100px'
		}
	}
  }));

function AboutTab() {
	const [name, setName] = useState('');
	const [avatar, setAvatar] = useState(null);

	const [cPass, setCPass] = useState('');
	const [nPass, setNPass] = useState('');
	const [cnPass, setCNPass] = useState('');

	const id = useSelector(({user}) => user.auth.user.id);
	const displayText = useSelector(({user}) =>user.auth.displayText);

	const user = useSelector(({ user }) => user.auth.user);
	const shouldToast = useSelector(({ user }) => user.auth.shouldDisplayUpdateToast);

	useEffect(() => {
		setName(user.name);
	}, [user]);

	useEffect(() => {
		if(shouldToast) {
			toast(displayText);
		}
		dispatch(setDisplayUpdateToast(false));
	}, [shouldToast])

	const dispatch = useDispatch();

	const classes = useStyles();

	const handleNameChange = (e) => {
		setName(e.target.value);
	}

	const handleSave = (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('avatar', avatar);
		formData.append('id', user.id);
		formData.append('name', name);
		formData.append('email', user.email);

		dispatch(updateUserProfile(formData));
	}

	const handleCPassChange = (e) => {
		setCPass(e.target.value);
	}
	const handleNPassChange = (e) => {
		setNPass(e.target.value);
	}
	const handleCNPassChange = (e) => {
		setCNPass(e.target.value);
	}
	const handleSavePass = (e) => {
		e.preventDefault();
		let sendData ={
			id: id,
			current_password: cPass,
			new_password: nPass,
		}
		dispatch(updateUserPassword(sendData))
	}

	function canBeSubmittedInfo() {
		return name != '' && avatar != null;
	}
	function canBeSubmittedPassword() {
		return cPass != '' && cnPass != '' && nPass != '' && cnPass === nPass;
	}


	return (
		<div className="md:flex max-w-2xl">
			<ToastContainer className={classes.toast}/>
			<div className="flex flex-col flex-1 md:ltr:pr-32 md:rtl:pl-32">
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					<Card className="w-full mb-16 rounded-8 shadow">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									General Information
								</Typography>
							</Toolbar>
						</AppBar>
						<CardContent>
							<form className={classes.root} noValidate autoComplete="off">
								<div className="mb-24 w-full">
									<Typography className="font-bold mb-4 text-15">Name</Typography>
									<TextField 
										id="id-name" 
										label="name" 
										variant="outlined"
										className="w-full"
										value={name}
										onChange={handleNameChange}
										error={name == ''}
									/>
								</div>

								<div className="mb-24 w-full">
									<Typography className="font-bold mb-4 text-15">Email</Typography>
									<TextField 
										id="id-email" 
										label="email" 
										variant="outlined"
										className="w-full"
										InputProps={{
											readOnly: true,
										}}
										value={user.email}
									/>
								</div>

								<div className="mb-24 w-full">
									<Typography className="font-bold mb-4 text-15">Avatar</Typography>
									<TextField 
										id="id-avatar" 
										label="" 
										className="w-full"
										InputProps={{
											readOnly: true,
										}}
										onChange={(e) => {setAvatar(e.target.files[0])}}
										type="file"
										error={avatar == null}
									/>
								</div>
								<Button variant="contained" color="primary" onClick={handleSave} disabled={!canBeSubmittedInfo()}>
									Save
								</Button>
							</form>
						</CardContent>
					</Card>
					<Card className="w-full mb-16 rounded-8 shadow">
						<AppBar position="static" elevation={0}>
							<Toolbar className="px-8">
								<Typography variant="subtitle1" color="inherit" className="flex-1 px-12">
									Reset Password
								</Typography>
							</Toolbar>
						</AppBar>
						<CardContent>
							<form className={classes.root} noValidate autoComplete="off">
								<div className="mb-24 w-full">
									<Typography className="font-bold mb-4 text-15">Current Password</Typography>
									<TextField 
										id="id-current-password" 
										label="Current Password" 
										variant="outlined"
										className="w-full"
										value={cPass}
										onChange={handleCPassChange}
										type="password"
										error={cPass == ''}
									/>
								</div>

								<div className="mb-24 w-full">
									<Typography className="font-bold mb-4 text-15">New Password</Typography>
									<TextField 
										id="id-new-password" 
										label="New Password" 
										variant="outlined"
										className="w-full"
										value={nPass}
										onChange={handleNPassChange}
										type="password"
										error={nPass == ''}
									/>
								</div>

								<div className="mb-24 w-full">
									<Typography className="font-bold mb-4 text-15">Confirm Password</Typography>
									<TextField 
										id="id-confirm-password" 
										label="Confirm Password"
										variant="outlined"
										className="w-full"
										value={cnPass}
										onChange={handleCNPassChange}
										type="password"
										error={nPass != cnPass || cnPass == ''}
									/>
								</div>
								<Button variant="contained" color="primary" onClick={handleSavePass}
								disabled={!canBeSubmittedPassword()}>
									Change Password
								</Button>
							</form>
						</CardContent>
					</Card>
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default AboutTab;
