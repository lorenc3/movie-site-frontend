import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import Rodal from 'rodal';

import Layout from '../../components/Layout/Layout';
import './Login.css';

class Login extends Component {
	constructor() {
		super();

		this.handleEmail = this.handleEmail.bind(this);
		this.handlePass = this.handlePass.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.hideError = this.hideError.bind(this);

		this.state = {
			email: '',
			password: '',
			redirect: false,
			errors: {}
		};
	}

	handleEmail(event) {
		const email = event.target.value;
		this.setState({ email });
	}

	handlePass(event) {
		const password = event.target.value;
		this.setState({ password });
	}

	hideError() {
		this.setState({ errors: {} });
	}

	handleClick() {
		//For testing. Delete.
		this.setState({
			errors: {
				_message: 'User validation failed',
				message:
					'User validation failed: email: Path `email` is required., password: Path `password` is required.',
				name: 'ValidationError'
			}
		});
		//GET req to users collection with email and pass
		//and get the user that matches those credentials

		//Put this inside the 'then' clause:
		// if (_.isEmpty(this.state.errors)) {
		// 	this.setState({ redirect: true }, () => {
		// 		//then this.props.onLogIn(user);
		// 	});
		// }

		//if any errors set the errors state obj to the one returned .
	}

	renderForm(data) {
		return data.map(item => {
			return (
				<div className="formItemBox">
					<p className="formTitle">{item.title}</p>
					{item.title !== 'Password' ? (
						<input
							type="text"
							value={this.state.email}
							onChange={this.handleEmail}
							className="formInput"
							placeholder={item.placeholder}
						/>
					) : (
						<input
							type="password"
							value={this.state.password}
							onChange={this.handlePass}
							className="formInput"
							placeholder={item.placeholder}
						/>
					)}
				</div>
			);
		});
	}

	render() {
		const { redirect, errors } = this.state;
		const formData = [
			{ title: 'Email', placeholder: 'Enter your email' },
			{ title: 'Password', placeholder: 'Enter your password' }
		];
		return (
			<Layout className="routeBox" activeRoute={3} user={this.props.user}>
				{redirect ? (
					<Redirect to="/" />
				) : (
					<div className="loginBox">
						<p className="loginText">Sign In</p>
						<div className="credentialsBox">
							{this.renderForm(formData)}
						</div>
						<button
							className="signInButton"
							onClick={this.handleClick}
						>
							SIGN IN
						</button>
						<Link to={'/signup'} className="createAccButton">
							CREATE AN ACCOUNT
						</Link>
						<Rodal
							visible={!_.isEmpty(this.state.errors)}
							animation="zoom"
							onClose={this.hideError}
						>
							<p
								className="modalTitle"
								style={{ color: '#F44336' }}
							>
								Error!
							</p>
							<div className="errorBox">
								<p className="errorMessage">{errors.message}</p>
								<button
									className="modalDone"
									onClick={this.hideError}
								>
									OK
								</button>
							</div>
						</Rodal>
					</div>
				)}
			</Layout>
		);
	}
}

export default Login;
