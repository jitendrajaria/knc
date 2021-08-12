import React from 'react';
import styled from 'styled-components';

const Button = styled.button.attrs((props) => ({
	type: props.type || 'button',
}))`
	background: ${(props) => props.theme.buttonBackground};
	color: white;
	border-radius: 1rem;
	font-weight: 500;
	&:hover {
		color: white;
	}
	@media (max-width: ${(props) => props.theme.smallWidth}) {
		& > .text {
			display: none;
		}
	}
`;

export default function ButtonComponent({ children, ...props }) {
	return (
		<Button className={props.className + ' btn'} {...props}>
			{children}
		</Button>
	);
}
