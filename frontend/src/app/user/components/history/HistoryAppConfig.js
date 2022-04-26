import React from 'react';

const HistoryAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/history',
			component: React.lazy(() => import('./HistoryApp'))
		},
	]
};

export default HistoryAppConfig;
