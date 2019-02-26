import React, { Component } from 'react';
import { IoIosPlayCircle } from 'react-icons/io';
import { MdBookmarkBorder, MdBookmark } from 'react-icons/md';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

import './Poster.css';

class Poster extends Component {
	constructor(props) {
		super();

		this.state = {
			bookmark: props.bookmarked,
			movie: props.item !== null ? props.item : null
		};

		this.bookmarkMovie = this.bookmarkMovie.bind(this);
		this.handleImageError = this.handleImageError.bind(this);
	}

	bookmarkMovie() {
		const { movie } = this.state;
		this.setState({ bookmark: !this.state.bookmark }, () => {
			if (this.state.bookmark) {
				//Send a Post req to server with item
				//NOTE: Maybe a loader till' the req has finished
				alert(movie.title + ' has been added!');
			} else {
				//Send a Del req to server with item id
				alert(movie.title + ' has been removed!');
			}
		});
	}

	handleImageError(ev) {
		ev.target.src = require('../../assets/images/placeholder.png');
	}

	render() {
		const { size, item, margin, fontSize, radius } = this.props;
		var options = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};
		var date = new Date(item.release_date).toLocaleDateString(
			'en-US',
			options
		);
		const { bookmark } = this.state;
		return (
			<div className="container" style={{ margin, borderRadius: radius }}>
				<img
					className="poster"
					style={{ borderRadius: radius }}
					onError={this.handleImageError}
					src={`https://image.tmdb.org/t/p/w${size}${
						item.poster_path
					}`}
					alt="poster"
				/>
				<div className="overlay" style={{ borderRadius: radius }}>
					<p className="votesText" style={{ fontSize }}>
						{item.vote_average} TMDB
					</p>
					<Link to={`/details/${item.id}`} className="play">
						<IconContext.Provider
							value={{
								color: 'white',
								size: 60
							}}
						>
							<IoIosPlayCircle />
						</IconContext.Provider>
					</Link>
					<p className="dateText" style={{ fontSize }}>
						{date}
					</p>
					{bookmark !== null ? (
						<IconContext.Provider
							value={{
								color: 'white',
								size: 25
							}}
						>
							<button
								className="iconBox"
								onClick={this.bookmarkMovie}
							>
								{bookmark ? (
									<MdBookmark />
								) : (
									<MdBookmarkBorder />
								)}
							</button>
						</IconContext.Provider>
					) : null}
				</div>
			</div>
		);
	}
}

export default Poster;
