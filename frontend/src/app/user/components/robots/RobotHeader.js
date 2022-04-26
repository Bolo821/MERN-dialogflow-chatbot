import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from './store/actions';
import {FaRobot} from 'react-icons/fa';


function RobotHeader(props) {
	const dispatch = useDispatch();
	const searchText = useSelector(({ robotsApp }) => robotsApp.contacts.searchText);
	//const mainTheme = useSelector(({ fuse }) => fuse.settings.current);

	return (
		<div className="flex flex-1 items-center justify-between p-4 sm:p-24">
			<div className="flex flex-shrink items-center sm:w-224">
				<div className="flex items-center">
					<FuseAnimate animation="transition.expandIn" delay={300}>
						<FaRobot size={32}/>
					</FuseAnimate>
					<FuseAnimate animation="transition.slideLeftIn" delay={300}>
						<Typography variant="h6" className="mx-12 sm:flex">
							Stock
						</Typography>
					</FuseAnimate>
				</div>
			</div>

			<div className="flex flex-1 items-center justify-center px-8 sm:px-12" >
				<FuseAnimate animation="transition.slideLeftIn" delay={300}>
					<Paper className="flex p-4 items-center w-full max-w-512 h-48 px-8 py-4 rounded-8"
						style={{background: 'white'}} >
						<div style={{background: 'white'}} className="flex w-full rounded-8 h-full items-center">
							<Icon color="action" style={{color: 'black'}}>search</Icon>

							<Input
								placeholder="Search for anything"
								className="flex flex-1 px-16"
								disableUnderline
								fullWidth
								value={searchText}
								inputProps={{
									'aria-label': 'Search'
								}}
								style={{color: 'black'}}
								onChange={ev => dispatch(Actions.setSearchText(ev))}
							/>
						</div>
					</Paper>
				</FuseAnimate>
			</div>
			<div className="flex flex-1 items-center justify-center">
				<Button variant="contained" style={{background: '#33aa77', color: 'white'}} onClick={() => {
					dispatch(Actions.openNewContactDialog());
				}}>
					Add New Item
				</Button>
			</div>
		</div>
	);
}

export default RobotHeader;
