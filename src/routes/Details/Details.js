import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Link } from 'react-router-dom';

import './Details.css';

import Layout from '../../components/Layout/Layout';
import MovieInfo from '../../components/MovieInfo/MovieInfo';

const maxWidth = window.screen.availWidth;

class Details extends Component {
	constructor(props) {
		super(props);

		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.handleImageError = this.handleImageError.bind(this);

		this.state = {
			width: 0,
			details: {},
			genres: [],
			videoKey: '',
			actors: [],
			directors: [],
			socials: {},
			similar: [],
			recommendations: [],
			//Placeholder state for reviews. Update with data from Db.
			reviews: [
				{
					id: 12993820,
					movieId: 12738,
					rating: 2.5,
					text:
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
					userId: 1234,
					username: 'james',
					liked: [1234, 1253, 2142, 4365] //users that have liked this review
				},
				{
					id: 12876182,
					movieId: 12738,
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
		const { id } = this.props.match.params;
		axios
			.all([
				axios.get(
					`https://api.themoviedb.org/3/movie/
					${id}
					?api_key=52847a5fec3921c2383c109952fa0141&language=en-US`
				),

				axios.get(
					`https://api.themoviedb.org/3/movie/
					${id}
					/videos?api_key=52847a5fec3921c2383c109952fa0141&language=en-US`
				),

				axios.get(`https://api.themoviedb.org/3/movie/
				${id}
				/credits?api_key=52847a5fec3921c2383c109952fa0141`),

				axios.get(`https://api.themoviedb.org/3/movie/
				${id}
				/external_ids?api_key=52847a5fec3921c2383c109952fa0141`),

				axios.get(
					`https://api.themoviedb.org/3/movie/
					${id}
					/recommendations?api_key=52847a5fec3921c2383c109952fa0141&language=en-US&page=1`
				),

				axios.get(
					`https://api.themoviedb.org/3/movie/
					${id}
					/similar?api_key=52847a5fec3921c2383c109952fa0141&language=en-US&page=1`
				)

				//GET req to server for reviews with this movieId and sort
				//to most liked reviews (or most recent ones idk...)
			])
			.then(
				axios.spread((
					detailsRes,
					videoRes,
					creditsRes,
					socialRes,
					recommendationsRes,
					similarRes
					// reviewsRes
				) => {
					const video = videoRes.data.results.filter(
						obj => obj.type === 'Trailer'
					);
					const directors = creditsRes.data.crew.filter(
						obj => obj.job === 'Director'
					);
					const actors = creditsRes.data.cast.slice(0, 20);
					const socials = socialRes.data;
					const recommendations = recommendationsRes.data.results.slice(
						0,
						12
					);
					const similar = similarRes.data.results.slice(0, 12);
					this.setState({
						videoKey: video[0] !== undefined ? video[0].key : '',
						details: detailsRes.data,
						genres: detailsRes.data.genres,
						actors,
						directors,
						socials,
						recommendations,
						similar
						// reviews: reviewsRes.data
					});
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

	handleImageError(ev) {
		ev.target.src = require('../../assets/images/placeholder_big.png');
	}

	render() {
		const {
			details,
			width,
			genres,
			videoKey,
			actors,
			directors,
			socials,
			similar,
			recommendations,
			reviews
		} = this.state;

		return (
			<Layout className="detailsBox">
				{!_.isEmpty(details) ? (
					<div className="contentDetailsBox">
						<div className="fixedInfo">
							<div className="posterBox">
								{width >= maxWidth * 0.9 ? (
									<img
										onError={this.handleImageError}
										className="detailsPoster"
										src={`https://image.tmdb.org/t/p/w342/${
											details.poster_path
										}`}
										alt="poster"
									/>
								) : null}
								<p className="detailsPosterText">
									{details.title}
								</p>
								<div className="generalInfo">
									<p className="detailsInfoText">
										{details.vote_average} TMDB
									</p>
									<p className="detailsInfoText">
										{details.runtime !== null
											? details.runtime + ' min'
											: 'Unknown'}
									</p>
									<Link
										to={`/review/${details.id}`}
										className="detailsReviewBtn"
									>
										Review
									</Link>
								</div>
							</div>
						</div>
						<MovieInfo
							details={details}
							genres={genres}
							videoKey={videoKey}
							actors={actors}
							directors={directors}
							socials={socials}
							similar={similar}
							recommendations={recommendations}
							reviews={reviews}
						/>
					</div>
				) : null}
			</Layout>
		);
	}
}

export default Details;
