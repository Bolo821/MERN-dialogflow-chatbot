import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseUtils from '@fuse/utils';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableTable from './TableTable';
import * as Actions from './store/actions';
import { removeContact } from './store/actions'
import Button from '@material-ui/core/Button';

import { useConfirm } from 'material-ui-confirm';

function TableList(props) {
	const dispatch = useDispatch();
	const tables = useSelector(({ tableApp }) => tableApp.contacts.table);
	const searchText = useSelector(({ tableApp }) => tableApp.contacts.searchText);

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
				Header: 'Table',
				accessor: 'table',
				className: 'font-bold',
				sortable: true
			},
			{
				Header: 'QRCode',
				accessor: 'qrcode',
				sortable: true
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
									description: <span style={{fontSize: '16px'}}>This table will be premanently deleted!</span>,
									cancellationText: <span style={{fontSize: '16px'}}>No</span>,
									confirmationText: <span style={{fontSize: '16px'}}>Yes</span>,
									confirmationButtonProps: {variant: "contained", style: {margin: '0 10px 10px 0', background: 'rgb(20, 30, 60)'}},
									cancellationButtonProps: {variant: 'contained', style: {margin: '0 10px 10px 0', background: 'rgb(20, 30, 60)', color: 'white'}},
								}
								confirm(option).then(() => {
									dispatch(Actions.removeContact({_id: row.original._id}))
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

		displayData = tables.map((table, i) => {
			return {
				no: i+1,
				_id: table._id,
				table: table.table,
				qrcode: table.qrcode,
				used: table.used,
			}
		})
		setFilteredData(getFilteredArray(displayData, searchText));
	}, [tables, searchText]);

	if (!filteredData) {
		return null;
	}

	if (filteredData.length === 0) {
		return (
			<div className="flex flex-1 items-center justify-center h-full">
				<Typography color="textSecondary" variant="h5">
					There are no tables!
				</Typography>
			</div>
		);
	}
	return (
		<FuseAnimate animation="transition.slideUpIn" delay={300}>
			<TableTable
				columns={columns}
				data={filteredData}
			/>
		</FuseAnimate>
	);
}

export default TableList;
