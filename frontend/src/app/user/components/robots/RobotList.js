import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RobotTable from './RobotTable';
import * as Actions from './store/actions';
import { makeStyles } from '@material-ui/core/styles';
import { removeContact } from './store/actions'
import Button from '@material-ui/core/Button';

import { useConfirm } from 'material-ui-confirm';

const useStyle = makeStyles(() => ({
	image: {
		maxWidth: '64px',
		'& > img': {
			width: '100%',
		}
	}
}));

function RobotList(props) {
	const dispatch = useDispatch();
	const drinks = useSelector(({ robotsApp }) => robotsApp.contacts.drink);
	const starters = useSelector(({robotsApp}) => robotsApp.contacts.starter);
	const meals = useSelector(({robotsApp}) => robotsApp.contacts.meal);
	const desserts = useSelector(({robotsApp}) => robotsApp.contacts.dessert);
	const specials = useSelector(({robotsApp}) => robotsApp.contacts.special);
	const searchText = useSelector(({ robotsApp }) => robotsApp.contacts.searchText);
	const classes = useStyle();

	const [filteredData, setFilteredData] = useState(null);
	const confirm = useConfirm();

	const columns = React.useMemo(
		() => [
			{
				Header: 'No',
				accessor: 'no',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Type',
				accessor: 'type',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'Name',
				accessor: 'name',
				sortable: true
			},
			{
				Header: 'Price',
				accessor: 'price',
				sortable: true
			},
			{
				Header: 'Image',
				id: 'item-image',
				width: 128,
				sortable: false,
				Cell: ({row}) => {
					return (
						<div className={classes.image}>
							<img src={row.original.image}></img>
						</div>
					)
				}
			},
			{
				Header: 'Edit',
				id: 'action-edit',
				width: 128,
				sortable: false,
				Cell: ({ row }) => {
					return (
						<div className="flex items-center" 
							onClick={() => {dispatch(Actions.openEditContactDialog(row.original))}}
						>
							<IconButton>
								<Icon>edit</Icon>
							</IconButton>
						</div>
					)
				}
			},
			{
				Header: 'Remove',
				id: 'action-cancel',
				width: 128,
				sortable: false,
				Cell: ({ row }) => {
					return (
						<div className="flex items-center"
							onClick={() => {
								let option = {
									title: <span style={{fontSize: '20px'}}>Are you sure?</span>,
									description: <span style={{fontSize: '16px'}}>This item will be premanently deleted! Please make sure that this item is not ordered item! </span>,
									cancellationText: <span style={{fontSize: '16px'}}>No</span>,
									confirmationText: <span style={{fontSize: '16px'}}>Yes</span>,
									confirmationButtonProps: {variant: "contained", style: {margin: '0 10px 10px 0', background: 'rgb(20, 30, 60)'}},
									cancellationButtonProps: {variant: 'contained', style: {margin: '0 10px 10px 0', background: 'rgb(20, 30, 60)', color: 'white'}},
								}
								confirm(option).then(() => {
									dispatch(Actions.removeContact({id: row.original.id, type: row.original.type}))
								}).catch (() => {
									console.log('error in confirm');
								});
							}}
						>
							<IconButton>
								<Icon>delete</Icon>
							</IconButton>
						</div>
					)
				}
			}
		],
		[dispatch]
	);

	useEffect(() => {
		function getFilteredArray(entities, _searchText) {
			const arr = Object.keys(entities).map(id => entities[id]);
			if (_searchText.length === 0) {
				return arr;
			}
			return FuseUtils.filterArrayByString(arr, _searchText);
		}

		let displayData = [];
		let count = 1;
		let drink_items = drinks.map(drink => {
			return {
				no: count++,
				type: 'drink',
				name: drink.name,
				price: drink.price,
				id: drink._id,
				image: drink.image,
			};
		})
		displayData = [...displayData, ...drink_items];

		let starter_items = starters.map(starter => {
			return {
				no: count++,
				type: 'starter',
				name: starter.name,
				price: starter.price,
				id: starter._id,
				image: starter.image,
			}
		});
		displayData = [...displayData, ...starter_items];

		let meal_items = meals.map(meal => {
			return {
				no: count++,
				type: 'meal',
				name: meal.name,
				price: meal.price,
				id: meal._id,
				image: meal.image,
			}
		});
		displayData = [...displayData, ...meal_items];

		let dessert_items = desserts.map(dessert => {
			return {
				no: count++,
				type: 'dessert',
				name: dessert.name,
				price: dessert.price,
				id: dessert._id,
				image: dessert.image,
			}
		});
		displayData = [...displayData, ...dessert_items];

		let special_items = specials.map(special => {
			return {
				no: count++,
				type: 'special',
				name: special.name,
				price: special.price,
				id: special._id,
				image: special.image,
			}
		});
		displayData = [...displayData, ...special_items];

		setFilteredData(getFilteredArray(displayData, searchText));
	}, [drinks, starters, meals, desserts, specials, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					There are no items in stock!
				</Typography>
			</div>
		);
	}
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<RobotTable
				columns={columns}
				data={filteredData}
			/>
		</FuseAnimate>
	);
}

export default RobotList;
