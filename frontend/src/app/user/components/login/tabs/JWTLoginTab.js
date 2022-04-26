import { TextFieldFormsy } from '@fuse/core/formsy';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';
import Formsy from 'formsy-react';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from 'app/user/actions/authActions';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfile, setDisplayUpdateToast, updateUserPassword } from '../../../actions/authActions';

const useStyles = makeStyles((theme) => ({
	toast: {
		'& > *': {
			position: 'absolute', 
			right: '10px', 
			top: '10px'
		}
	},
	form: {
		position: 'relative',
	}
  }));

function JWTLoginTab(props) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(state => state.user.auth.isAuthenticated);
	const shouldDisplayUpdateToast = useSelector(state => state.user.auth.shouldDisplayUpdateToast);
	const displayText = useSelector(state => state.user.auth.displayText);
	const history = useHistory();

	const [isFormValid, setIsFormValid] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const formRef = useRef(null);

	useEffect(() => {
		if(isAuthenticated) {
			history.push('/dashboard');
		}
	}, [ isAuthenticated ]);

	useEffect(() => {
		if(shouldDisplayUpdateToast) {
			toast(displayText);
		}
		dispatch(setDisplayUpdateToast(false));
	}, [shouldDisplayUpdateToast])

	function disableButton() {
		setIsFormValid(false);
	}

	function enableButton() {
		setIsFormValid(true);
	}

	function handleSubmit(model) {
		dispatch(loginUser(model));
	}

	return (
		<div className="w-full">
			<Formsy
				onValidSubmit={handleSubmit}
				onValid={enableButton}
				onInvalid={disableButton}
				ref={formRef}
				className={clsx("flex flex-col justify-center w-full", classes.form)}
			>
				<ToastContainer className={classes.toast}/>
				<TextFieldFormsy
					className="mb-16"
					type="text"
					name="email"
					label="Email"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<Icon className="text-20" color="action">
									email
								</Icon>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<TextFieldFormsy
					className="mb-16"
					type="password"
					name="password"
					label="Password"
					validations={{
						minLength: 4
					}}
					validationErrors={{
						minLength: 'Min character length is 4'
					}}
					InputProps={{
						className: 'pr-2',
						type: showPassword ? 'text' : 'password',
						endAdornment: (
							<InputAdornment position="end">
								<IconButton onClick={() => setShowPassword(!showPassword)}>
									<Icon className="text-20" color="action">
										{showPassword ? 'visibility' : 'visibility_off'}
									</Icon>
								</IconButton>
							</InputAdornment>
						)
					}}
					variant="outlined"
					required
				/>

				<Button
					type="submit"
					variant="contained"
					color="primary"
					className="w-full mx-auto mt-16"
					aria-label="LOG IN"
					disabled={!isFormValid}
					value="legacy"
				>
					Login
				</Button>
			</Formsy>
		</div>
	);
}

export default JWTLoginTab;
