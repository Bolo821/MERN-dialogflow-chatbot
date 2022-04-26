import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Toolbar from '@material-ui/core/Toolbar';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React from 'react';
import Chat from './Chat';
import reducer from './store/reducers';
import { useEffect } from 'react';
import { resetChatMessages } from './store/actions';
import { useDispatch } from 'react-redux';

const drawerWidth = 400;
const headerHeight = 200;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		minHeight: '100%',
		position: 'relative',
		flex: '1 1 auto',
		height: 'auto',
		backgroundColor: theme.palette.background.default
	},
	topBg: {
		position: 'absolute',
		left: 0,
		right: 0,
		top: 0,
		height: headerHeight,
		backgroundImage: 'url("../../assets/images/backgrounds/header-bg.png")',
		backgroundColor: theme.palette.primary.dark,
		backgroundSize: 'cover',
		pointerEvents: 'none'
	},
	contentCardWrapper: {
		position: 'relative',
		padding: 24,
		maxWidth: 1400,
		display: 'flex',
		flexDirection: 'column',
		flex: '1 0 auto',
		width: '100%',
		minWidth: '0',
		maxHeight: '100%',
		margin: '0 auto',
		[theme.breakpoints.down('sm')]: {
			padding: 16
		},
		[theme.breakpoints.down('xs')]: {
			padding: 12
		}
	},
	contentCard: {
		display: 'flex',
		position: 'relative',
		flex: '1 1 100%',
		flexDirection: 'row',
		backgroundImage: 'url("/assets/images/patterns/rain-grey.png")',
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[1],
		borderRadius: 8,
		minHeight: 0,
		overflow: 'hidden'
	},
	drawerPaper: {
		width: drawerWidth,
		maxWidth: '100%',
		overflow: 'hidden',
		height: '100%',
		[theme.breakpoints.up('md')]: {
			position: 'relative'
		}
	},
	contentWrapper: {
		display: 'flex',
		flexDirection: 'column',
		flex: '1 1 100%',
		zIndex: 10,
		background: `linear-gradient(to bottom, ${fade(theme.palette.background.paper, 0.8)} 0,${fade(
			theme.palette.background.paper,
			0.6
		)} 20%,${fade(theme.palette.background.paper, 0.8)})`
	},
	content: {
		display: 'flex',
		flex: '1 1 100%',
		minHeight: 0
	}
}));

function ChatApp(props) {
	const classes = useStyles(props);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(resetChatMessages());
	})

	return (
		<div className={clsx(classes.root)}>
			<div className={classes.topBg} />

			<div className={clsx(classes.contentCardWrapper, 'container')}>
				<div className={classes.contentCard}>
					<main className={clsx(classes.contentWrapper, 'z-10')}>
						<AppBar className="w-full shadow-md" position="static">
							<Toolbar className="px-16">
								<IconButton
									color="inherit"
									aria-label="Open drawer"
									className="flex"
								>
									<Icon>chat</Icon>
								</IconButton>
							</Toolbar>
						</AppBar>

						<div className={classes.content}>
							<Chat className="flex flex-1 z-10" />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
}

export default withReducer('chatApp', reducer)(ChatApp);
