import React, { Component } from 'react';

import './UsersProfile.css';
import Layout from '../../components/Layout/Layout';

class UsersProfile extends Component {
	constructor(props) {
		super(props);

		this.handleClick = this.handleClick.bind(this);
		this.handleErrorStyle = this.handleErrorStyle.bind(this);

		this.state = {
			followText: 'FOLLOW',
			//Placeholder state. Update with data from the Db.
			user: {
				id: 1234,
				name: 'james431',
				email: 'james2@gmail.com',
				categories: [
					{ name: 'Adventure', id: 12 },
					{ name: 'Sci-Fi', id: 878 },
					{ name: 'Action', id: 28 }
				],
				follows: [1234, 2312],
				followers: [2312, 3214, 4242, 5112],
				createdAt: '20.02.2019'
			}
		};
	}

	componentDidMount() {
		//const { name } = this.props.match.params;
		//GET req to server to get the user with
		//the provided unique name and set state of user
		//if err set user to null
	}

	handleErrorStyle() {
		const { followText } = this.state;
		switch (followText) {
			case '✔ Success':
				return '#00E676';
			case 'X Error':
				return '#F44336';
			default:
				return '#3f51b5';
		}
	}

	handleClick() {
		//PATCH req to current user and insert
		//the id of followed user to follows arr
		//PATCH req to followed user to update user
		//and insert the id of current user to followers
		//arr.

		//if success
		this.setState({ followText: '✔ Success' });

		//if err

		//this.setState({ followText: 'X Error' });
	}

	render() {
		const { name } = this.props.match.params;
		const { followText } = this.state;
		const userToFollow = this.state.user;
		const { user } = this.props; //current user logged in
		return (
			<Layout user={user}>
				<div className="usersBox">
					{userToFollow !== null ? (
						<div
							className="usersCont"
							style={{
								borderColor: this.handleErrorStyle()
							}}
						>
							{' '}
							<p className="nameText">{name}</p>
							<div className="followBox">
								<p className="followText">
									{userToFollow.followers.length} followers
								</p>
								<p className="followText">
									{userToFollow.follows.length} follows
								</p>
							</div>
							<button
								disabled={user === null}
								className="followButton"
								onClick={this.handleClick}
								style={{
									backgroundColor: this.handleErrorStyle()
								}}
							>
								{followText}
							</button>
							<p className="favGenresText">Favorite Genres: </p>
							<div className="favGenresBox">
								<p className="genreText">
									{userToFollow.categories[0].name}
								</p>
								<p className="genreText">
									{userToFollow.categories[1].name}
								</p>
								<p className="genreText">
									{userToFollow.categories[2].name}
								</p>
							</div>
						</div>
					) : null}
				</div>
			</Layout>
		);
	}
}

export default UsersProfile;
