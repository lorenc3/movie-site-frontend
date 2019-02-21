import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import Layout from '../../components/Layout/Layout';

import './SignUp.css';

class SignUp extends Component {
	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handleName = this.handleName.bind(this);
		this.handlePass = this.handlePass.bind(this);
		this.renderForm = this.renderForm.bind(this);

		this.state = {
			email: '',
			password: '',
			name: ''
		};
	}

	handleEmail(event) {
		const email = event.target.value;
		this.setState({ email });
	}

	handleName(event) {
		const name = event.target.value;
		this.setState({ name });
	}

	handlePass(event) {
		const password = event.target.value;
		this.setState({ password });
	}

	handleClick() {
		//POST req to users collection with email, pass & name
		//and get the user back.
		//then this.props.onSignUp(user);
	}

	renderForm(data) {
		return data.map(item => {
			return (
				<div className="formItemBox">
					<p className="formTitle">{item.title}</p>
					{item.title !== 'Password' ? (
						<input
							type="text"
							value={
								item.title === 'Email'
									? this.state.email
									: this.state.name
							}
							onChange={
								item.title === 'Email'
									? this.handleEmail
									: this.handleName
							}
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
		const formData = [
			{ title: 'Username', placeholder: 'Enter your username' },
			{ title: 'Email', placeholder: 'Enter your email' },
			{ title: 'Password', placeholder: 'Enter your password' }
		];
		return (
			<Layout className="routeBox">
				<div className="loginBox">
					<p className="loginText">Sign Up</p>
					<div className="credentialsBox">
						{this.renderForm(formData)}
					</div>
					<button className="signInButton">SIGN UP</button>
					<Link to={'/login'} className="createAccButton">
						LOG IN
					</Link>
				</div>
			</Layout>
		);
	}
}

export default SignUp;
