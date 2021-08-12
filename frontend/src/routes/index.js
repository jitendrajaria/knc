import jwtDecode from 'jwt-decode';
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { ToastProvider } from 'react-toast-notifications';
import { ApiContext } from '../utils/context/api';
import LayoutRoute from './layout/layout';
import LoginRoute from './login/login';

export default function AppRoutes(props) {
	const theme = {
		fontSize: '1rem',
		lightGreen: 'mediumseagreen',
		darkGreen: '#5dbbc3',
		lightBrown: '#9a784f',
		darkBrown: '#65350f',
		largeWidth: '64rem',
		mediumWidth: '45rem',
		smallWidth: '35rem',
		darkestGreen: '#123524',
		buttonBackground: '#2c8c7e',
	};
	return (
		<ToastProvider>
			<ThemeProvider theme={theme}>
				<Router>
					<Switch>
						<Route
							path='/'
							render={() =>
								localStorage.getItem('token') ? (
									<ApiContext.Provider value={jwtDecode(localStorage.getItem('token')).sub}>
										<LayoutRoute />
									</ApiContext.Provider>
								) : (
									<LoginRoute />
								)
							}></Route>
					</Switch>
				</Router>
			</ThemeProvider>
		</ToastProvider>
	);
}
