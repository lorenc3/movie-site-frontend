import React, { Component } from 'react';
import axios from 'axios';

import Layout from '../../components/Layout/Layout';
import MoviesList from '../../components/MovieList/MovieList';
import './Bookmarks.css';

const maxWidth = window.screen.availWidth;

class Bookmarks extends Component {
	constructor() {
		super();

		this.state = {
			movies: []
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

	componentDidMount() {
		const { bookmarksCollection } = this.props;
		this.setState({ movies: bookmarksCollection });
		//GET req to server for bookmarks collection that are created by loged in user
	}

	render() {
		const { userBookmarks } = this.props;
		const { movies } = this.state;
		return (
			<Layout className="routeBox" activeRoute={2}>
				{this.state.movies.length !== 0 ? (
					<MoviesList
						data={movies}
						title="Your Bookmarks"
						onChange={() => {}}
						sort={false}
						userBookmarks={userBookmarks}
					/>
				) : null}
			</Layout>
		);
	}
}

export default Bookmarks;
