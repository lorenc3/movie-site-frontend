import React, { Component } from 'react';
import axios from 'axios';

import Layout from '../../components/Layout/Layout';
import './Review.css';

const maxWidth = window.screen.availWidth;

class Review extends Component {
	constructor() {
		super();

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTextarea = this.handleTextarea.bind(this);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.handleImageError = this.handleImageError.bind(this);

		this.state = {
			ratingValue: '0',
			width: 0,
			imagePath: '',
			movieTitle: '',
			reviewText: ''
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		axios
			.get(
				`https://api.themoviedb.org/3/movie/${id}?api_key=52847a5fec3921c2383c109952fa0141&
                 language=en-US`
			)
			.then(response => {
				const imagePath = `https://image.tmdb.org/t/p/w300${
					response.data.poster_path
				}`;
				const movieTitle = response.data.title;
				this.setState({ imagePath, movieTitle });
			})
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

	handleSubmit() {
		//if this.props.user !== null ->
		//POST req to server to reviews collection with ratingValue,
		//reviewText, movieId, userId, username
	}

	handleTextarea(ev) {
		const value = ev.target.value;
		this.setState({ reviewText: value });
	}

	handleChange(event) {
		const ratingValue = event.target.value;
		this.setState({ ratingValue }, () => {
			console.log(this.state.ratingValue);
		});
	}

	handleImageError(ev) {
		ev.target.src = require('../../assets/images/placeholder_big.png');
	}

	render() {
		const { imagePath, width, movieTitle, reviewText } = this.state;
		return (
			<Layout className="routeBox">
				<div className="reviewBox">
					<p className="reviewText">Review - {movieTitle}</p>
					<div className="reviewMovieBox">
						<div className="reviewInfoBox">
							<p className="reviewSectionText">Rate Movie</p>
							<fieldset
								className="rating"
								style={{ marginLeft: 20 }}
							>
								<input
									type="radio"
									id="star5"
									name="rating"
									checked={this.state.ratingValue === '5'}
									value="5"
									onChange={this.handleChange}
								/>
								<label
									className="full"
									htmlFor="star5"
									title="5 stars"
								/>
								<input
									type="radio"
									id="star4.5"
									name="rating"
									checked={this.state.ratingValue === '4.5'}
									value="4.5"
									onChange={this.handleChange}
								/>
								<label
									className="half"
									htmlFor="star4.5"
									title="4.5 stars"
								/>
								<input
									type="radio"
									id="star4"
									name="rating"
									checked={this.state.ratingValue === '4'}
									value="4"
									onChange={this.handleChange}
								/>
								<label
									className="full"
									htmlFor="star4"
									title="4 stars"
								/>
								<input
									type="radio"
									id="star3.5"
									name="rating"
									checked={this.state.ratingValue === '3.5'}
									value="3.5"
									onChange={this.handleChange}
								/>
								<label
									className="half"
									htmlFor="star3.5"
									title="3.5 stars"
								/>
								<input
									type="radio"
									id="star3"
									name="rating"
									checked={this.state.ratingValue === '3'}
									value="3"
									onChange={this.handleChange}
								/>
								<label
									className="full"
									htmlFor="star3"
									title="3 stars"
								/>
								<input
									type="radio"
									id="star2.5"
									name="rating"
									checked={this.state.ratingValue === '2.5'}
									value="2.5"
									onChange={this.handleChange}
								/>
								<label
									className="half"
									htmlFor="star2.5"
									title="2.5 stars"
								/>
								<input
									type="radio"
									id="star2"
									name="rating"
									checked={this.state.ratingValue === '2'}
									value="2"
									onChange={this.handleChange}
								/>
								<label
									className="full"
									htmlFor="star2"
									title="2 stars"
								/>
								<input
									type="radio"
									id="star1.5"
									name="rating"
									checked={this.state.ratingValue === '1.5'}
									value="1.5"
									onChange={this.handleChange}
								/>
								<label
									className="half"
									htmlFor="star1.5"
									title="1.5 stars"
								/>
								<input
									type="radio"
									id="star1"
									name="rating"
									checked={this.state.ratingValue === '1'}
									value="1"
									onChange={this.handleChange}
								/>
								<label
									className="full"
									htmlFor="star1"
									title="1 star"
								/>
								<input
									type="radio"
									id="star0.5"
									name="rating"
									checked={this.state.ratingValue === '0.5'}
									value="0.5"
									onChange={this.handleChange}
								/>
								<label
									className="half"
									htmlFor="star0.5"
									title="0.5 stars"
								/>
							</fieldset>
							<p className="reviewSectionText">
								Write your thoughts
							</p>
							<textarea
								placeholder="Your review..."
								value={reviewText}
								onChange={this.handleTextarea}
								cols="50"
								rows="10"
							/>
							<div className="reviewButtonBox">
								<button
									className="reviewButton"
									onClick={this.handleSubmit}
								>
									SUBMIT
								</button>
							</div>
						</div>
						{width >= maxWidth * 0.9 ? (
							<img
								onError={this.handleImageError}
								className="movieImageRe"
								src={imagePath}
								alt="poster"
							/>
						) : null}
					</div>
				</div>
			</Layout>
		);
	}
}

export default Review;
