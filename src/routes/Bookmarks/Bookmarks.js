import React, { Component } from 'react';
import axios from 'axios';

import Layout from '../../components/Layout/Layout';
import MoviesList from '../../components/MovieList/MovieList';
import './Bookmarks.css';

const maxWidth = window.screen.availWidth;

class Bookmarks extends Component {
	constructor(props) {
		super(props);

		this.handleContent = this.handleContent.bind(this);

		this.state = {
			movies: props.bookmarksCollection
		};

		window.onscroll = () => {
			if (
				window.innerHeight + document.documentElement.scrollTop ===
				document.documentElement.offsetHeight
			) {
				if (this.state.page <= 20) {
					this.getMovies();
				}
			}
		};
	}

	handleContent() {
		const { user, bookmarksCollection, userBookmarks } = this.props;
		const { movies } = this.state;
		if (user === null) {
			return (
				<div className="bookmarkBox">
					<p className="bookmarkText">
						Please login to bookmark movies.
					</p>
				</div>
			);
		} else if (userBookmarks.length === 0) {
			return (
				<div className="bookmarkBox">
					<p className="bookmarkText">
						No bookmarked movies available.
					</p>
				</div>
			);
		}

		return (
			<MoviesList
				data={movies}
				title="Your Bookmarks"
				onChange={() => {}}
				sort={false}
				userBookmarks={userBookmarks}
			/>
		);
	}

	render() {
		return (
			<Layout className="routeBox" activeRoute={2} user={this.props.user}>
				{this.handleContent()}
			</Layout>
		);
	}
}

export default Bookmarks;
