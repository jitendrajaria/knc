import React from 'react';
import styled from 'styled-components';

const Input = styled.input.attrs((props) => ({
	type: props.type || 'text',
	autocomplete: 'off',
}))`
	border-radius: 15px;
`;

const SmallDanger = styled.small`
	font-size: 13px;
	color: red;
`;

export default function InputComponent({ ...props }) {
	return (
		<>
			<Input {...props}></Input>
			{props.error && <SmallDanger>{props.error}</SmallDanger>}
		</>
	);
}
