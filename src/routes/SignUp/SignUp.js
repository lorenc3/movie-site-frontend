import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import Rodal from 'rodal';

import Layout from '../../components/Layout/Layout';

import './SignUp.css';
import 'rodal/lib/rodal.css';

class SignUp extends Component {
	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);
		this.handleGenreClick = this.handleGenreClick.bind(this);
		this.handleEmail = this.handleEmail.bind(this);
		this.handleName = this.handleName.bind(this);
		this.handlePass = this.handlePass.bind(this);
		this.renderForm = this.renderForm.bind(this);
		this.renderCategories = this.renderCategories.bind(this);
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);
		this.hideError = this.hideError.bind(this);

		this.state = {
			email: '',
			password: '',
			name: '',
			redirect: false,
			visible: false,
			selectedGenres: [],
			genres: [],
			errors: {}
		};
	}

	componentDidMount() {
		axios
			.get(
				'https://api.themoviedb.org/3/genre/movie/list?api_key=52847a5fec3921c2383c109952fa0141&language=en-US'
			)
			.then(response => {
				const genres = response.data.genres.slice(0, 18);
				this.setState({ genres });
			})
			.catch(err => {
				console.log(err);
			});
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
		//For testing. Delete.
		this.setState({
			errors: {
				//...
				_message: 'User validation failed',
				message:
					'User validation failed: email: Path `email` is required., password: Path `password` is required.',
				name: 'ValidationError'
			}
		});
		//POST req to users collection with email, pass,
		//name and selectedGenres arr and get the user back.

		//Put this inside the 'then' clause:
		// if (_.isEmpty(this.state.errors)) {
		// 	this.setState({ redirect: true }, () => {
		// 		//then this.props.onSignUp(user);
		// 	});
		// }

		//if any errors set the errors state obj to the one returned .
	}

	handleGenreClick(name) {
		if (this.state.selectedGenres.includes(name)) {
			var selected = [...this.state.selectedGenres];
			var index = selected.indexOf(name);
			selected.splice(index, 1);
			this.setState({ selectedGenres: selected });
		} else if (this.state.selectedGenres.length < 3) {
			var newArr = [...this.state.selectedGenres, name];
			this.setState({ selectedGenres: newArr });
		}
	}

	hideError() {
		this.setState({ errors: {} });
	}

	show() {
		this.setState({ visible: true });
	}

	hide() {
		this.setState({ visible: false });
	}

	renderCategories() {
		return this.state.genres.length !== 0
			? this.state.genres.map(item => {
					return (
						<button
							key={item.id}
							onClick={() => this.handleGenreClick(item.name)}
							className="selectCat"
							style={
								this.state.selectedGenres.includes(item.name)
									? { color: 'red' }
									: null
							}
						>
							{item.name === 'Documentary'
								? 'Doc'
								: item.name && item.name === 'Science Fiction'
								? 'Sci-Fi'
								: item.name}
						</button>
					);
			  })
			: null;
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
		const { redirect, errors } = this.state;
		const formData = [
			{ title: 'Username', placeholder: 'Enter your username' },
			{ title: 'Email', placeholder: 'Enter your email' },
			{ title: 'Password', placeholder: 'Enter your password' }
		];
		return (
			<Layout className="routeBox" user={this.props.user}>
				{redirect ? (
					<Redirect to="/" />
				) : (
					<div className="loginBox">
						<p className="loginText">Sign Up</p>
						<div className="credentialsBox">
							{this.renderForm(formData)}
						</div>
						<button className="chooseButton" onClick={this.show}>
							CHOOSE GENRES
						</button>
						<Rodal
							visible={this.state.visible}
							height={450}
							width={450}
							animation="zoom"
							onClose={this.hide}
						>
							<p className="modalTitle">Choose 3 genres</p>
							<div className="modalBox">
								{this.renderCategories()}
							</div>
							<button
								className="modalDone"
								style={{
									opacity:
										this.state.selectedGenres.length !== 3
											? 0.5
											: 1
								}}
								onClick={this.hide}
								disabled={
									this.state.selectedGenres.length !== 3
								}
							>
								Done
							</button>
						</Rodal>
						<button
							className="signInButton"
							onClick={this.handleClick}
						>
							SIGN UP
						</button>
						<Link to={'/login'} className="createAccButton">
							LOG IN
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

export default SignUp;
