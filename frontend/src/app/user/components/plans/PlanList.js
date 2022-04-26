import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PlanTable from './PlanTable';
import * as Actions from './store/actions';
import { removeContact } from './store/actions'
import Button from '@material-ui/core/Button';

import { useConfirm } from 'material-ui-confirm';

function PlanList(props) {
	const dispatch = useDispatch();
	const [contacts, setContacts] = useState([]);
	const user = useSelector(({ user }) => user.auth.user);

	const order_user = useSelector(({ plansApp }) => plansApp.contacts.entities);
	const order_guest = useSelector(({ user }) => user.guest.orderHistory); 

	const searchText = useSelector(({ plansApp }) => plansApp.contacts.searchText);

	const [filteredData, setFilteredData] = useState(null);
	const confirm = useConfirm();

	useEffect(() => {
		if(user.email) {
			setContacts(order_user);
		} else {
			setContacts(order_guest);
		}
	}, [user, order_user, order_guest]);

	const columns = React.useMemo(
		() => {
			if(user.permission) {
				if(user.permission === 'superadmin')
					return (
						[
							{
								Header: 'No',
								accessor: 'no',
								className: 'font-bold',
								sortable: true
							},
							{
								Header: 'User Name',
								accessor: 'user',
								className: 'font-bold',
								sortable: true
							},
							
							{
								Header: 'Table',
								accessor: 'qrcode',
								className: 'font-bold',
								sortable: true
							},
							{
								Header: 'Date',
								accessor: 'date',
								className: 'font-bold',
								sortable: true
							},
							{
								Header: 'Status',
								accessor: 'status',
								sortable: true
							},
							{
								Header: 'Cost',
								accessor: 'cost',
								sortable: true
							},
							{
								Header: 'View',
								id: 'action-edit',
								width: 64,
								sortable: false,
								Cell: ({ row }) => {
									return (
										<div className="flex items-center" 
											onClick={() => {dispatch(Actions.openEditContactDialog(row.original.no-1))}}
										>
											<IconButton>
												<Icon>edit</Icon>
											</IconButton>
										</div>
									)
								}
							},
							{
								Header: 'Accept',
								id: 'action-accept',
								width: 64,
								sortable: false,
								Cell: ({ row }) => {
									return (
										<div className="flex items-center"
											onClick={() => {
												let option = {
													title: <span style={{fontSize: '20px'}}>Are you sure?</span>,
													description: <span style={{fontSize: '16px'}}>This order will be accepted!</span>,
													cancellationText: <span style={{fontSize: '16px'}}>No</span>,
													confirmationText: <span style={{fontSize: '16px'}}>Yes</span>,
													confirmationButtonProps: {variant: "contained", style: {margin: '0 10px 10px 0', background: 'rgb(20, 30, 60)'}},
													cancellationButtonProps: {variant: 'contained', style: {margin: '0 10px 10px 0', background: 'rgb(20, 30, 60)', color: 'white'}},
												}
												confirm(option).then(() => {
													dispatch(Actions.updateContact({
														id: row.original.id,
														deleted: false,
														status: 'accepted',
														qrcode: row.original.qrcode,
													}))
												}).catch (() => {
													console.log('error in confirm');
												});
											}}
										>
											<IconButton>
												<Icon>check</Icon>
											</IconButton>
										</div>
									)
								}
							},
							{
								Header: 'Remove',
								id: 'action-delete',
								width: 64,
								sortable: false,
								Cell: ({ row }) => {
									return (
										<div className="flex items-center"
											onClick={() => {
												let option = {
													title: <span style={{fontSize: '20px'}}>Are you sure?</span>,
													description: <span style={{fontSize: '16px'}}>This order will be deleted!</span>,
													cancellationText: <span style={{fontSize: '16px'}}>No</span>,
													confirmationText: <span style={{fontSize: '16px'}}>Yes</span>,
													confirmationButtonProps: {variant: "contained", style: {margin: '0 10px 10px 0', background: 'rgb(20, 30, 60)'}},
													cancellationButtonProps: {variant: 'contained', style: {margin: '0 10px 10px 0', background: 'rgb(20, 30, 60)', color: 'white'}},
												}
												confirm(option).then(() => {
													// dispatch(Actions.removeContact({id: row.original.id}))
													dispatch(Actions.updateContact({
														id: row.original.id,
														status: row.original.status,
														deleted: true,
														qrcode: row.original.qrcode,
													}))
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
						]
					)
			else
				return (
					[
						{
							Header: 'No',
							accessor: 'no',
							className: 'font-bold',
							sortable: true
						},
						{
							Header: 'User Name',
							accessor: 'user',
							className: 'font-bold',
							sortable: true
						},
						{
							Header: 'Status',
							accessor: 'status',
							sortable: true
						},
						{
							Header: 'Cost',
							accessor: 'cost',
							sortable: true
						},
						{
							Header: 'View',
							id: 'action-edit',
							width: 64,
							sortable: false,
							Cell: ({ row }) => {
								return (
									<div className="flex items-center" 
										onClick={() => {dispatch(Actions.openEditContactDialog(row.original.no-1))}}
									>
										<IconButton>
											<Icon>edit</Icon>
										</IconButton>
									</div>
								)
							}
						},
					]
				)
			} else {
				return (
					[
						{
							Header: 'No',
							accessor: 'no',
							className: 'font-bold',
							sortable: true
						},
						{
							Header: 'Table',
							accessor: 'table',
							className: 'font-bold',
							sortable: true
						},
						{
							Header: 'Cost',
							accessor: 'cost',
							sortable: true
						},
						{
							Header: 'View',
							id: 'action-edit',
							width: 64,
							sortable: false,
							Cell: ({ row }) => {
								return (
									<div className="flex items-center" 
										onClick={() => {dispatch(Actions.openEditContactDialog(row.original.no-1))}}
									>
										<IconButton>
											<Icon>edit</Icon>
										</IconButton>
									</div>
								)
							}
						},
					]
				)				
			}
			
		},
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

		if (contacts) {
			let count = 1;
			let displayData = contacts.map(ele => {
				let cost = 0;
				ele.drink.forEach(drink => {
					cost += drink.price;
				});
				ele.starter.forEach(starter => {
					cost += starter.price;
				});
				ele.meal.forEach(meal => {
					cost += meal.price;
				});
				ele.dessert.forEach(dessert => {
					cost += dessert.price;
				});
				ele.special.forEach(special => {
					cost += special.price;
				});
				let uname;
				if(ele.user) uname = ele.user.name;
				else uname = ele.qrcode;

				let one = {};

				if(user.permission) {
					one = {
						id: ele.id,
						no: ele.no,
						user: uname,
						date: ele.date,
						status: ele.status,
						cost: cost,
						qrcode: ele.qrcode,
						deleted: ele.deleted,
					}
				} else {
					one = {
						no: count++,
						table: ele.table,
						cost: cost,
					}
				}
				
				return one;
			});
			setFilteredData(getFilteredArray(displayData, searchText));
		}
	}, [contacts, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					There are no orders.
				</Typography>
			</div>
		);
	}

	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<PlanTable
				columns={columns}
				data={filteredData}
			/>
		</FuseAnimate>
	);
}

export default PlanList;
