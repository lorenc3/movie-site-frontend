import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { MdThumbUp } from 'react-icons/md';
import { IconContext } from 'react-icons';

import Layout from '../../components/Layout/Layout';
import Poster from '../../components/Poster/Poster';
import './Profile.css';

const maxWidth = window.screen.availWidth;

class Profile extends Component {
	constructor(props) {
		super(props);

		this.sectionColor = this.sectionColor.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleFeed = this.handleFeed.bind(this);
		this.handleAcc = this.handleAcc.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.renderReviews = this.renderReviews.bind(this);
		this.handleLike = this.handleLike.bind(this);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

		this.state = {
			//Placeholder state. Replace user with props.user
			width: 0,
			redirect: false,
			activeSection: 'feed',
			user: props.user,
			liked: [], //arr with id's of reviews that current user has liked
			//Placeholder state for reviews. Update with data from Db.
			//Reviews sorted by new that userId is included in follows arr.
			reviews: [
				{
					id: 12993820,
					movie: { id: 12738, title: 'Venom' },
					rating: 2.5,
					text:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					userId: 1234,
					username: 'james',
					liked: [1234, 1253, 2142, 4365] //users that have liked this review
				},
				{
					id: 12876182,
					movie: { id: 11738, title: 'Her' },
					rating: 4,
					text:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					userId: 1232,
					username: 'david',
					liked: [1232, 1253] //users that have liked this review
				}
			] //Array of objects
		};
	}

