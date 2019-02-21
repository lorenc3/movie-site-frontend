import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Layout from '../../components/Layout/Layout';
import './Categories.css';

const maxWidth = window.screen.availWidth;

class Categories extends Component {
	constructor() {
		super();
		this.renderCategories = this.renderCategories.bind(this);

		this.state = {
			genres: []
		};
	}

	componentDidMount() {
		axios
			.get(
				'https://api.themoviedb.org/3/genre/movie/list?api_key=52847a5fec3921c2383c109952fa0141&language=en-US'
			)
			.then(response => {
				const genres = response.data.genres;
				this.setState({ genres });
			})
			.catch(err => {
				console.log(err);
			});
	}

	renderCategories() {
		return this.state.genres.length !== 0
			? this.state.genres.map(item => {
					return (
						<Link
							to={{
								pathname: `/categories/${item.id}`,
								state: { name: item.name }
							}}
							className="nextBoxCat"
							key={item.id}
						>
							<button
								// onClick={this.handleClick(item)}
								className="nextTextCat"
							>
								{item.name === 'Documentary'
									? 'Doc'
									: item.name &&
									  item.name === 'Science Fiction'
									? 'Sci-Fi'
									: item.name}
							</button>
							<div className="nextShapeCat" />
						</Link>
					);
			  })
			: null;
	}

	render() {
		return (
			<Layout className="routeBox" activeRoute={1}>
				<div className="categoriesBox">{this.renderCategories()}</div>
			</Layout>
		);
	}
}

export default Categories;
