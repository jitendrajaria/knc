import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const SideMenu = styled.div`
	transition: all 0.5s ease-in-out;
	width: 250px;
	height: 100vh;
	background-image: linear-gradient(${(props) => props.theme.lightGreen}, ${(props) => props.theme.darkGreen});
	margin-left: ${(props) => (props.isOpen ? 0 : '-250px')};
`;

const SideMenuItemWrapper = styled.div`
	width: 100%;
	position: relative;
	text-align: center;
`;

const SideMenuLogo = styled.img.attrs({
	src: process.env.PUBLIC_URL + '/knLogo.png',
})`
	max-width: 100%;
	min-height: 60px;
	min-width: 250px;
	padding: 5% 15%;
	background: ${(props) => props.theme.lightBrown};
`;
const SideMenuItem = styled(Link)`
	padding: 10px;
	max-width: 100%;
	cursor: pointer;
	display: block;
	background: ${(props) => props.theme.buttonBackground};
	font-weight: 500;
	text-decoration: none;
	color: white;
	margin: 3px 0px;
	&:hover {
		color: white;
	}
`;
export default function SideMenuComponent({ isMenuOpen }) {
	return (
		<SideMenu isOpen={isMenuOpen}>
			<SideMenuLogo />
			<SideMenuItemWrapper isOpen={isMenuOpen}>
				<SideMenuItem to='/'>Home</SideMenuItem>
				<SideMenuItem to='/monitor'>Monitor Message</SideMenuItem>
			</SideMenuItemWrapper>
		</SideMenu>
	);
}
