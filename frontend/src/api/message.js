import restActions from '.';

export function getAllOtpInfo(id, skip, limit) {
	return restActions.GET(`/${id}/messages?skip=${skip}&limit=${limit}`);
}

export function postMessage(id, userId, messageId) {
	return restActions.POST(`/${id}/users/${userId}/message`, { messageId });
}

export function getOtp(id, userId) {
	return restActions.GET(`/${id}/users/${userId}/otp`);
}
