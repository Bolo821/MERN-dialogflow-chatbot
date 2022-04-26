import FuseNavigation from '@fuse/core/FuseNavigation';
import clsx from 'clsx';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectNavigation } from 'app/store/fuse/navigationSlice';

function Navigation(props) {
	const navigation = useSelector(selectNavigation);
	const permission = useSelector(({user}) => user.auth.user.permission);

	let nav = [];

	let role = 1;
	if(permission === 'superadmin') role = 3;
	else if(permission === 'admin') role = 2;

	for(let i=0; i<navigation.length; i++) {
		if(navigation[i].permission <= role) {
			if(navigation[i].id === 'chat-component' && role == 3)
				continue;
			nav.push(navigation[i]);
		}

	}

	return (
		<FuseNavigation
			className={clsx('navigation', props.className)}
			navigation={nav}
			layout={props.layout}
			dense={props.dense}
			active={props.active}
		/>
	);
}

Navigation.defaultProps = {
	layout: 'vertical'
};

export default React.memo(Navigation);
