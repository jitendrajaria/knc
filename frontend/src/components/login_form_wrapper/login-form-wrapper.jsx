import React from 'react';
import styled from 'styled-components';

const LoginFormWrapper = styled.div`
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	height: 90%;
	position: absolute;
	background-image: linear-gradient(${(props) => props.theme.lightGreen}, ${(props) => props.theme.darkGreen});
	display: flex;
	align-items: center;
	justify-content: flex-start;
	flex-direction: column;
	border-radius: 0 1rem;
	padding: 1rem;
	width: 50%;
	min-width: 18.75rem;

	@media (max-width: ${(props) => props.theme.smallWidth}) {
		height: 100%;
		width: 100%;
	}
`;

export default function LoginFormWrapperComponent({ children, ...props }) {
	return <LoginFormWrapper {...props}>{children}</LoginFormWrapper>;
}
