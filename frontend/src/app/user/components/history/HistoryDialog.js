import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { closeEditContactDialog } from './store/actions';

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		paddingBottom: '30px',
		marginRight: '20px',
	},
	table: {
		width: '100%',
	}
}));


function HistoryDialog(props) {
	const theme = useTheme();
	const classes = useStyles(theme);

	const orders = useSelector(({historyApp}) => historyApp.contacts.entities);
	const contactDialog = useSelector(({historyApp}) => historyApp.contacts.contactDialog);

	const dispatch = useDispatch();

	const closeComposeDialog = () => {
		dispatch(closeEditContactDialog());
	}
	

	return (
		<Dialog
			classes={{
				paper: 'm-24 rounded-8'
			}}
			{...contactDialog.props}
			onClose={closeComposeDialog}
			fullWidth
			maxWidth="md"
		>
			<AppBar position="static" className="shadow-md">
				<Toolbar className="flex w-full">
					<Typography variant="subtitle1" color="inherit">
						{contactDialog.type === 'new' ? 'New Plan' : 'Edit Plan'}
					</Typography>
				</Toolbar>
			</AppBar>
			<Card className={clsx("w-full rounded-8 shadow ", classes.root)}>
				<div className="p-16 pb-0 flex flex-row flex-wrap items-center justify-center">
					<div className="flex flex-col justify-center items-center block">
						<Typography className="h2" color="textSecondary">
							You have placed the following orders.
						</Typography>
					</div>
					{contactDialog.orderNum >= 0 ?
					<div className="block mt-16 w-full">
						<TableContainer component={Paper}>
							<Table className={classes.table} aria-label="Order result">
								<TableHead>
									<TableRow>
										<TableCell>Type</TableCell>
										<TableCell>Name</TableCell>
										<TableCell>Price</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
								{
									orders[contactDialog.orderNum].drink.map(ele => {
										return(
											<TableRow key={ele._id}>
												<TableCell>Drink</TableCell>
												<TableCell>{ele.name}</TableCell>
												<TableCell>{ele.price}</TableCell>
											</TableRow>
										)
									})
								}
								{
									orders[contactDialog.orderNum].starter.map(ele => {
										return(
											<TableRow key={ele._id}>
												<TableCell>Starter</TableCell>
												<TableCell>{ele.name}</TableCell>
												<TableCell>{ele.price}</TableCell>
											</TableRow>
										)
									})
								}
								{
									orders[contactDialog.orderNum].meal.map(ele => {
										return(
											<TableRow key={ele._id}>
												<TableCell>Meal</TableCell>
												<TableCell>{ele.name}</TableCell>
												<TableCell>{ele.price}</TableCell>
											</TableRow>
										)
									})
								}
								{
									orders[contactDialog.orderNum].dessert.map(ele => {
										return (
											<TableRow key={ele._id}>
												<TableCell>Dessert</TableCell>
												<TableCell>{ele.name}</TableCell>
												<TableCell>{ele.price}</TableCell>
											</TableRow>
										)
									})
								}
								{
									orders[contactDialog.orderNum].special.map(ele => {
										return (
											<TableRow key={ele._id}>
												<TableCell>Special</TableCell>
												<TableCell>{ele.name}</TableCell>
												<TableCell>{ele.price}</TableCell>
											</TableRow>
										)
									})
								}
								</TableBody>
							</Table>
						</TableContainer>
					</div>
					: ''}
				</div>
			</Card>
			<DialogActions className="justify-between p-8 ">
				<div className="flex flex-1 items-center justify-center">
					<div className="px-16">
						<Button
							variant="contained"
							color="primary"
							onClick={closeComposeDialog}
						>
							Close
						</Button>
					</div>
				</div>
			</DialogActions>
		</Dialog>
	);
}

export default HistoryDialog;
