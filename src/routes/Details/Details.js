import React, { Component } from "react";
import axios from "axios";
import _ from "lodash";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import {
  MdAlarm,
  MdDateRange,
  MdWarning,
  MdAttachMoney,
  MdMoneyOff
} from "react-icons/md";
import { FaTwitter, FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

import "./Details.css";

import Layout from "../../components/Layout/Layout";
import MovieInfo from "../../components/MovieInfo/MovieInfo";

const maxWidth = window.screen.availWidth;
const maxHeight = window.screen.availHeight;

class Details extends Component {
  constructor(props) {
    super(props);

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handleImageError = this.handleImageError.bind(this);
    this.renderContent = this.renderContent.bind(this);

    this.state = {
      width: 0,
      height: 0,
      details: {},
      genres: [],
      videoKey: "",
      certification: "",
      actors: [],
      directors: [],
      writers: [],
      socials: {},
      //Placeholder state for reviews. Update with data from Db.
      reviews: []
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .all([
        axios.get(
          `https://api.themoviedb.org/3/movie/
					${id}
					?api_key=52847a5fec3921c2383c109952fa0141&language=en-US`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/
          ${id}
          /release_dates?api_key=52847a5fec3921c2383c109952fa0141&language=en-US`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/
					${id}
					/videos?api_key=52847a5fec3921c2383c109952fa0141&language=en-US`
        ),
        axios.get(`https://api.themoviedb.org/3/movie/
				${id}
				/credits?api_key=52847a5fec3921c2383c109952fa0141`),
        axios.get(`https://api.themoviedb.org/3/movie/
				${id}
				/external_ids?api_key=52847a5fec3921c2383c109952fa0141`)

        //GET req to server for reviews with this movieId and sort
        //to most liked reviews (or most recent ones idk...)
      ])
      .then(
        axios.spread(
          (
            detailsRes,
            certificationRes,
            videoRes,
            creditsRes,
            socialRes
            // reviewsRes
          ) => {
            const video = videoRes.data.results.filter(
              obj => obj.type === "Trailer"
            );
            const directors = creditsRes.data.crew.filter(
              obj => obj.job === "Director"
            );
            const writers = creditsRes.data.crew.filter(
              obj => obj.job === "Screenplay"
            );
            const actors = creditsRes.data.cast.slice(0, 20);
            const socials = socialRes.data;
            const certification =
              certificationRes.data.results[0].release_dates[0].certification;
            this.setState({
              videoKey: video[0] !== undefined ? video[0].key : "",
              details: detailsRes.data,
              genres: detailsRes.data.genres,
              actors,
              writers,
              directors,
              socials,
              certification
              // reviews: reviewsRes.data
            });
          }
        )
      )
      .catch(err => {
        console.log(err);
      });
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  handleImageError(ev) {
    ev.target.src = require("../../assets/images/placeholder_big.png");
  }

  renderIcon = name => {
    switch (name) {
      case "Twitter":
        return <FaTwitter />;
        break;
      case "Facebook":
        return <FaFacebook />;
        break;
      case "Youtube":
        return <FaYoutube />;
        break;
      case "Instagram":
        return <FaInstagram />;
        break;
      case "runtime":
        return <MdAlarm />;
        break;
      case "date":
        return <MdDateRange />;
        break;
      case "rating":
        return <MdWarning />;
        break;
      case "budget":
        return <MdMoneyOff />;
        break;
      case "revenue":
        return <MdAttachMoney />;
        break;
      default:
        return <FaInstagram />;
        break;
    }
  };

  formatNumber = number => {
    var SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];

    // what tier? (determines SI symbol)
    var tier = (Math.log10(number) / 3) | 0;

    // if zero, we don't need a suffix
    if (tier == 0) return number;

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
  };

  renderContent() {
    const {
      details,
      width,
      height,
      genres,
      videoKey,
      actors,
      directors,
      writers,
      socials,
      certification
    } = this.state;

    const { userBookmarks, user } = this.props;

    const date1 = new Date(details.release_date)
      .toLocaleDateString()
      .split("/")
      .slice(0, 2)
      .join("-");
    const date2 = new Date(details.release_date)
      .toLocaleDateString()
      .split("/")
      .slice(-1);
    const info = [
      {
        name: "runtime",
        value: `${details.runtime}
        min`
      },
      {
        name: "date",
        value: `${date1}
        ${date2}`
      },
      {
        name: "rating",
        value: `Rated
        ${certification}`
      },
      { name: "budget", value: this.formatNumber(details.budget) },
      { name: "revenue", value: this.formatNumber(details.revenue) }
    ];

    const links = [
      {
        name: "Youtube",
        url:
          videoKey !== null
            ? `https://www.youtube.com/watch?v=${videoKey}`
            : null
      },
      {
        name: "Instagram",
        url:
          socials.instagram_id !== null
            ? `https://www.instagram.com/${socials.instagram_id}`
            : null
      },
      {
        name: "Facebook",
        url:
          socials.facebook_id !== null
            ? `https://www.facebook.com/${socials.facebook_id}`
            : null
      },
      {
        name: "Twitter",
        url:
          socials.twitter_id !== null
            ? `https://www.twitter.com/${socials.twitter_id}`
            : null
      }
    ];

    const tagline = tag => {
      if (tag.length === 0) {
        return `"Tagline not found"`;
      }
      if (tag.length <= 45) {
        return `"${tag}"`;
      }
      return `"${tag.slice(0, 100)}..."`;
    };

    if (width >= maxWidth * 0.85) {
      return (
        <div className="mainDetailBox">
          <div className="posterLinkBox">
            <img
              onError={this.handleImageError}
              className="detailsPoster"
              src={`https://image.tmdb.org/t/p/w500/${details.poster_path}`}
              alt="poster"
            />
            <div className="linksBox">
              <p className="linkTitle">Follow this movie on:</p>
              <div className="links">
                {links.map(item => {
                  return (
                    <a
                      href={item.url}
                      key={item.name}
                      target="_black"
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        className="linkBox"
                        style={{
                          opacity: item.url === null ? 0.5 : 1,
                          pointerEvents: item.url === null ? "none" : "default"
                        }}
                      >
                        <IconContext.Provider
                          value={{ color: "#313131", size: 11 }}
                        >
                          {this.renderIcon(item.name)}
                        </IconContext.Provider>
                        <p className="linkText">{item.name}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
              <p className="linkTitle" style={{ marginTop: 0 }}>
                Learn more on:
              </p>
              <a
                className="homepage"
                style={{
                  pointerEvents:
                    details.homepage === null || details.homepage === ""
                      ? "none"
                      : "default",
                  opacity:
                    details.homepage === null || details.homepage === ""
                      ? 0.7
                      : 1
                }}
                href={details.homepage}
                target="_blank"
              >
                {details.homepage === null || details.homepage === ""
                  ? "No website found for this movie"
                  : details.homepage}
              </a>
            </div>
          </div>
          <div className="detailsBox">
            <div className="shortInfo">
              <div className="movieTitleBox">
                <p className="detailsText">
                  {details.title.length <= 45
                    ? details.title.toUpperCase()
                    : `${details.title.slice(0, 45).toUpperCase()}...`}
                </p>
                <p className="tagline">{tagline(details.tagline)}</p>
              </div>
              <div className="quickInfoBox">
                {info.map(item => {
                  return (
                    <div className="circleBox" key={item.name}>
                      <IconContext.Provider
                        value={{ color: "black", size: 18 }}
                      >
                        {this.renderIcon(item.name)}
                      </IconContext.Provider>
                      <p className="circleText">{item.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="mainInfo">
              <div className="mainDetailsBox">
                <div className="summaryBox" style={{ flex: 3 }}>
                  <p className="summaryTitleText">QUICK INFO: </p>
                  <p className="summaryText">
                    {details.overview.length <= 350
                      ? details.overview
                      : details.overview.replace(/^(.{360}[^\s]*).*/, "$1") +
                        "..."}
                  </p>
                </div>
                <div className="ratingBox">
                  <div className="rottenBox">
                    <p className="rottenText">ROTTEN TOMATOES</p>
                    <p className="rottenRating">
                      {`${(
                        parseFloat(details.vote_average) * 10 +
                        2
                      ).toString()}%`}
                    </p>
                  </div>
                  <div className="imdbBox">
                    <p className="imdbRating">{details.vote_average}</p>
                    <p className="imdbText">IMDB</p>
                  </div>
                </div>
                <div
                  className="moreBox"
                  style={{
                    flexDirection: "column",
                    padding: "20px 12px 20px 40px"
                  }}
                >
                  <div
                    className="genreBox"
                    style={{
                      width: "100%",
                      justifyContent: "center"
                    }}
                  >
                    {genres.slice(0, 4).map(item => (
                      <div className="genre" style={{ width: 75 }}>
                        <p className="creditsText" key={item.name}>
                          {item.name === "Science Fiction"
                            ? "Sci-Fi"
                            : item.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="creditsBox">
                    <p className="creditsText">
                      {`Director: `}
                      {directors.map((item, index) => {
                        return (
                          <span style={{ color: "#3be0ff" }}>
                            {index < directors.length - 1
                              ? `${item.name}, `
                              : `${item.name}`}
                          </span>
                        );
                      })}
                    </p>
                    <p className="creditsText">
                      {`Story by: `}
                      {writers.map((item, index) => {
                        return (
                          <span style={{ color: "#3be0ff" }}>
                            {index < writers.length - 1
                              ? `${item.name}, `
                              : `${item.name}`}
                          </span>
                        );
                      })}
                    </p>
                    <p className="creditsText">
                      {`Cast: `}
                      {actors.slice(0, 5).map((item, index) => {
                        return (
                          <span style={{ color: "#3be0ff" }}>
                            {index < 4 ? `${item.name}, ` : `${item.name}`}
                          </span>
                        );
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mediaBox">
                <div className="trailerBox">
                  <iframe
                    title={"trailer"}
                    className="trailer"
                    src={`https://www.youtube.com/embed/${videoKey}`}
                    frameBorder="0"
                    allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen="allowfullscreen"
                  />
                </div>
                <div className="streamBox">
                  <p className="streamText">Stream movie online:</p>
                  <a
                    className="streamText"
                    target="_blank"
                    style={{ fontSize: 12, marginTop: 10, color: "#3be0ff" }}
                    href={encodeURI(
                      `https://videospider.in/getvideo?key=Eqvv2uJrorySaQeS&video_id=${socials.imdb_id}`
                    )}
                  >
                    {encodeURI(
                      `https://videospider.in/getvideo?video_id=${socials.imdb_id}`
                    )}
                  </a>
                  <p className="streamText" style={{ fontSize: 9 }}>
                    (Note: Ad blocker recommended)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    const align = height < maxHeight * 0.9;
    return (
      <div
        className="mainDetailBox"
        style={{
          flexDirection: "column",
          paddingTop: align ? 150 : 50,
          justifyContent: align ? "start" : "center",
          paddingBottom: align ? 50 : 0
        }}
      >
        <div className="shortInfo2">
          <div
            className="movieTitleBox"
            style={{ padding: 0, flex: "none", width: "90%" }}
          >
            <p className="detailsText" style={{ textAlign: "center" }}>
              {details.title.length <= 45
                ? details.title.toUpperCase()
                : `${details.title.slice(0, 45).toUpperCase()}...`}
            </p>
            <p className="tagline" style={{ textAlign: "center" }}>
              {tagline(details.tagline)}
            </p>
          </div>
        </div>

        <div className="mainDetailsBox2">
          <div className="summaryBox" style={{ flex: 3 }}>
            <p className="summaryTitleText">QUICK INFO: </p>
            <p className="summaryText">
              {details.overview.length <= 350
                ? details.overview
                : details.overview.replace(/^(.{360}[^\s]*).*/, "$1") + "..."}
            </p>
          </div>
          <div className="ratingBox">
            <div className="rottenBox">
              <p className="rottenText">ROTTEN TOMATOES</p>
              <p className="rottenRating">
                {`${(parseFloat(details.vote_average) * 10 + 2).toString()}%`}
              </p>
            </div>
            <div className="imdbBox">
              <p className="imdbRating">{details.vote_average}</p>
              <p className="imdbText">IMDB</p>
            </div>
          </div>
          <div
            className="moreBox"
            style={{
              flexDirection: "column",
              padding: "20px 12px 20px 40px"
            }}
          >
            <div
              className="genreBox"
              style={{
                width: "100%",
                justifyContent: "center"
              }}
            >
              {genres.slice(0, 4).map(item => (
                <div className="genre" style={{ width: 75 }}>
                  <p className="creditsText" key={item.name}>
                    {item.name === "Science Fiction" ? "Sci-Fi" : item.name}
                  </p>
                </div>
              ))}
            </div>
            <div className="creditsBox">
              <p className="creditsText">
                {`Director: `}
                {directors.map((item, index) => {
                  return (
                    <span style={{ color: "#3be0ff" }}>
                      {index < directors.length - 1
                        ? `${item.name}, `
                        : `${item.name}`}
                    </span>
                  );
                })}
              </p>
              <p className="creditsText">
                {`Story by: `}
                {writers.map((item, index) => {
                  return (
                    <span style={{ color: "#3be0ff" }}>
                      {index < writers.length - 1
                        ? `${item.name}, `
                        : `${item.name}`}
                    </span>
                  );
                })}
              </p>
              <p className="creditsText">
                {`Cast: `}
                {actors.slice(0, 5).map((item, index) => {
                  return (
                    <span style={{ color: "#3be0ff" }}>
                      {index < 4 ? `${item.name}, ` : `${item.name}`}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <Layout className="detailsBox" user={this.props.user}>
        {!_.isEmpty(this.state.details) ? this.renderContent() : null}
      </Layout>
    );
  }
}

export default Details;
