import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from '@lodash';
import { confirmOrders } from './store/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
	root: {
		maxWidth: '500px',
		paddingBottom: '30px',
		marginRight: '20px',
	},
	table: {
		width: '100%',
	}
}));

function OrderList(props) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const table = useParams().table;

	const orders = useSelector(({chatApp}) => chatApp.chats.orders);
	const showOrders = useSelector(({chatApp}) => chatApp.chats.showOrders);
	const user = useSelector(({user}) => user.auth.user);

	let drink = [];
	let starter = [];
	let meal = [];
	let dessert = [];
	let special = [];
	
	orders.map(ele => {
		switch(ele.type) {
			case 'drink': {
				drink.push(ele.dish);
				break;
			}
			case 'starter': {
				starter.push(ele.dish);
				break;
			}
			case 'meal': {
				meal.push(ele.dish);
				break;
			}
			case 'dessert': {
				dessert.push(ele.dish);
				break;
			}
			case 'special': {
				special.push(ele.dish);
				break;
			}
		}
		return;
	})
	const dispatch = useDispatch();

	const ConfirmOrder = (e) => {
		e.preventDefault();
		let id = user.id;
		if(!user.name) {
			id = -2;
		}
		dispatch(confirmOrders(true, id, table));
	}

	const CancelOrder = (e) => {
		e.preventDefault();
		let id = user.id;
		if(!user.name) {
			id = -2;
		}
		dispatch(confirmOrders(false, id));
	}

	if(showOrders) {
		return (
			<Card className={clsx("w-full rounded-8 shadow ", classes.root)}>
				<div className="p-16 pb-0 flex flex-row flex-wrap items-center justify-center">
					<div className="flex flex-col justify-center items-center block">
						<Typography className="h2" color="textSecondary">
							You have placed the following orders.
						</Typography>
					</div>
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
									drink.map(ele => {
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
									starter.map(ele => {
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
									meal.map(ele => {
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
									dessert.map(ele => {
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
									special.map(ele => {
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
				</div>
				<div className="flex flex-row justify-center items-center mt-16">
					<Button
						variant="contained"
						color="primary"
						className="mx-auto"
						value="legacy"
						onClick={ConfirmOrder}
					>
						OK
					</Button>
					<Button
						variant="contained"
						color="secondary"
						className="mx-auto"
						value="legacy"
						onClick={CancelOrder}
					>
						Cancel
					</Button>
				</div>
			</Card>
		);
	} else {
		return (<></>);
	}
	
}

export default React.memo(OrderList);
