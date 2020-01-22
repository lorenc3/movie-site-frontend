import React, { Component } from "react";
import { Link } from "react-router-dom";

import { IconContext } from "react-icons";
import { MdMovieCreation, MdSearch } from "react-icons/md";

import "./SearchResults.css";

class SearchResults extends Component {
  constructor(props) {
    super();

    this.renderSearch = this.renderSearch.bind(this);
    this.handleImageError = this.handleImageError.bind(this);
  }
  handleImageError(ev) {
    ev.target.src = require("../../assets/images/placeholder.png");
  }

  renderSearch() {
    const { searchResults } = this.props;
    return searchResults.slice(0, 10).map((item, key) => {
      return (
        <Link
          className="searchResults"
          style={{
            borderBottomColor:
              key === searchResults.length - 1
                ? "transparent"
                : "rgba(255, 255, 255, 0.1)"
          }}
          key={key}
          to={`/details/${item.id}`}
        >
          <p className="searchResultsText">{`${key + 1}.  ${item.title}`}</p>
        </Link>
      );
    });
  }

  render() {
    const { searchResults, white, white2 } = this.props;
    return (
      <div
        className="searchCont"
        style={{
          width: white ? "70%" : "100%"
        }}
      >
        <div className="logoBox">
          <div style={{ width: 180 }}></div>
        </div>
        <div className="searchPseudo">
          <div className="pseudoBox"></div>
          <div className="pseudoBox"></div>
          <div
            className="searchContent"
            style={{
              backgroundColor:
                white || white2 ? "#141d26" : "rgba(29, 42, 57, 0.5)"
            }}
          >
            {searchResults.length !== 0 ? (
              this.renderSearch()
            ) : (
              <h2 className="searchNotFound">No movies were found</h2>
            )}
          </div>
          <div className="pseudoBox"></div>
        </div>
      </div>
    );
  }
}

export default SearchResults;
