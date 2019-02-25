import React, { Component } from 'react';
import axios from 'axios';

import './Home.css';

import Layout from '../../components/Layout/Layout';
import Slide from '../../components/Slide/Slide';
import Section from '../../components/Section/Section';

const maxWidth = window.screen.availWidth;

class Home extends Component {
	constructor(props) {
		super(props);

		this.updateWindowDimensions = this.updateWindowDimensions.bind(this);

		this.state = {
			width: 0,
			height: 0,
			nowPlaying: [],
			popular: [],
			upcoming: [],
			top: [],
			trending: [],
			searchResults: []
		};
	}

	componentDidMount() {
		axios
			.all([
				axios.get(
					'https://api.themoviedb.org/3/movie/now_playing?api_key=52847a5fec3921c2383c109952fa0141&language=en-US&page=1'
				),
				axios.get(
					'https://api.themoviedb.org/3/movie/popular?api_key=52847a5fec3921c2383c109952fa0141&language=en-US&page=1'
				),
				axios.get(
					'https://api.themoviedb.org/3/movie/top_rated?api_key=52847a5fec3921c2383c109952fa0141&language=en-US&page=1'
				),
				axios.get(
					'https://api.themoviedb.org/3/movie/upcoming?api_key=52847a5fec3921c2383c109952fa0141&language=en-US&page=1'
				),
				axios.get(
					'https://api.themoviedb.org/3/trending/movie/week?api_key=52847a5fec3921c2383c109952fa0141'
				)
			])
			.then(
				axios.spread(
					(
						nowPlayingRes,
						popularRes,
						topRatedRes,
						upcomingRes,
						trendingRes
					) => {
						this.setState({
							nowPlaying: nowPlayingRes.data.results,
							popular: popularRes.data.results,
							top: topRatedRes.data.results,
							upcoming: upcomingRes.data.results,
							trending: trendingRes.data.results
						});
					}
				)
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

	render() {
		const { userBookmarks, user } = this.props;
		const { nowPlaying, value } = this.state;
		console.log('RENDER');
		return (
			<Layout activeRoute={0} user={user}>
				<div>
					{nowPlaying.length !== 0 ? (
						<Slide
							nowPlaying={this.state.popular}
							width={this.state.width}
							maxWidth={maxWidth}
							userBookmarks={userBookmarks}
						/>
					) : null}
				</div>
				<div className="contentBox">
					<Section
						movieList={this.state.trending}
						title="Trending"
						color="#070707"
						userBookmarks={userBookmarks}
					/>
					<Section
						movieList={this.state.popular}
						title="Popular"
						color="#084C61"
						userBookmarks={userBookmarks}
					/>
					<Section
						movieList={this.state.upcoming}
						title="Upcoming"
						color="#DB504A"
						userBookmarks={userBookmarks}
					/>
					<Section
						movieList={this.state.top}
						title="Top"
						color="#E3B505"
						userBookmarks={userBookmarks}
					/>
				</div>
			</Layout>
		);
	}
}

export default Home;
