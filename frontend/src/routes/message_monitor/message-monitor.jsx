import React, { useContext, useEffect, useState } from 'react';
import { getAllOtpInfo } from '../../api/message';
import TableComponent from '../../components/table/table';
import { ApiContext } from '../../utils/context/api';
import { notify } from '../../utils/notifications/notification';

const PAGE_ITEM_COUNT = 10;
export default function MessageMonitorRoute() {
	const id = useContext(ApiContext);
	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [count, setCount] = useState(0);

	useEffect(() => {
		getAllMessages();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function getAllMessages(page = 0) {
		setIsLoading(true);
		try {
			setIsLoading(false);
			const response = await getAllOtpInfo(id, page * PAGE_ITEM_COUNT, PAGE_ITEM_COUNT);
			const data = response.data.data.messages.map((item) => {
				item.name = item.to.firstname + ' ' + item.to.lastname;
				item.phoneNumber = item.to.phoneNumber;
				item.isOtpSent = item.isOtpSent ? 'true' : 'false';
				return item;
			});
			setCount(response.data.data.count);
			setMessages(data);
		} catch (err) {
			setIsLoading(false);
			notify('error', err.message);
		}
	}
	return <TableComponent tableHeaders={['#', 'Name', 'Mobile Number', 'OTP', 'OTP Sent']} tableData={messages} isLoading={isLoading} dataItemMapping={['name', 'phoneNumber', 'otp', 'isOtpSent']} isActionButtonRequired={false} count={Math.ceil(count / 10)} getData={getAllMessages} />;
}
