import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

import Home from './Home/Home';
import Categories from './Categories/Categories';
import Bookmarks from './Bookmarks/Bookmarks';
import Movies from './Movies/Movies';
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Review from './Review/Review';
import Details from './Details/Details';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			//Placeholder state. Delete and update with data from Db.
			userBookmarks: [324668, 297761],
			user: null,
			bookmarksCollection: [
				{
					poster_path: '/e1mjopzAS2KNsvpbpahQ1a6SkSn.jpg',
					adult: false,
					overview:
						'From DC Comics comes the Suicide Squad, an antihero team of incarcerated supervillains who act as deniable assets for the United States government, undertaking high-risk black ops missions in exchange for commuted prison sentences.',
					release_date: '2016-08-03',
					genre_ids: [14, 28, 80],
					id: 297761,
					original_title: 'Suicide Squad',
					original_language: 'en',
					title: 'Suicide Squad',
					backdrop_path: '/ndlQ2Cuc3cjTL7lTynw6I4boP4S.jpg',
					popularity: 48.261451,
					vote_count: 1466,
					video: false,
					vote_average: 5.91
				},
				{
					poster_path: '/lFSSLTlFozwpaGlO31OoUeirBgQ.jpg',
					adult: false,
					overview:
						'The most dangerous former operative of the CIA is drawn out of hiding to uncover hidden truths about his past.',
					release_date: '2016-07-27',
					genre_ids: [28, 53],
					id: 324668,
					original_title: 'Jason Bourne',
					original_language: 'en',
					title: 'Jason Bourne',
					backdrop_path: '/AoT2YrJUJlg5vKE3iMOLvHlTd3m.jpg',
					popularity: 30.690177,
					vote_count: 649,
					video: false,
					vote_average: 5.25
				}
			] //Array of objects
		};
	}

	getUser(user) {
		this.setState({ user });
		//if redux just update the store withe the user
	}

	componentDidMount() {
		// if this.state.user !== null ->
		//Send Get req to server for bookmarks collection of user.
		//map over response data and store each movie id found in a var.
		//var bookmarkIds = [];
		//Set state of bookmarkIds to state.userBookmarks
		//&& the whole bookmarks response data to state.bookmarksCollection.
	}

	render() {
		const { userBookmarks, bookmarksCollection, user } = this.state;
		return (
			<BrowserRouter>
				<div>
					<Route
						exact
						path="/"
						render={props => (
							<Home
								userBookmarks={userBookmarks}
								user={user}
								{...props}
							/>
						)}
					/>
					<Route
						exact
						path="/categories"
						render={props => (
							<Categories
								userBookmarks={userBookmarks}
								user={user}
								{...props}
							/>
						)}
					/>
					<Route
						path="/categories/:id"
						render={props => (
							<Movies
								userBookmarks={userBookmarks}
								user={user}
								{...props}
							/>
						)}
					/>
					<Route
						path="/bookmarks"
						render={props => (
							<Bookmarks
								userBookmarks={userBookmarks}
								user={user}
								bookmarksCollection={bookmarksCollection}
								{...props}
							/>
						)}
					/>
					<Route
						path="/login"
						render={props => (
							<Login
								userBookmarks={userBookmarks}
								onLogin={this.getUser}
								user={user}
								{...props}
							/>
						)}
					/>
					<Route
						path="/signup"
						render={props => (
							<SignUp
								userBookmarks={userBookmarks}
								onSignUp={this.getUser}
								user={user}
								{...props}
							/>
						)}
					/>
					<Route
						path="/review/:id"
						render={props => (
							<Review
								userBookmarks={userBookmarks}
								user={user}
								{...props}
							/>
						)}
					/>
					<Route
						path="/details/:id"
						render={props => (
							<Details
								key={props.match.params.id}
								user={user}
								{...props}
							/>
						)}
					/>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
