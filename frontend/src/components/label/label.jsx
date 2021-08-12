import styled from 'styled-components';

import React from 'react';

const TextLabel = styled.label`
	font-size: ${(props) => props.fontSize || '16px'};
	color: ${(props) => props.theme.lightBrown};
	padding-right: ${(props) => props.paddingRight || '10px'};
	margin-right: ${(props) => props.marginRight || '0px'};
	margin-bottom: ${(props) => props.marginBottom || '0px'};
`;

export default function TextLabelComponent({ className, children, ...props }) {
	return (
		<TextLabel className={className} {...props}>
			{children}
		</TextLabel>
	);
}
