import React, { Component } from "react";
import ReactSwipe from "react-swipe";
import { Link } from "react-router-dom";

import Button from "../Button/Button";
import "./Slide.css";
import Poster from "../Poster/Poster";

let reactSwipe;

class Slide extends Component {
  constructor(props) {
    super(props);

    this.renderSlide = this.renderSlide.bind(this);
    this.handleSwipe = this.handleSwipe.bind(this);
  }

  handleSwipe() {
    reactSwipe.next();
  }

  renderSlide() {
    const { newest, width, maxWidth, userBookmarks, genres } = this.props;
    let movieGenres = [];
    return newest.map((item, key) => {
      // Empty arr for every movie
      movieGenres = [];
      var bookmark =
        userBookmarks !== null ? userBookmarks.includes(item.id) : null;
      item.genre_ids.map(id => {
        const genreName = genres[genres.findIndex(obj => obj.id === id)].name;
        genreName === "Science Fiction"
          ? movieGenres.push("Sci-Fi")
          : movieGenres.push(genreName);
      });
      return (
        <div key={key} style={{ display: "flex" }}>
          <div className="slideBox">
            <div className="backdropBox">
              <img
                className="backdrop"
                src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                alt="backdrop"
              />
            </div>
            <div className="movieInfo">
              <div className="titleBox1">
                <p className="titleText">{item.title.toUpperCase()}</p>
              </div>
              <div className="infoBox">
                <div className="summaryBox">
                  <p className="summaryTitleText">QUICK INFO: </p>
                  <p className="summaryText">
                    {item.overview.length <= 350
                      ? item.overview
                      : item.overview.replace(/^(.{360}[^\s]*).*/, "$1") +
                        "..."}
                  </p>
                </div>
                <div className="ratingBox">
                  <div className="rottenBox">
                    <p className="rottenText">ROTTEN TOMATOES</p>
                    <p className="rottenRating">
                      {`${(
                        parseFloat(item.vote_average) * 10 +
                        2
                      ).toString()}%`}
                    </p>
                  </div>
                  <div className="imdbBox">
                    <p className="imdbRating">{item.vote_average}</p>
                    <p className="imdbText">IMDB</p>
                  </div>
                </div>
                <div className="moreBox">
                  <div className="genreBox">
                    {movieGenres.slice(0, 4).map(name => (
                      <div className="genre">
                        <p className="creditsText" key={name}>
                          {name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="buttonBox">
                    <Link to={`/details/${item.id}`} className="button">
                      <p className="buttonText">WATCH</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const { newest } = this.props;
    return (
      <ReactSwipe
        childCount={newest.length}
        swipeOptions={{
          continuous: true,
          auto: 5000,
          speed: 3000,
          disableScroll: false,
          stopPropagation: false
        }}
        ref={el => (reactSwipe = el)}
      >
        {this.renderSlide()}
      </ReactSwipe>
    );
  }
}

export default Slide;
