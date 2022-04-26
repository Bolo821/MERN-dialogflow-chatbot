import Card from '@material-ui/core/Card';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import _ from '@lodash';
import { orderDish } from './store/actions';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles(theme => ({
	root: {
		marginBottom: '20px',
		'&:hover': {
			boxShadow: '6px 6px 3px grey',
			cursor: 'pointer',
		}
	},
	image: {
		paddingTop: '5px',
		width: '100%',
		marginBottom: '20px',
	}
}));

function DishCard(props) {
	const theme = useTheme();
	const classes = useStyles(theme);
	const data = _.merge({}, props.data);

	const type = useSelector(({chatApp}) => chatApp.chats.type);
	const user = useSelector(({user}) => user.auth.user);
	const dispatch = useDispatch();

	const handleCardClick = (e) => {
		e.preventDefault();
		dispatch(orderDish(type, data, user.id));
	}

	return (
		<Card className={clsx("rounded-8 shadow card-element-rt", classes.root)} onClick={handleCardClick}>
			<div className="p-16 pb-0 flex flex-row flex-wrap items-center justify-center">
				<div className="flex flex-col justify-center items-center">
					<Typography className="h2" color="textSecondary">
						{data.name}
					</Typography>
					<Typography className="text-36 font-300 leading-none mt-12">{data.price}$</Typography>
					<img src={data.image} className={classes.image} />
				</div>
			</div>
		</Card>
	);
}

export default React.memo(DishCard);
