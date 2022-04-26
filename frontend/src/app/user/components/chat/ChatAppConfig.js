import React from 'react';

const ChatAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/chat/:table',
			component: React.lazy(() => import('./ChatApp'))
		}
	]
};

export default ChatAppConfig;
