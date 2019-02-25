import React, { Component } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { MdThumbUp } from 'react-icons/md';
import { IconContext } from 'react-icons';

import Poster from '../../components/Poster/Poster';

import './MovieInfo.css';

class MovieInfo extends Component {
	constructor(props) {
		super(props);

		this.renderStream = this.renderStream.bind(this);
		this.renderGeneral = this.renderGeneral.bind(this);
		this.renderOverview = this.renderOverview.bind(this);
		this.renderTrailer = this.renderTrailer.bind(this);
		this.renderGenres = this.renderGenres.bind(this);
		this.renderCast = this.renderCast.bind(this);
		this.renderCrew = this.renderCrew.bind(this);
		this.renderRecommended = this.renderRecommended.bind(this);
		this.renderSimilar = this.renderSimilar.bind(this);
		this.renderLinks = this.renderLinks.bind(this);
		this.renderReviews = this.renderReviews.bind(this);
		this.handleImageError = this.handleImageError.bind(this);
		this.handleLike = this.handleLike.bind(this);

		this.state = {
			index: 4,
			index1: 3,
			index2: 3,
			liked: [],
			details: props.details,
			genres: props.genres,
			videoKey: props.videoKey,
			actors: props.actors,
			directors: props.directors,
			socials: props.socials,
			similar: props.similar,
			recommendations: props.recommendations,
			reviews: props.reviews
		};
	}

	componentDidMount() {
		//map over the reviews arr.
		//if item.liked includes the id of the current user
		//push that review id to liked state.
	}

	handleImageError(ev) {
		ev.target.src = require('../../assets/images/profile.png');
	}

	handleScroll(i) {
		this.setState({ index: i });

		this.refs[i].scrollIntoView({
			inline: 'end',
			behavior: 'smooth'
		});
	}

	handleRecScroll(i) {
		this.setState({ index2: i });

		this.refs[i + 40].scrollIntoView({
			inline: 'end',
			behavior: 'smooth'
		});
	}

