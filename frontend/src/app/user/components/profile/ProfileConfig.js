import React from 'react';

const ProfileConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/profile',
			component: React.lazy(() => import('./Profile'))
		}
	]
};

export default ProfileConfig;
