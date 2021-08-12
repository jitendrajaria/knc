import React from 'react';
import styled from 'styled-components';

const Logo = styled.img.attrs({
	src: process.env.PUBLIC_URL + '/knImage.png',
})`
	width: 100px;
	padding: 20px;
`;

export default function LogoComponent(props) {
	return <Logo {...props}></Logo>;
}
