import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ButtonComponent from '../button/button';
import { useHistory } from 'react-router-dom';

const Header = styled.div`
	height: 60px;
	background-image: linear-gradient(to right, ${(props) => props.theme.lightGreen}, ${(props) => props.theme.darkGreen});
`;
const HeaderLogo = styled.div`
	transition: all 0.2s ease-in-out;
	opacity: ${(props) => (props.isMenuOpen ? 0 : 1)};
	height: 100%;
	padding: 10px 0px;
`;
const HeaderLogoImage = styled.img.attrs({
	src: process.env.PUBLIC_URL + '/knLogo.png',
})`
	max-height: 100%;
`;
const MenuButtonWrapper = styled.div`
	cursor: pointer;
`;
export default function HeaderComponent({ handleMenuToggle, isMenuOpen }) {
	const history = useHistory();

	function handleLogout() {
		localStorage.clear();
		history.push('/');
	}
	return (
		<Header className='flex-grow-1 d-flex align-items-center '>
			<MenuButtonWrapper className='px-2' onClick={handleMenuToggle}>
				<FontAwesomeIcon icon={faBars} />
			</MenuButtonWrapper>
			<HeaderLogo isMenuOpen={isMenuOpen}>
				<HeaderLogoImage />
			</HeaderLogo>
			<ButtonComponent style={{ marginLeft: 'auto' }} className='btn me-2' onClick={handleLogout}>
				Logout
			</ButtonComponent>
		</Header>
	);
}
