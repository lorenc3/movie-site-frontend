import React, { Component } from 'react';
import axios from 'axios';

import './Layout.css';

import Header from '../../components/Header/Header';
import SearchResults from '../../components/SearchResults/SearchResults';

const maxWidth = window.screen.availWidth;

class Layout extends Component {
	constructor(props) {
		super(props);

		this.handleValueChange = this.handleValueChange.bind(this);
		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
		this.getSearchResults = this.getSearchResults.bind(this);

		this.state = {
			value: '',
			width: 0,
			height: 0,
			searchResults: []
		};
	}

	componentDidMount() {
		this.updateWindowDimensions();
		window.addEventListener('resize', this.updateWindowDimensions);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWindowDimensions);
	}

	updateWindowDimensions() {
		this.setState({ width: window.innerWidth, height: window.innerHeight });
	}

	getSearchResults(value) {
		axios
			.get(
				`https://api.themoviedb.org/3/search/movie?api_key=52847a5fec3921c2383c109952fa0141&language=en-US&query=${value}&page=1&include_adult=false`
			)
			.then(response => {
				this.setState({ searchResults: response.data.results });
			})
			.catch(err => {
				console.log(err);
			});
	}

	handleValueChange(value) {
		this.setState({ value: value }, () => {
			this.getSearchResults(this.state.value);
		});
	}

	render() {
		const { value, width } = this.state;
		const { activeRoute } = this.props;
		return (
			<div className="App">
				<header className="App-header">
					<Header
						activeRoute={activeRoute}
						width={this.state.width}
						maxWidth={maxWidth}
						onChange={this.handleValueChange}
					/>
				</header>
				{value !== '' ? (
					<SearchResults searchResults={this.state.searchResults} />
				) : null}
				{this.props.children}
			</div>
		);
	}
}

export default Layout;
