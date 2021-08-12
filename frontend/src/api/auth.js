import restActions from '.';

export function auth(userInfo) {
	return restActions.POST('/auth', { ...userInfo });
}
