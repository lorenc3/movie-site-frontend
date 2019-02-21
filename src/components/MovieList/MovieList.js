import React, { Component } from 'react';

import './MovieList.css';
import Poster from '../Poster/Poster';

class MovieList extends Component {
	constructor() {
		super();

		this.handleImageError = this.handleImageError.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleImageError(ev) {
		ev.target.src = require('../../assets/images/placeholder.png');
	}

	handleChange(ev) {
		const value = ev.target.value;
		this.props.onChange(value);
	}

	render() {
		const { data, title, sort, userBookmarks } = this.props;
		return (
			<div className="listBox">
				<div className="titleBox">
					<p className="moviesTitleText">{title}</p>
					{sort ? (
						<div className="sortBox">
							<label className="sortText">
								Sort
								<select
									className="selectStyle"
									onChange={this.handleChange}
								>
									<option
										className="optionStyle"
										value="popularity.desc"
									>
										Popular (high)
									</option>
									<option
										className="optionStyle"
										value="popularity.asc"
									>
										Popular (low)
									</option>
									<option
										className="optionStyle"
										value="release_date.desc"
									>
										Date (high)
									</option>
									<option
										className="optionStyle"
										value="release_date.asc"
									>
										Date (low)
									</option>
									<option
										className="optionStyle"
										value="vote_average.desc"
									>
										Rating (high)
									</option>
									<option
										className="optionStyle"
										value="vote_average.asc"
									>
										Rating (low)
									</option>
								</select>
							</label>
						</div>
					) : null}
				</div>
				<div className="moviesBox">
					{data.map((item, i) => {
						var bookmark = userBookmarks.includes(item.id);
						return (
							<div className="moviePosterBox" key={item.id}>
								<Poster
									size={185}
									item={item}
									margin={30}
									radius="8px"
									bookmarked={bookmark}
								/>
								<p className="movieText">{item.title}</p>
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default MovieList;
