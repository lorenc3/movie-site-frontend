import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import Layout from '../../components/Layout/Layout';
import './Login.css';

class Login extends Component {
	constructor() {
		super();

		this.handleEmail = this.handleEmail.bind(this);
		this.handlePass = this.handlePass.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.renderForm = this.renderForm.bind(this);

		this.state = {
			email: '',
			password: '',
			redirect: false
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

	handleClick() {
		//GET req to users collection with email and pass
		//and get the user that matches those credentials
		this.setState({ redirect: true }, () => {
			//then this.props.onLogIn(user);
		});
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
		const { redirect } = this.state;
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
					</div>
				)}
			</Layout>
		);
	}
}

export default Login;
