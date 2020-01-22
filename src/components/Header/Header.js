import React, { Component } from "react";
import {
  IoIosSearch,
  IoMdHome,
  IoMdApps,
  IoMdLogIn,
  IoMdBookmark
} from "react-icons/io";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { MdMovieCreation, MdSearch } from "react-icons/md";

import "./Header.css";

class Header extends Component {
  constructor(props) {
    super(props);

    this.renderMenu = this.renderMenu.bind(this);
    this.handleRoute = this.handleRoute.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleText = this.handleText.bind(this);

    this.state = {
      scroll: 0,
      search: false,
      top: 0
    };
  }

  componentDidMount() {
    this.setState({ top: this.menuRef.offsetTop }, () => {});
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleChange(event) {
    const value = event.target.value;
    this.props.onChange(value);
  }

  handleScroll() {
    this.setState({ scroll: window.scrollY });
  }

  handleText(item) {
    // if (this.props.user !== null && item === "Login") {
    //   return this.props.user.name;
    // }
    return item;
  }

  handleClick() {
    this.setState({ search: !this.state.search });
  }

  handleRoute(item) {
    if (item === "Home") {
      return "/";
    } else if (this.props.user !== null && item === "Login") {
      return "/profile/";
    }
    return `/${item.toLowerCase()}/`;
  }

  handleTextPosition = (active, home, login) => {
    if (active) {
      return "center";
    }
    if (home) {
      return "flex-end";
    }
    if (login) {
      return "flex-start";
    }
  };

  renderMenu(activeRoute) {
    const { width, maxWidth, white, white2 } = this.props;

    const menuItems = ["Home", "Categories", "Search", "Login"];

    return menuItems.map((item, index) => {
      if (item === "Search") {
        return (
          <div
            className="searchBox"
            style={{ border: white || white2 ? "1px solid #DEDEDF" : 0 }}
            key={item.toString()}
          >
            <input
              type="search"
              value={this.props.value}
              onChange={this.handleChange}
              className="searchInput"
              style={{ color: white || white2 ? "#141d26" : "#f3f3f3" }}
              placeholder="Search..."
            />
            <IconContext.Provider
              value={{
                color: white || white2 ? "#CCCCCC" : "#9A9A9A",
                size: 17
              }}
            >
              <MdSearch />
            </IconContext.Provider>
          </div>
        );
      }
      return (
        <Link
          key={item.toString()}
          to={this.handleRoute(item)}
          style={{ textDecoration: "none" }}
        >
          <div
            className="activeBox"
            style={{
              backgroundColor:
                index === activeRoute ? "#f3f3f3" : "transparent",
              // width: index === activeRoute ? 90 : "100%",
              justifyContent: this.handleTextPosition(
                index === activeRoute,
                item === "Home",
                item === "Login"
              )
            }}
          >
            <p
              className="menuText"
              style={{
                color:
                  index === activeRoute || white || white2
                    ? "#071A34"
                    : "#f3f3f3"
              }}
            >
              {this.handleText(item)}
            </p>
          </div>
        </Link>
      );
    });
  }

  render() {
    const { scroll, top, search } = this.state;
    const { activeRoute, white, white2 } = this.props;
    return (
      <div
        ref={el => (this.menuRef = el)}
        className="menu"
        style={{
          boxShadow: scroll > top ? `0 2px 4px 0 rgba(0, 0, 0, 0.19)` : null,
          backgroundColor: white || white2 ? "#ffff" : "#141d26",
          // width: white ? "65%" : "100%",
          borderBottom: white || white2 ? 0 : "1px solid #1d2a39"
        }}
      >
        <div className="logoBox">
          <div className="iconCont">
            <IconContext.Provider
              value={{
                color: white || white2 ? "#141d26" : "white",
                size: 50
              }}
            >
              <MdMovieCreation />
            </IconContext.Provider>
            <div
              className="iconText"
              style={{ color: white || white2 ? "#f3f3f3" : "#141d26" }}
            >
              TCE
            </div>
          </div>
          <div className="logoTextCont">
            <p
              className="logoText"
              style={{
                color: white || white2 ? "#141d26" : "#f3f3f3",
                fontWeight: white || white2 ? 700 : 600
              }}
            >
              THE CINEMA EXPERIENCE
            </p>
          </div>
        </div>
        <div className="menuBox">{this.renderMenu(activeRoute)}</div>
      </div>
    );
  }
}

export default Header;
