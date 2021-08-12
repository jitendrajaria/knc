import React from 'react';
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import ButtonComponent from '../button/button';

const MessageWrapper = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
`;

const MessageTextArea = styled.textarea`
	flex-grow: 1;
	padding: 20px;
	margin-left: 10px;
	border-radius: 10px;
	resize: none;
	outline: none;
`;

export default function ModalComponent({ show, handleClose, userInfo, otpInfo, sendMessage, isSendingMessage }) {
	return (
		<Modal show={show} onHide={handleClose} backdrop='static' keyboard={true}>
			<Modal.Header closeButton>Send Message To {userInfo.firstname + ' ' + userInfo.lastname}</Modal.Header>
			<Modal.Body>
				<MessageWrapper>
					<MessageTextArea value={`Hi! This is your OTP ${otpInfo.otp}`} disabled={true} />
				</MessageWrapper>
			</Modal.Body>
			<Modal.Footer>
				<ButtonComponent variant='secondary' onClick={handleClose}>
					Close
				</ButtonComponent>
				<ButtonComponent variant='primary' disabled={isSendingMessage} onClick={() => sendMessage(otpInfo.messageId, userInfo._id)}>
					Send Message
				</ButtonComponent>
			</Modal.Footer>
		</Modal>
	);
}
