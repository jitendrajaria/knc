import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { auth } from '../../api/auth';
import ButtonComponent from '../../components/button/button';
import HeadingComponent from '../../components/heading/heading';
import InputComponent from '../../components/input/input';
import TextLabelComponent from '../../components/label/label';
import LoginFormWrapperComponent from '../../components/login_form_wrapper/login-form-wrapper';
import LogoComponent from '../../components/logo/logo';

export default function LoginRoute() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [formError, setFormError] = useState({});

	const history = useHistory();
	const { addToast } = useToasts();

	function handleSubmit(evt) {
		evt.preventDefault();
		if (username.trim() && password.trim()) {
			setIsLoading(true);
			auth({ username, password })
				.then((res) => {
					setIsLoading(false);
					localStorage.setItem('token', res.data?.data?.token);
					history.push('/');
				})
				.catch((err) => {
					setIsLoading(false);
					addToast(err.message, { appearance: 'error' });
				});
		}
	}

	function handleValueChange(evt) {
		if (evt.target.name === 'username') {
			setUsername(evt.target.value);
		} else {
			setPassword(evt.target.value);
		}
	}

	function isFormValid() {
		return username.trim() && password.trim();
	}

	function handleBlur(evt) {
		const error = { ...formError };
		const name = evt.target.name;
		if (name === 'username') {
			if (username.trim()) error[name] = '';
			else error[name] = 'Username can not be empty';
		} else if (name === 'password') {
			if (password.trim()) error[name] = '';
			else error[name] = 'Password can not be empty';
		}
		setFormError(error);
	}
	return (
		<LoginFormWrapperComponent>
			<LogoComponent className='pb-3' />
			<HeadingComponent>Sign In</HeadingComponent>
			<div className='pt-2'>
				<form onSubmit={handleSubmit} autoComplete='off'>
					<div className='form-group pb-2'>
						<TextLabelComponent>Username</TextLabelComponent>
						<InputComponent name='username' className='form-control' value={username} onChange={handleValueChange} onBlur={handleBlur} error={formError.username} />
					</div>
					<div className='form-group pb-2'>
						<TextLabelComponent>Password</TextLabelComponent>
						<InputComponent name='password' type='password' className='form-control' value={password} onChange={handleValueChange} onBlur={handleBlur} error={formError.password} />
					</div>
					<div className='mt-2 text-center'>
						<ButtonComponent type='submit' className='btn w-100' disabled={!isFormValid() || isLoading}>
							Login
						</ButtonComponent>
					</div>
				</form>
			</div>
		</LoginFormWrapperComponent>
	);
}
