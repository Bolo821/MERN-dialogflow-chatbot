import React from 'react';
import { Redirect } from 'react-router-dom';

const ContactsAppConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/contacts',
			component: React.lazy(() => import('./UserApp'))
		},
	]
};

export default ContactsAppConfig;
