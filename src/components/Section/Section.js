import React, { Component } from 'react';

import Button from '../Button/Button';
import Poster from '../Poster/Poster';

import './Section.css';

class Section extends Component {
	constructor(props) {
		super(props);

		this.state = {
			index: 4
		};
	}

	handleScroll(i) {
		console.log(i);
		this.setState({ index: i });

		this.refs[i].scrollIntoView({
			inline: 'end',
			behavior: 'smooth'
		});
	}

	render() {
		const { index } = this.state;
		const { movieList, title, color, userBookmarks } = this.props;
		//NOTE if more than 20 results-->Check movieList.length - index = 0,
		//if yes go to 4 if no
		//return index + (movieList.length - index)
		const scrollIndex = index + 5 >= movieList.length ? 4 : index + 5;
		return (
			<div className="sectionBox" style={{ backgroundColor: color }}>
				<p className="sectionTitleText">{title}</p>
				<div className="postersBox">
					{movieList.map((item, i) => {
						var bookmark = userBookmarks.includes(item.id);
						return (
							<div className="posterBox" key={i} ref={i}>
								<Poster
									size={185}
									item={item}
									margin={30}
									bookmarked={bookmark}
								/>
								<p className="posterText">{item.title}</p>
							</div>
						);
					})}
				</div>
				<Button
					swipe={() => this.handleScroll(scrollIndex)}
					textStyle={{ color: 'white' }}
					boxStyle={{ marginLeft: '90%' }}
					shapeStyle={{ backgroundColor: '#fff' }}
				/>
			</div>
		);
	}
}

export default Section;
