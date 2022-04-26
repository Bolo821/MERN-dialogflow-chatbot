import i18next from 'i18next';
import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'dashboard-component',
		title: 'Dashboard',
		translate: 'DASHBOARD',
		type: 'item',
		icon: 'home',
		url: '/dashboard',
		permission: 1,
	},
	{
		id: 'chat-component',
		title: 'Place Order',
		translate: 'PLACE ORDER',
		type: 'item',
		icon: 'chat',
		url: '/chat',
		permission: 1,
	},
	{
		id: 'users-component',
		title: 'Users',
		translate: 'USERS',
		type: 'item',
		icon: 'person',
		url: '/contacts',
		permission: 3,
	},
	{
		id: 'orders-component',
		title: 'Orders',
		translate: 'ORDERS',
		type: 'item',
		icon: 'next_plan',
		url: '/order',
		permission: 1,
	},
	{
		id: 'stock-component',
		title: 'Stock',
		translate: 'STOCK',
		type: 'item',
		icon: 'adb',
		url: '/stock',
		permission: 3,
	},
	// {
	// 	id: 'table-component',
	// 	title: 'Table',
	// 	translate: 'TABLE MANAGE',
	// 	type: 'item',
	// 	icon: 'adb',
	// 	url: '/table',
	// 	permission: 3,
	// },
	{
		id: 'history-component',
		title: 'History',
		translate: 'HISTORY',
		type: 'item',
		icon: 'adb',
		url: '/history',
		permission: 3,
	},
];

export default navigationConfig;
