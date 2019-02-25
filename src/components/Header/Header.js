import React, { Component } from 'react';
import {
	IoIosSearch,
	IoMdHome,
	IoMdApps,
	IoMdLogIn,
	IoMdBookmark
} from 'react-icons/io';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';

import './Header.css';

class Header extends Component {
	constructor(props) {
		super(props);

		this.renderMenu = this.renderMenu.bind(this);
		this.handleRoute = this.handleRoute.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleScroll = this.handleScroll.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleIcons = this.handleIcons.bind(this);
		this.handleText = this.handleText.bind(this);

		this.state = {
			scroll: 0,
			search: false,
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

	handleText(item) {
		if (this.props.user !== null && item === 'Login') {
			return this.props.user.name;
		}
		return item === 'Login' ? 'Log In' : item;
	}

	handleClick() {
		this.setState({ search: !this.state.search });
	}

	handleRoute(item) {
		if (item === 'Home') {
			return '/';
		} else if (this.props.user !== null && item === 'Login') {
			return '/profile/';
		}
		return `/${item.toLowerCase()}/`;
	}

	handleIcons(route) {
		switch (route) {
			case 'Home':
				return <IoMdHome />;
				break;
			case 'Categories':
				return <IoMdApps />;
				break;
			case 'Bookmarks':
				return <IoMdBookmark />;
				break;
			case 'Login':
				return <IoMdLogIn />;
				break;
			default:
				break;
		}
	}

	renderMenu(activeRoute) {
		const { width, maxWidth } = this.props;

		const menuItems = ['Home', 'Categories', 'Bookmarks', 'Login'];

		return menuItems.map((item, index) => {
			if (index === activeRoute && index !== 2) {
				return (
					<Link
						key={item.toString()}
						className="menuText"
						style={{ color: '#000000', fontWeight: 600 }}
						to={this.handleRoute(item)}
					>
						{width < maxWidth * 0.5 ? (
							<IconContext.Provider
								value={{ color: '#000000', size: 26 }}
							>
								{this.handleIcons(item)}
							</IconContext.Provider>
						) : (
							this.handleText(item)
						)}
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
											fontWeight: 600
									  }
									: null
							}
							to={`/${item.toLowerCase()}/`}
						>
							{width < maxWidth * 0.5 ? (
								<IconContext.Provider
									value={{
										color:
											activeRoute === 2
												? '#000000'
												: '#d8d8d8',
										size: 26
									}}
								>
									{this.handleIcons(item)}
								</IconContext.Provider>
							) : (
								this.handleText(item)
							)}
						</Link>
						{width > maxWidth * 0.5 ? (
							<div className="search">
								<input
									type="search"
									value={this.props.value}
									onChange={this.handleChange}
									className="searchInput"
									placeholder="search movies"
								/>
								<IconContext.Provider
									value={{ color: '#d8d8d8', size: 18 }}
								>
									<IoIosSearch style={{ marginLeft: -20 }} />
								</IconContext.Provider>
							</div>
						) : (
							<button
								className="menuText"
								onClick={this.handleClick}
							>
								<IconContext.Provider
									value={{ color: '#d8d8d8', size: 26 }}
								>
									<IoIosSearch />
								</IconContext.Provider>
							</button>
						)}
					</div>
				);
			}
			return (
				<Link
					key={item.toString()}
					className="menuText"
					to={this.handleRoute(item)}
				>
					{width < maxWidth * 0.5 ? (
						<IconContext.Provider
							value={{ color: '#d8d8d8', size: 26 }}
						>
							{this.handleIcons(item)}
						</IconContext.Provider>
					) : (
						this.handleText(item)
					)}
				</Link>
			);
		});
	}

	render() {
		const { scroll, top, search } = this.state;
		const { width, maxWidth, activeRoute } = this.props;
		return (
			<div
				ref={el => (this.menuRef = el)}
				className="menu"
				style={{
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

				<div className="menuBox">
					{!search ? (
						this.renderMenu(activeRoute)
					) : (
						<div className="search">
							<input
								type="search"
								value={this.props.value}
								onChange={this.handleChange}
								style={{ width: '60vw', paddingRight: 30 }}
								className="searchInput"
								placeholder="search movies"
							/>
							<button
								className="searchBtn"
								onClick={this.handleClick}
							>
								<IconContext.Provider
									value={{ color: '#d8d8d8', size: 22 }}
								>
									<IoIosSearch />
								</IconContext.Provider>
							</button>
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default Header;
