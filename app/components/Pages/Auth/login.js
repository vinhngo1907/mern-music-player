import React from 'react';
import PropTypes from 'prop-types';
import TextInputGroup from './TextInputGroup';
// import { slideInRight } from '../../../actions/ui';
import { login } from '../../../actions/auth';
import './index.sass';

class LogInPage extends React.Component {
	static contextTypes = {}

	state = {
		animate: false,
		username: '',
		password: ''
	}

	goToSignUpPage(e) {
		e.preventDefault();
		this.setState({ leave: true });
		setTimeout(() => {
			this.context.router.push('/signup');
		}, 700);
	}

	componentDidMount() {
		this.setState({
			animate: true,
			leave: false,
		});
	}
	
	onChange(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	onSubmit(e) {
		e.preventDefault();
		const { username, password } = state;
		this.props.dispatch(login({ username, password }))
	}

	renderAuthBox() {
		const className = `auth-box animated ${this.state.animate &&
			(this.state.leave ? 'bounceOutLeft' : 'bounceInRight')}`;
		const errors = this.props.auth.errors;
		return (
			<div className={className}>
				Login Below:
				<br />
				<br />
				<div>
					<form onSubmit={this.onSubmit.bind(this)}>
						<TextInputGroup
							placeholder="Username"
							name="username"
							error={errors.username}
							onChange={this.onChange.bind(this)}

						/>
						<TextInputGroup
							placeholder="Password"
							name="password"
							type="password"
							error={errors.password}
							onChange={this.onChange.bind(this)}
						/>
						<button type="submit" id="sign_up" disabled={this.props.auth.isProcessing}>
							{!this.props.auth.isProcessing ? 'Log In' : '...Processing'}
						</button>
					</form>
					<footer className="login-footer">
						New here, <a href="#" onClick={this.goToSignUpPage.bind(this)}>Create an account</a>
					</footer>
				</div>
			</div>
		)
	}
	render() {
		return (
			<div className="auth">
				<div className="auth-box-wrapper">
					{this.renderAuthBox()}
				</div>
			</div>
		);
	}
}

LogInPage.propTypes = {
	dispatch: PropTypes.func.isRequired,
	auth: PropTypes.shape({
		authenticated: PropTypes.bool.isRequired,
		errors: PropTypes.object.isRequired,
		isProcessing: PropTypes.bool,
	}),
};

export default LogInPage;