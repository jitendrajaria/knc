import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import HomeRoute from '../home/home';
import MessageMonitorRoute from '../message_monitor/message-monitor';
import HeaderComponent from '../../components/header/header';
import SideMenuComponent from '../../components/side_menu/side-menu';

export default function LayoutRoute() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function toggleMenu() {
		setIsMenuOpen(!isMenuOpen);
	}

	return (
		<div style={{ overflow: isMenuOpen ? 'hidden' : 'auto' }} className='d-flex '>
			<SideMenuComponent isMenuOpen={isMenuOpen} />
			<div className='flex-grow-1'>
				<HeaderComponent handleMenuToggle={toggleMenu} isMenuOpen={isMenuOpen} />
				<Switch>
					<Route exact={true} path='/' component={HomeRoute} />
					<Route path='/monitor' component={MessageMonitorRoute} />
				</Switch>
			</div>
		</div>
	);
}
