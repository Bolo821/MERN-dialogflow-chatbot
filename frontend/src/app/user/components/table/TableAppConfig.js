import React from 'react';

const TableAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/table',
			component: React.lazy(() => import('./TableApp'))
		},
	]
};

export default TableAppConfig;