	componentDidMount() {
		//map over the reviews arr.
		//if item.liked includes the id of the current user
		//push that review id to liked state.

		const { user } = this.state;
		const genres =
			user.categories.length <= 3
				? user.categories
				: user.categories.slice(0, 3);
		var id1 = genres[0].id;
		var id2 = genres[1].id;
		var id3 = genres[2].id;

		axios
			.all([
				axios.get(
					`https://api.themoviedb.org/3/discover/movie?api_key=52847a5fec3921c2383c109952fa0141&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id1}`
				),
				axios.get(
					`https://api.themoviedb.org/3/discover/movie?api_key=52847a5fec3921c2383c109952fa0141&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id2}`
				),
				axios.get(
					`https://api.themoviedb.org/3/discover/movie?api_key=52847a5fec3921c2383c109952fa0141&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id3}`
				)
			])
			.then(
				axios.spread((genre1Res, genre2Res, genre3Res) => {
					var o = {};
					o[genres[0].name] = genre1Res.data.results.slice(0, 9);
					o[genres[1].name] = genre2Res.data.results.slice(0, 9);
					o[genres[2].name] = genre3Res.data.results.slice(0, 9);
					this.setState(
						{ genresData: o, active: genres[0].name },
						() => {
							console.log(this.state.genresData);
						}
					);
				})
			)
			.catch(err => {
				console.log(err);
			});

		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	handleLogout() {
		//PATCH req to server to remove the session token from
		//current user
		this.setState({ redirect: true }, () => {
			this.props.onLogOut();
		});
	}

	handleFeed() {
		this.setState({ activeSection: 'feed' });
	}

	handleAcc() {
		this.setState({ activeSection: 'account' });
	}

	sectionColor(index) {
		switch (index) {
			case 1:
				return '#2C2C54';
				break;
			case 2:
				return '#00563D';
				break;
			case 3:
				return '#F44336';
				break;
			default:
				return '#A40E4C';
				break;
		}
	}

	handleClick(item) {
		this.setState({
			active: item.name
		});
	}

	handleLike(id, movieId) {
		if (this.state.liked.includes(id)) {
			var liked = [...this.state.liked];
			var index = liked.indexOf(id);
			liked.splice(index, 1);
			this.setState({ liked }, () => {
				//PATCH req to server to update the review that matches movieId
				//(details.id)&& id passed and remove the current users id from the
				//liked arr.
			});
		} else {
			var newArr = [...this.state.liked, id];
			this.setState({ liked: newArr }, () => {
				//PATCH req to server to update the review that matches movieId
				//(details.id)&& id passed and add the current users id to the
				//liked arr.
			});
		}
	}

	renderReviews() {
		const { reviews, liked } = this.state;
		if (reviews.length === 0) {
			return (
				<div className="noReviewsBox">
					<p className="noReviewsText">Reviews not available.</p>
				</div>
			);
		}
		return (
			<div className="feedReviews">
				{reviews.map(item => {
					return (
						<div className="feedRevCont" key={item.userId}>
							<div className="feedRevBox">
								<p
									className="feedRevDtlsText"
									style={{
										backgroundColor: '#F44336'
									}}
								>
									{item.rating} / 5
								</p>
								<p
									className="feedRevDtlsText"
									style={{
										backgroundColor: 'none',
										boxShadow: 'none',
										color: 'black'
									}}
								>
									By: {item.username}
								</p>
								,
								<p
									className="feedRevDtlsText"
									style={{
										backgroundColor: 'none',
										fontStyle: 'italic',
										boxShadow: 'none',
										color: 'black'
									}}
								>
									{item.movie.title}
								</p>
							</div>
							<p className="feedRevText">{item.text}</p>
							<div className="feedLikeBox">
								<p
									className="feedRevText"
									style={{
										color: liked.includes(item.id)
											? '#F44336'
											: '#cccccc',
										margin: 0
									}}
								>
									{item.liked.length}
								</p>
								<IconContext.Provider
									value={{
										color: liked.includes(item.id)
											? '#F44336'
											: '#cccccc',
										size: 13
									}}
								>
									<button
										className="feedLikeBtn"
										onClick={() =>
											this.handleLike(
												item.id,
												item.movieId
											)
										}
									>
										<MdThumbUp />
									</button>
								</IconContext.Provider>
							</div>
						</div>
					);
				})}
			</div>
		);
	}

	render() {
		const {
			user,
			genresData,
			active,
			activeSection,
			width,
			redirect
		} = this.state;
		const { userBookmarks } = this.props;
		const genres =
			user.categories.length > 3
				? user.categories
				: user.categories.slice(0, 3);
		const activeIndex =
			active !== 'Review'
				? genres.findIndex(item => item.name === active)
				: 3;
		const review = { name: 'Review' };
		console.log(activeIndex);
		return (
			<Layout user={this.props.user} activeRoute={3}>
				{redirect ? (
					<Redirect to="/" />
				) : (
					<div className="profileBox">
						<div
							className="userBox"
							style={{
								position:
									width > maxWidth * 0.8
										? 'fixed'
										: 'relative'
							}}
						>
							<p className="usernameText">{user.name}</p>
							<div className="accBtn">
								<button
									className="feed"
									onClick={this.handleFeed}
								>
									Feed
								</button>
								<button
									className="acc"
									onClick={this.handleAcc}
								>
									Account
								</button>
								<button
									className="acc"
									onClick={this.handleLogout}
								>
									Log Out
								</button>
							</div>
						</div>

						{activeSection !== 'account' ? (
							<div className="profileContBox">
								<div className="userGenres">
									<div
										className="genreTitleBox"
										style={{
											borderColor: this.sectionColor(
												activeIndex
											),
											position:
												width > maxWidth * 0.8
													? 'fixed'
													: 'relative'
										}}
									>
										{genres.map((item, index) => {
											return (
												<button
													key={item.id}
													className="genreTitle"
													onClick={() =>
														this.handleClick(item)
													}
													style={{
														backgroundColor: this.sectionColor(
															index
														)
													}}
												>
													{item.name}
												</button>
											);
										})}
										<button
											className="genreTitle"
											onClick={() =>
												this.handleClick(review)
											}
											style={{
												backgroundColor: this.sectionColor(
													3
												),
												marginTop: 40
											}}
										>
											Reviews
										</button>
									</div>
									<div className="filmList">
										{genresData !== undefined &&
										active !== 'Review'
											? genresData[active].map(item => {
													var bookmark =
														userBookmarks !== null
															? userBookmarks.includes(
																	item.id
															  )
															: null;
													return (
														<div
															className="filmCont"
															key={item.id}
														>
															<Poster
																item={item}
																size={154}
																margin={10}
																fontSize={11}
																bookmarked={
																	bookmark
																}
																radius="8px"
															/>
															<p className="filmText">
																{item.title}
															</p>
														</div>
													);
											  })
											: this.renderReviews()}
									</div>
								</div>
							</div>
						) : (
							<div className="userInfoBox">
								<div className="userInfoCont">
									<div className="infoTextBox">
										<p className="userInfoText">
											Username:
										</p>
										<p className="userInfoText">Email:</p>
										<p className="userInfoText">
											Categories:
										</p>
										<p className="userInfoText">
											Followers:
										</p>
										<p className="userInfoText">Follows:</p>
										<p className="userInfoText">
											Created At:
										</p>
									</div>
									<div className="infoTextBox">
										<p className="userInfoText">
											{user.name}
										</p>
										<p className="userInfoText">
											{user.email}
										</p>
										<p className="userInfoText">
											{user.categories[0].name},{' '}
											{user.categories[1].name},{' '}
											{user.categories[2].name}
										</p>
										<p className="userInfoText">
											{user.followers.length} users
										</p>
										<p className="userInfoText">
											{user.follows.length} users
										</p>
										<p className="userInfoText">
											{user.createdAt}
										</p>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</Layout>
		);
	}
}

export default Profile;