	handleSimScroll(i) {
		this.setState({ index1: i });

		this.refs[i + 20].scrollIntoView({
			inline: 'end',
			behavior: 'smooth'
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

	renderStream(title) {
		const { socials } = this.state;
		if (_.isEmpty(socials)) {
			return null;
		}
		return (
			<div className="details" style={{ width: '100%' }}>
				<p className="detailsTitle">Stream</p>
				<iframe
					title={title}
					className="trailer"
					src={`https://videospider.in/getvideo?key=Eqvv2uJrorySaQeS&video_id=${
						socials.imdb_id
					}`}
					// src={`http://vplus.ucoz.com/${socials.imdb_id}`}
					frameBorder="0"
					allowFullScreen
				/>
			</div>
		);
	}

	renderGeneral(budget, revenue, release_date) {
		const options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};
		return (
			<div className="details" style={{ width: '100%' }}>
				<p className="detailsTitle">General</p>
				<div className="general">
					<p
						className="generalText"
						style={{
							backgroundColor: 'rgb(255, 32, 32)'
						}}
					>
						Budget:{' '}
						{budget !== 0
							? String(budget).replace(
									/\B(?=(\d{3})+(?!\d))/g,
									','
							  )
							: 'pending'}
					</p>
					<p
						className="generalText"
						style={{
							backgroundColor: 'rgb(255, 32, 32)'
						}}
					>
						Revenue:{' '}
						{revenue !== 0
							? String(revenue).replace(
									/\B(?=(\d{3})+(?!\d))/g,
									','
							  )
							: 'pending'}
					</p>
					<p
						className="generalText"
						style={{
							backgroundColor: 'rgb(255, 32, 32)'
						}}
					>
						Date:{' '}
						{release_date !== 0
							? new Date(release_date).toLocaleDateString(
									'en-US',
									options
							  )
							: 'pending'}
					</p>
				</div>
			</div>
		);
	}

	renderOverview(overview) {
		return (
			<div className="details" style={{ width: '100%' }}>
				<p className="detailsTitle">Overview</p>
				<p className="overviewText">
					{overview !== '' ? overview : 'Plot unknown.'}
				</p>
			</div>
		);
	}

	renderTrailer(title) {
		const { videoKey } = this.state;
		if (videoKey === '') {
			return (
				<div className="details" style={{ width: '100%' }}>
					<p className="detailsTitle">Trailer</p>
					<p className="overviewText">Trailer not available</p>
				</div>
			);
		}
		return (
			<div className="details" style={{ width: '100%' }}>
				<p className="detailsTitle">Trailer</p>
				<iframe
					title={title}
					className="trailer"
					src={`https://www.youtube.com/embed/${videoKey}`}
					frameBorder="0"
					allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen="allowfullscreen"
				/>
			</div>
		);
	}

	renderGenres(genres) {
		return (
			<div className="details" style={{ width: '100%' }}>
				<p className="detailsTitle">Genres</p>
				<div className="ctgBox">
					{genres.map(item => {
						return (
							<Link
								to={{
									pathname: `/categories/${item.id}`,
									state: { name: item.name }
								}}
								className="ctgText"
								key={item.id}
								style={{
									backgroundColor: 'rgb(255, 32, 32)'
								}}
							>
								{item.name}
							</Link>
						);
					})}
				</div>
			</div>
		);
	}

	renderCast() {
		const { actors, index } = this.state;
		const scrollIndex = index + 5 >= actors.length ? 3 : index + 5;
		if (actors.length === 0) {
			return (
				<div className="details" style={{ width: '100%' }}>
					<p className="detailsTitle">Cast</p>
					<p className="overviewText">Cast not available</p>
				</div>
			);
		}
		return (
			<div className="details" style={{ width: '100%' }}>
				<p className="detailsTitle">Cast</p>
				<div className="castCont">
					<div className="castBox">
						{actors.map((item, i) => {
							return (
								<div className="actorBox" key={i} ref={i}>
									<img
										className="actorImg"
										onError={this.handleImageError}
										src={`https://image.tmdb.org/t/p/w92${
											item.profile_path
										}`}
										alt="profile"
									/>
									<p className="actorName">{item.name}</p>
									<p className="actorChar">
										{item.character}
									</p>
								</div>
							);
						})}
					</div>
					{actors.length > 6 ? (
						<button
							className="nextActorButton"
							onClick={() => this.handleScroll(scrollIndex)}
						>
							Next
						</button>
					) : null}
				</div>
			</div>
		);
	}

	renderCrew() {
		const { directors } = this.state;
		if (directors.length === 0) {
			return (
				<div className="details" style={{ width: '100%' }}>
					<p className="detailsTitle">Cast</p>
					<p className="overviewText">Director/s not available</p>
				</div>
			);
		}
		return (
			<div className="details" style={{ width: '100%' }}>
				<p className="detailsTitle">Director/s</p>
				<div className="castCont">
					<div
						className="castBox"
						style={{
							justifyContent: 'center'
						}}
					>
						{directors.map((item, i) => {
							return (
								<div className="actorBox" key={item.id}>
									<img
										className="actorImg"
										onError={this.handleImageError}
										src={`https://image.tmdb.org/t/p/w92${
											item.profile_path
										}`}
										alt="profile"
									/>
									<p className="actorName">{item.name}</p>
									<p className="actorChar">
										{item.character}
									</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		);
	}

	renderRecommended() {
		const { recommendations, index2 } = this.state;
		const { userBookmarks } = this.props;
		const scrollIndex2 =
			index2 + 3 >= recommendations.length ? 2 : index2 + 3;
		if (recommendations.length === 0) {
			return (
				<div className="details" style={{ width: '100%' }}>
					<p className="detailsTitle">Recommended</p>
					<p className="overviewText">
						Recommendations not available
					</p>
				</div>
			);
		}
		return (
			<div className="details" style={{ width: '100%' }}>
				<p className="detailsTitle">Recommended</p>
				<div className="castCont">
					<div className="castBox">
						{recommendations.map((item, i) => {
							var bookmark =
								userBookmarks !== null
									? userBookmarks.includes(item.id)
									: null;
							return (
								<div className="actorBox" key={i} ref={i + 40}>
									<Poster
										item={item}
										size={154}
										margin={10}
										fontSize={11}
										radius="8px"
										bookmarked={bookmark}
									/>
									<p className="actorName">{item.title}</p>
								</div>
							);
						})}
					</div>
					{recommendations.length > 3 ? (
						<button
							className="nextActorButton"
							onClick={() => this.handleRecScroll(scrollIndex2)}
						>
							Next
						</button>
					) : null}
				</div>
			</div>
		);
	}

	renderSimilar() {
		const { similar, index1 } = this.state;
		const { userBookmarks } = this.props;
		const scrollIndex1 = index1 + 3 >= similar.length ? 2 : index1 + 3;
		if (similar.length === 0) {
			return (
				<div className="details" style={{ width: '100%' }}>
					<p className="detailsTitle">Similar</p>
					<p className="overviewText">Similar movies not available</p>
				</div>
			);
		}
		return (
			<div className="details" style={{ width: '100%' }}>
				<p className="detailsTitle">Similar</p>
				<div className="castCont">
					<div className="castBox">
						{similar.map((item, i) => {
							var bookmark =
								userBookmarks !== null
									? userBookmarks.includes(item.id)
									: null;
							return (
								<div className="actorBox" key={i} ref={i + 20}>
									<Poster
										item={item}
										size={154}
										margin={10}
										fontSize={11}
										radius="8px"
										bookmarked={bookmark}
									/>
									<p className="actorName">{item.title}</p>
								</div>
							);
						})}
					</div>
					{similar.length > 3 ? (
						<button
							className="nextActorButton"
							onClick={() => this.handleSimScroll(scrollIndex1)}
						>
							Next
						</button>
					) : null}
				</div>
			</div>
		);
	}

	renderLinks(website) {
		const { socials } = this.state;
		const links = [
			{
				id: 0,
				target: socials.imdb_id,
				name: 'IMDb',
				url: `https://www.imdb.com/title/${socials.imdb_id}`,
				color: '#FFCA28'
			},
			{
				id: 1,
				target: socials.facebook_id,
				name: 'Facebook',
				url: `https://www.facebook.com/${socials.facebook_id}`,
				color: '#3B5998'
			},
			{
				id: 2,
				target: socials.instagram_id,
				name: 'Instagram',
				url: `https://www.instagram.com/${socials.instagram_id}`,
				color: '#F44747'
			},
			{
				id: 3,
				target: socials.twitter_id,
				name: 'Twitter',
				url: `https://www.twitter.com/${socials.twitter_id}`,
				color: '#55ACEE'
			},
			{
				id: 4,
				target: website,
				name: 'Website',
				url: website,
				color: '#77C159'
			}
		];
		if (
			socials.imdb_id === null &&
			socials.facebook_id === null &&
			socials.twitter_id === null &&
			socials.instagram_id === null
		) {
			return (
				<div className="details" style={{ width: '100%' }}>
					<p className="detailsTitle">Links</p>
					<p className="overviewText">Links not available</p>
				</div>
			);
		}

		return (
			<div className="details" style={{ width: '100%' }}>
				<p className="detailsTitle">Links</p>
				<div className="ctgBox">
					{links.map(item => {
						if (item.target === null) {
							return null;
						}
						return (
							<a
								href={item.url}
								target="_blank"
								className="ctgText"
								key={item.id}
								style={{
									backgroundColor: item.color,
									color: item.id === 0 ? 'black' : 'white'
								}}
							>
								{item.name}
							</a>
						);
					})}
				</div>
			</div>
		);
	}

	renderReviews() {
		const { reviews, liked } = this.state;
		if (reviews.length === 0) {
			return (
				<div className="details" style={{ width: '100%' }}>
					<p className="detailsTitle">Reviews</p>
					<p className="overviewText">Reviews not available.</p>
				</div>
			);
		}
		return (
			<div className="details" style={{ width: '100%' }}>
				<p className="detailsTitle">Reviews</p>
				{reviews.map(item => {
					return (
						<div className="revCont" key={item.userId}>
							<div className="revBox">
								<p
									className="revDtlsText"
									style={{
										backgroundColor: 'rgb(255, 208, 0)',
										color: 'black'
									}}
								>
									{item.rating} / 5
								</p>
								<p className="revDtlsText">
									By: {item.username}
								</p>
							</div>
							<p className="revText">{item.text}</p>
							<div className="likeBox">
								<p
									className="revText"
									style={{
										color: liked.includes(item.id)
											? '#FFCA28'
											: '#ffffff49',
										margin: 0
									}}
								>
									{item.liked.length}
								</p>
								<IconContext.Provider
									value={{
										color: liked.includes(item.id)
											? '#FFCA28'
											: '#ffffff49',
										size: 13
									}}
								>
									<button
										className="likeBtn"
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
		const { details } = this.state;
		return (
			<div className="details">
				{this.renderStream(details.title)}
				{this.renderGeneral(
					details.budget,
					details.revenue,
					details.release_date
				)}
				{this.renderOverview(details.overview)}
				{this.renderTrailer(details.title)}
				{this.renderGenres(details.genres)}
				{this.renderCast()}
				{this.renderCrew()}
				{this.renderRecommended()}
				{this.renderSimilar()}
				{this.renderLinks(details.homepage)}
				{this.renderReviews()}
			</div>
		);
	}
}

export default MovieInfo;
