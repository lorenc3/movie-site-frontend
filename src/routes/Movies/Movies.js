import React, { Component } from 'react';
import axios from 'axios';

import MoviesList from '../../components/MovieList/MovieList';
import Layout from '../../components/Layout/Layout';
import './Movies.css';

const maxWidth = window.screen.availWidth;

class Movies extends Component {
	constructor() {
		super();

		this.handleSortValueChange = this.handleSortValueChange.bind(this);
		this.getMovies = this.getMovies.bind(this);
		this.getSortedMovies = this.getSortedMovies.bind(this);
		// this.movieQuery = this.movieQuery.bind(this);
		this.state = {
			valueSort: 'popularity.desc',
			page: 0,
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
		this.getMovies();
	}

	// movieQuery() {
	// 	const { cast, crew } = this.props;
	// 	if (cast) {
	// 		return 'with_cast';
	// 	} else if (crew) {
	// 		return 'with_crew';
	// 	}
	// 	return 'with_genres';
	// }

	getMovies() {
		const { id } = this.props.match.params;
		const { page, movies } = this.state;
		axios
			.get(
				`https://api.themoviedb.org/3/discover/movie?api_key=52847a5fec3921c2383c109952fa0141&language=en-US&sort_by=${
					this.state.valueSort
				}&include_adult=false&include_video=false&page=${page +
					1}&with_genres=${id}`
			)
			.then(response => {
				const moviesUpdated = movies.concat(response.data.results);
				console.log(movies);
				this.setState({ movies: moviesUpdated, page: page + 1 });
			})
			.catch(err => {
				console.log(err);
			});
	}

	getSortedMovies() {
		this.setState({ page: 0 }, () => {
			const { id } = this.props.match.params;
			const { page, movies } = this.state;
			axios
				.get(
					`https://api.themoviedb.org/3/discover/movie?api_key=52847a5fec3921c2383c109952fa0141&language=en-US&sort_by=${
						this.state.valueSort
					}&include_adult=false&include_video=false&page=${page +
						1}&with_genres=${id}`
				)
				.then(response => {
					const moviesSorted = response.data.results;
					console.log(movies);
					this.setState({ movies: moviesSorted, page: page + 1 });
				})
				.catch(err => {
					console.log(err);
				});
		});
	}

	handleSortValueChange(value) {
		this.setState({ valueSort: value }, () => {
			this.getSortedMovies(this.state.valueSort);
		});
	}

	render() {
		const { userBookmarks } = this.props;
		const { movies } = this.state;
		const { name } = this.props.location.state;
		return (
			<Layout className="routeBox" user={this.props.user}>
				{this.state.movies.length !== 0 ? (
					<MoviesList
						data={movies}
						title={name}
						onChange={this.handleSortValueChange}
						userBookmarks={userBookmarks}
						sort={true}
					/>
				) : null}
			</Layout>
		);
	}
}

export default Movies;
