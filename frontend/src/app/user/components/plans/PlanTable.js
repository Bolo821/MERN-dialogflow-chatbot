import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import MaUTable from '@material-ui/core/Table';
import PropTypes from 'prop-types';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable } from 'react-table';
import clsx from 'clsx';
import TablePagination from '@material-ui/core/TablePagination';

const EnhancedTable = ({ columns, data }) => {
	const {
		getTableProps,
		headerGroups,
		prepareRow,
		page,
		gotoPage,
		setPageSize,
		state: { pageIndex, pageSize }
	} = useTable(
		{
			columns,
			data,
			autoResetPage: true
		},
		useGlobalFilter,
		useSortBy,
		usePagination,
		useRowSelect,
		hooks => {
			hooks.allColumns.push(_columns => [
				..._columns
			]);
		}
	);

	const handleChangePage = (event, newPage) => {
		gotoPage(newPage);
	};

	const handleChangeRowsPerPage = event => {
		setPageSize(Number(event.target.value));
	};

	// Render the UI for your table
	return (
		<div className="flex flex-col min-h-full sm:border-1 sm:rounded-16 overflow-hidden">
			<TableContainer className="sm:border-1" style={{maxHeight: '400px'}}>
				<MaUTable {...getTableProps()} stickyHeader>
					<TableHead>
						{headerGroups.map(headerGroup => (
							<TableRow {...headerGroup.getHeaderGroupProps()}>
								{headerGroup.headers.map(column => (
									<TableCell
										className="whitespace-no-wrap p-12"
										{...(!column.sortable
											? column.getHeaderProps()
											: column.getHeaderProps(column.getSortByToggleProps()))}
									>
										{column.render('Header')}
										{column.sortable ? (
											<TableSortLabel
												active={column.isSorted}
												// react-table has a unsorted state which is not treated here
												direction={column.isSortedDesc ? 'desc' : 'asc'}
											/>
										) : null}
									</TableCell>
								))}
							</TableRow>
						))}
					</TableHead>
					<TableBody>
						{page.map((row, i) => {
							prepareRow(row);
							return (
								<TableRow
									{...row.getRowProps()}
									className="truncate cursor-pointer"
								>
									{row.cells.map(cell => {
										return (
											<TableCell
												{...cell.getCellProps()}
												className={clsx('p-12', cell.column.className)}
											>
												{cell.render('Cell')}
											</TableCell>
										);
									})}
								</TableRow>
							);
						})}
					</TableBody>
				</MaUTable>
			</TableContainer>
			<TablePagination
					component="div"
					classes={{
						root: 'flex-shrink-0 border-t-1'
					}}
					rowsPerPageOptions={[5, 10, 25, { label: 'All', value: data.length + 1 }]}
					colSpan={5}
					count={data.length}
					rowsPerPage={pageSize}
					page={pageIndex}
					SelectProps={{
						inputProps: { 'aria-label': 'rows per page' },
						native: false
					}}
					onChangePage={handleChangePage}
					onChangeRowsPerPage={handleChangeRowsPerPage}
			/>
		</div>
	);
};

EnhancedTable.propTypes = {
	columns: PropTypes.array.isRequired,
	data: PropTypes.array.isRequired,
};

export default EnhancedTable;