import { useForm } from '@fuse/hooks';
import FuseUtils from '@fuse/utils/FuseUtils';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {
	updateContact,
	closeAcceptDialog,
} from './store/actions';

import {MdDescription } from 'react-icons/md'

const defaultFormState = {
	id: -1,
	qrcode: '',
	deleted: false,
	prevQrcode: '',
};

function AcceptDialog(props) {
	const dispatch = useDispatch();
	const acceptDialog = useSelector(({ plansApp }) => plansApp.contacts.acceptDialog);

	const { form, handleChange, setForm } = useForm(defaultFormState);
	const table = useSelector(({plansApp}) => plansApp.contacts.table);

	const initDialog = useCallback(() => {
		setForm({
			...defaultFormState,
			...acceptDialog.data,
			prevQrcode: acceptDialog.data.qrcode,
		});
	}, [acceptDialog.data, setForm]);

	useEffect(() => {
		if (acceptDialog.props.open) {
			initDialog();
		}
	}, [acceptDialog.props.open, initDialog]);

	function closeComposeDialog(e) {
		if(e != undefined || e != null) {
			e.preventDefault();
		}
		return dispatch(closeAcceptDialog());
	}

	function canBeSubmitted() {
		return form.qrcode != '';
	}

	function handleSubmit(event) {
		event.preventDefault();
		closeComposeDialog();
		dispatch(updateContact({...form, status: 'accepted'}));
		setForm({
			...defaultFormState,
			prevQrcode: acceptDialog.data.qrcode,
		});
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...acceptDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						QRCode
					</Typography>
				</Toolbar>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>

				<div className="flex">
				<div className="min-w-48 pt-20">
					<MdDescription size={30}/>
				</div>
				<FormControl variant="outlined" className="w-full">
					<InputLabel id="qrcode-label">QRCode</InputLabel>
					<Select
						labelId="qrcode-label"
						id="qrcode"
						name="qrcode"
						value={form.qrcode}
						onChange={handleChange}
						label="QRCode"
						fullWidth
						error={form.qrcode === ''}
					>
						<MenuItem value={acceptDialog.data.qrcode}>{acceptDialog.data.qrcode}</MenuItem>
						{ 
							table.map(ele => {
								return (
									<MenuItem key={ele.qrcode} value={ele.qrcode}>{ele.qrcode}</MenuItem>
								)
							})
						}
					</Select>
				</FormControl>
			</div>

				</DialogContent>

				<DialogActions className="justify-between p-8 ">
					<div className="flex flex-1 items-center justify-center">
						<div className="px-16">
							<Button
								variant="contained"
								color="primary"
								onClick={handleSubmit}
								type="submit"
								disabled={!canBeSubmitted()}
							>
								Add
							</Button>
						</div>
						<div className="px-16">
							<Button
								variant="contained"
								color="secondary"
								type="submit"
								onClick={closeComposeDialog}
							>
								Cancel
							</Button>
						</div>
					</div>
				</DialogActions>
			</form>
		</Dialog>
	);
}

export default AcceptDialog;
