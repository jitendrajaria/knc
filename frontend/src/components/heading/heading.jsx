import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
	font-weight: 500;
	color: ${(props) => props.theme.lightBrown};
`;

export default function HeadingComponent({ children, ...props }) {
	return <Heading {...props}>{children}</Heading>;
}
