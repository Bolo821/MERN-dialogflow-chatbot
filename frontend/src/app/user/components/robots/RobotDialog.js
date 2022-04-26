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
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import {
	updateContact,
	addContact,
	closeNewContactDialog,
	closeEditContactDialog
} from './store/actions';

import {MdDescription } from 'react-icons/md'

const defaultFormState = {
	type: '',
	name: '',
	price: '',
	id: -1,
};

function RobotDialog(props) {
	const dispatch = useDispatch();
	const contactDialog = useSelector(({ robotsApp }) => robotsApp.contacts.contactDialog);
	const users = useSelector(({robotsApp}) => robotsApp.contacts.users);

	const { form, handleChange, setForm } = useForm(defaultFormState);

	const [image, setImage] = useState(null);

	const initDialog = useCallback(() => {
		/**
		 * Dialog type: 'edit'
		 */
		if (contactDialog.type === 'edit' && contactDialog.data) {
			setForm({ ...contactDialog.data });
		}

		/**
		 * Dialog type: 'new'
		 */
		if (contactDialog.type === 'new') {
			setForm({
				...defaultFormState,
				...contactDialog.data,
				id: FuseUtils.generateGUID()
			});
			setImage(null);
		}
	}, [contactDialog.data, contactDialog.type, setForm]);

	useEffect(() => {
		/**
		 * After Dialog Open
		 */
		if (contactDialog.props.open) {
			initDialog();
		}
	}, [contactDialog.props.open, initDialog]);

	function closeComposeDialog(e) {
		if(e != undefined || e != null) {
			e.preventDefault();
		}
		return contactDialog.type === 'edit' ? dispatch(closeEditContactDialog()) : dispatch(closeNewContactDialog());
	}

	function canBeSubmitted() {
		return form.type != '' && form.name != '' && form.price != '' && image != null;
	}

	function handleSubmit(event) {
		event.preventDefault();
		if(image.size > 10000000) {
			alert('The file size is too large.');
			return;
		}

		const formData = new FormData();
		formData.append('image', image);
		formData.append('id', form.id);
		formData.append('name', form.name);
		formData.append('price', form.price);
		formData.append('type', form.type);

		if (contactDialog.type === 'new') {
			dispatch(addContact(formData));
		} else {
			dispatch(updateContact(formData));
		}
		closeComposeDialog();
	}

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...contactDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="xs"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{contactDialog.type === 'new' ? 'New User' : 'Edit User'}
					</Typography>
				</Toolbar>
			</AppBar>
			<form noValidate onSubmit={handleSubmit} className="flex flex-col md:overflow-hidden">
				<DialogContent classes={{ root: 'p-24' }}>
				<div className="flex mb-20">
					<div className="min-w-48 pt-20">
						<MdDescription size={30}/>
					</div>
					{ contactDialog.type === 'edit' ?
						<FormControl variant="outlined" className="w-full">
							<InputLabel id="type-label">Type</InputLabel>
							<Select
								labelId="type-label"
								id="type"
								name="type"
								value={form.type}
								onChange={handleChange}
								label="Type"
								fullWidth
								error={form.type === ''}
								inputProps={{
									readOnly: true,
								}}
							>
								<MenuItem value='drink'>drink</MenuItem>
								<MenuItem value='starter'>starter</MenuItem>
								<MenuItem value='meal'>meal</MenuItem>
								<MenuItem value='dessert'>dessert</MenuItem>
								<MenuItem value='special'>special</MenuItem>
							</Select>
						</FormControl> :
						<FormControl variant="outlined" className="w-full">
							<InputLabel id="type-label">Type</InputLabel>
							<Select
								labelId="type-label"
								id="type"
								name="type"
								value={form.type}
								onChange={handleChange}
								label="Type"
								fullWidth
								error={form.type === ''}
							>
								<MenuItem value='drink'>drink</MenuItem>
								<MenuItem value='starter'>starter</MenuItem>
								<MenuItem value='meal'>meal</MenuItem>
								<MenuItem value='dessert'>dessert</MenuItem>
								<MenuItem value='special'>special</MenuItem>
							</Select>
						</FormControl>
					}
				</div>

					<div className="flex mb-20">
						<div className="min-w-48 pt-20">
							<MdDescription size={30}/>
						</div>
						<TextField
							className="mb-24"
							label="Name"
							id="name"
							name="name"
							value={form.name}
							onChange={handleChange}
							variant="outlined"
							fullWidth
							error={form.name===''}
						/>
					</div>

					<div className="flex mb-20">
						<div className="min-w-48 pt-20">
							<MdDescription size={30}/>
						</div>
						<TextField
							className="mb-24"
							label="Price"
							id="price"
							name="price"
							type='number'
							value={form.price}
							onChange={handleChange}
							variant="outlined"
							fullWidth
							error={form.price === ''}
						/>
					</div>

					<div className="mb-24 w-full">
						<Typography className="font-bold mb-4 text-15">Image</Typography>
						<TextField 
							id="id-image" 
							label="" 
							className="w-full"
							onChange={(e) => {setImage(e.target.files[0])}}
							type="file"
							error={image === null}
						/>
					</div>

				</DialogContent>

				{contactDialog.type === 'new' ? (
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
				) : (
					<DialogActions className="justify-between p-8">
						<div className="flex flex-1 items-center justify-center">
							<div className="px-16">
								<Button
									variant="contained"
									color="primary"
									type="submit"
									onClick={handleSubmit}
									disabled={!canBeSubmitted()}
								>
									Save
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
				)}
			</form>
		</Dialog>
	);
}

export default RobotDialog;
