import { NotificationManager } from 'react-notifications';

export function notify(type, message, timeout = 400) {
	switch (type) {
		case 'info':
			NotificationManager.info(message, 'Info', timeout);
			break;
		case 'success':
			NotificationManager.success(message, 'Success', timeout);
			break;
		case 'warning':
			NotificationManager.warning(message, 'Warning', timeout);
			break;
		case 'error':
			NotificationManager.error(message, 'Something went wrong!', timeout);
			break;
		default:
			NotificationManager.info(message, 'Info');
	}
}
