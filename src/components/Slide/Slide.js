import React, { Component } from 'react';
import ReactSwipe from 'react-swipe';

import Button from '../Button/Button';
import './Slide.css';
import Poster from '../Poster/Poster';

let reactSwipe;

class Slide extends Component {
	constructor(props) {
		super(props);

		this.renderSlide = this.renderSlide.bind(this);
		this.handleSwipe = this.handleSwipe.bind(this);
	}

	handleSwipe() {
		reactSwipe.next();
	}

	renderSlide() {
		const { nowPlaying, width, maxWidth, userBookmarks } = this.props;
		return nowPlaying.map((item, key) => {
			var bookmark = userBookmarks.includes(item.id);
			return (
				<div key={key}>
					<div
						className="slideBox"
						style={{
							backgroundColor:
								width >= maxWidth * 0.9
									? 'rgba(0, 0, 0, 0.8)'
									: 'white'
						}}
					>
						{width >= maxWidth * 0.9 ? (
							<img
								className="backdrop"
								src={`https://image.tmdb.org/t/p/original${
									item.backdrop_path
								}`}
								alt="backdrop"
							/>
						) : null}
						<div className="movieInfo">
							<h1
								className="titleText"
								style={{
									marginBottom:
										item.title.length >= 37 ? '7%' : '13%',
									color:
										width <= maxWidth * 0.9
											? 'black'
											: 'white'
								}}
							>
								{item.title}
							</h1>
							<p
								className="summaryText"
								style={{
									color:
										width <= maxWidth * 0.9
											? 'black'
											: 'white'
								}}
							>
								{item.overview.length <= 350
									? item.overview
									: item.overview.replace(
											/^(.{360}[^\s]*).*/,
											'$1'
									  ) + '...'}
							</p>
							<div className="ratingNext">
								<div className="ratingBox">
									<p
										className="ratingText"
										style={{
											fontSize:
												width <= maxWidth * 0.9
													? 12
													: 14
										}}
									>
										{width <= maxWidth * 0.5
											? item.vote_average + '/10'
											: item.vote_average + ' / 10 TMDB'}
									</p>
								</div>
								{width <= maxWidth * 0.9 ? (
									<Button
										swipe={this.handleSwipe}
										boxStyle={{
											margin: '15%',
											marginLeft: '20%'
										}}
										textStyle={{ color: 'black' }}
									/>
								) : null}
							</div>
						</div>
						<div
							className="moviePoster"
							style={{
								marginTop: width <= maxWidth * 0.9 ? '6%' : '4%'
							}}
						>
							{width >= maxWidth * 0.65 ? (
								<Poster
									size={300}
									item={item}
									fontSize={16}
									bookmarked={bookmark}
								/>
							) : null}
							{width >= maxWidth * 0.9 ? (
								<Button
									swipe={this.handleSwipe}
									boxStyle={{
										margin: '12%',
										marginLeft: '95%'
									}}
									textStyle={{ color: 'white' }}
								/>
							) : null}
						</div>
					</div>
				</div>
			);
		});
	}

	render() {
		const { nowPlaying } = this.props;
		return (
			<ReactSwipe
				childCount={nowPlaying.length}
				swipeOptions={{
					continuous: true,
					auto: 10000,
					speed: 3000,
					disableScroll: false,
					stopPropagation: false
				}}
				ref={el => (reactSwipe = el)}
			>
				{this.renderSlide()}
			</ReactSwipe>
		);
	}
}

export default Slide;
