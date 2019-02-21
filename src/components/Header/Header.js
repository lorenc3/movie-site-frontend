import React, { Component } from 'react';
import { IoIosSearch } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

import './Header.css';

class Header extends Component {
	constructor(props) {
		super(props);

		this.renderMenu = this.renderMenu.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleScroll = this.handleScroll.bind(this);

		this.state = {
			scroll: 0,
			top: 0
		};
	}

	componentDidMount() {
		this.setState({ top: this.menuRef.offsetTop }, () => {});
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleChange(event) {
		const value = event.target.value;
		this.props.onChange(value);
	}

	handleScroll() {
		this.setState({ scroll: window.scrollY });
	}

	renderMenu(activeRoute) {
		const menuItems = ['Home', 'Categories', 'Bookmarks', 'Login'];

		return menuItems.map((item, index) => {
			if (index === activeRoute && index !== 2) {
				return (
					<Link
						key={item.toString()}
						className="menuText"
						style={{ color: '#000000', fontWeight: 600 }}
						to={item === 'Home' ? '/' : `/${item.toLowerCase()}/`}
					>
						{item === 'Login' ? 'Log In' : item}
					</Link>
				);
			}

			if (index === 2) {
				return (
					<div className="searchBox" key={item.toString()}>
						<Link
							key={item.toString()}
							className="menuText"
							style={
								activeRoute === 2
									? {
											color: '#000000',
											fontWeight: 600,
											margin: 0
									  }
									: { margin: 0 }
							}
							to={`/${item.toLowerCase()}/`}
						>
							{item}
						</Link>
						<input
							type="search"
							value={this.props.value}
							onChange={this.handleChange}
							className="searchInput"
							placeholder="search movies"
						/>
						<IconContext.Provider
							value={{ color: '#cccccc', size: 18 }}
						>
							<IoIosSearch style={{ marginLeft: -20 }} />
						</IconContext.Provider>
					</div>
				);
			}
			return (
				<Link
					key={item.toString()}
					className="menuText"
					to={item === 'Home' ? '/' : `/${item.toLowerCase()}/`}
				>
					{item === 'Login' ? 'Log In' : item}
				</Link>
			);
		});
	}

	render() {
		const { scroll, top } = this.state;
		const { width, maxWidth, activeRoute } = this.props;
		return (
			<div
				ref={el => (this.menuRef = el)}
				className={'menu'}
				style={{
					flexDirection: width < maxWidth * 0.85 ? 'column' : 'row',
					boxShadow:
						scroll > top ? `0 2px 4px 0 rgba(0, 0, 0, 0.19)` : null
				}}
			>
				<Link to={'/'}>
					<img
						src={require('../../assets/images/elk.png')}
						alt="logo"
						className="logo"
					/>
				</Link>

				<div
					className="menuBox"
					style={{
						marginLeft: width < maxWidth * 0.85 ? 0 : 150,
						marginRight: width < maxWidth * 0.85 ? 0 : 150
					}}
				>
					{this.renderMenu(activeRoute)}
				</div>
			</div>
		);
	}
}

export default Header;
