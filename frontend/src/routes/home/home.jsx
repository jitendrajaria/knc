import React, { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useToasts } from 'react-toast-notifications';
import { getOtp, postMessage } from '../../api/message';
import { getAllUsers } from '../../api/user';
import ModalComponent from '../../components/modal/modal';
import TableComponent from '../../components/table/table';
import { ApiContext } from '../../utils/context/api';

export default function HomeRoute() {
	const id = useContext(ApiContext);
	const [isShowingModal, setIsShowingModal] = useState(false);
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [isLoadingOtp, setIsLoadingOtp] = useState(false);
	const [otpInfo, setOtpinfo] = useState({});
	const [isSendingMessage, setIsSendingMessage] = useState(false);
	const { addToast } = useToasts();

	useEffect(() => {
		getUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	function showModal() {
		setIsShowingModal(true);
	}

	function hideModal() {
		setIsShowingModal(false);
	}

	async function getUsers() {
		setIsLoading(true);
		try {
			const response = await getAllUsers(0, 10, id);
			setUsers(response.data.data);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			addToast(err.message, { appearance: 'error' });
		}
	}
	async function generateOtp(user) {
		setIsLoadingOtp(true);
		try {
			const response = await getOtp(id, user._id);
			setOtpinfo(response.data?.data);
			setIsLoadingOtp(false);
			showModal();
		} catch (err) {
			setIsLoadingOtp(false);
			addToast(err.message, { appearance: 'error' });
		}
	}

	async function sendMessage(messageId, userId) {
		setIsSendingMessage(true);
		try {
			setIsSendingMessage(false);
			await postMessage(id, userId, messageId);
			hideModal();
		} catch (err) {
			setIsSendingMessage(false);
			hideModal();
			addToast(err.message, { appearance: 'error' });
		}
	}

	function setUser(user) {
		setCurrentUser(user);
	}
	return (
		<div>
			<TableComponent showModal={showModal} isLoading={isLoading} tableData={users} tableHeaders={['#', 'First Name', 'Last Name', 'Mobile Number', ' ']} setCurrentItem={setUser} generateOtp={generateOtp} isActionLoading={isLoadingOtp} dataItemMapping={['firstname', 'lastname', 'phoneNumber']} />

			{currentUser && <ModalComponent show={isShowingModal} handleClose={hideModal} userInfo={currentUser} otpInfo={otpInfo} sendMessage={sendMessage} isSendingMessage={isSendingMessage} />}
		</div>
	);
}
