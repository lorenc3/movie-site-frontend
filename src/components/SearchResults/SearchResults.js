import React, { Component } from 'react';

import './SearchResults.css';
import Poster from '../Poster/Poster';

class SearchResults extends Component {
	constructor(props) {
		super();

		this.renderSearch = this.renderSearch.bind(this);
		this.handleImageError = this.handleImageError.bind(this);
	}
	handleImageError(ev) {
		ev.target.src = require('../../assets/images/placeholder.png');
	}

	renderSearch() {
		const { searchResults } = this.props;
		return searchResults.map((item, key) => {
			return (
				<div className="searchResults" key={key}>
					<Poster size={185} item={item} bookmarked={null} />
					<p className="searchResultsText">{item.title}</p>
				</div>
			);
		});
	}

	render() {
		const { searchResults } = this.props;
		return (
			<div className="searchResultsBox">
				<div className="searchContent">
					{searchResults.length !== 0 ? (
						this.renderSearch()
					) : (
						<h2 className="searchNotFound">No movies were found</h2>
					)}
				</div>
			</div>
		);
	}
}

export default SearchResults;
