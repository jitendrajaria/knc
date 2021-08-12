import restActions from '.';

export function getAllUsers(skip, limit, id) {
	return restActions.GET(`/${id}/users?limit=${limit}&skip=${skip}`);
}
