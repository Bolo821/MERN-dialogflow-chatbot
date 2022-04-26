import React from 'react';
import { Redirect } from 'react-router-dom';
import FuseUtils from '@fuse/utils';
import LoginConfig from 'app/user/components/login/LoginConfig';
import RegisterConfig from 'app/user/components/register/RegisterConfig';
import DashboardConfig from 'app/user/components/dashboard/DashboardConfig';
import ProfileConfig from 'app/user/components/profile/ProfileConfig';
import ChatAppConfig from 'app/user/components/chat/ChatAppConfig';

import ContactsAppConfig from 'app/user/components/contacts/ContactsAppConfig';
import PlansAppConfig from 'app/user/components/plans/PlansAppConfig';
import RobotsAppConfig from 'app/user/components/robots/RobotsAppConfig';
import TableAppConfig from 'app/user/components/table/TableAppConfig';
import HistoryAppConfig from 'app/user/components/history/HistoryAppConfig';

const routeConfigs = [
	LoginConfig,
	RegisterConfig,
	DashboardConfig,
	ProfileConfig,
	ChatAppConfig,
	ContactsAppConfig,
	PlansAppConfig,
	RobotsAppConfig,
	TableAppConfig,
	HistoryAppConfig,
];

const routes = [
	...FuseUtils.generateRoutesFromConfigs(routeConfigs),
	{
		path: '/',
		component: () => <Redirect to="/chat/0" />
	}
];

export default routes;
