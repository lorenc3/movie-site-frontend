import React, { Component } from "react";
import axios from "axios";

import "./Home.css";

import Layout from "../../components/Layout/Layout";
import Slide from "../../components/Slide/Slide";
import Section from "../../components/Section/Section";
import now from "performance-now";

const maxWidth = window.screen.availWidth;

class Home extends Component {
  constructor(props) {
    super(props);

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.updateMovies = this.updateMovies.bind(this);

    this.state = {
      width: 0,
      height: 0,
      page: "1",
      activeFilter: "Trending",
      showAdult: true,
      slideContent: [],
      newest: [],
      popular: [],
      upcoming: [],
      top: [],
      trending: [],
      searchResults: [],
      genres: []
    };
  }

  componentDidMount() {
    const { page, showAdult } = this.state;
    axios
      .all([
        axios.get(
          `https://api.themoviedb.org/3/discover/movie?api_key=52847a5fec3921c2383c109952fa0141&region=US&certification_country=US&certification=${
            showAdult ? "G|PG-13|R|NC-17|NR|PG" : "G|PG-13|NR|PG"
          }&language=en-US&page=${page}&vote_average.gte=1&vote_count.gte=10&sort_by=release_date.desc`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=52847a5fec3921c2383c109952fa0141&region=US&certification_country=US&certification=${
            showAdult ? "G|PG-13|R|NC-17|NR|PG" : "G|PG-13|NR|PG"
          }&language=en-US&page=${page}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=52847a5fec3921c2383c109952fa0141&region=US&certification_country=US&certification=${
            showAdult ? "G|PG-13|R|NC-17|NR|PG" : "G|PG-13|NR|PG"
          }&language=en-US&page=${page}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=52847a5fec3921c2383c109952fa0141&region=US&certification_country=US&certification=${
            showAdult ? "G|PG-13|R|NC-17|NR|PG" : "G|PG-13|NR|PG"
          }&language=en-US&page=1`
        ),
        axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=52847a5fec3921c2383c109952fa0141&region=US&certification_country=US&certification=${
            showAdult ? "G|PG-13|R|NC-17|NR|PG" : "G|PG-13|NR|PG"
          }&language=en-US&page=${page}`
        ),
        axios.get(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=52847a5fec3921c2383c109952fa0141&region=US&certification_country=US&certification=${
            showAdult ? "G|PG-13|R|NC-17|NR|PG" : "G|PG-13|NR|PG"
          }&language=en-US`
        )
      ])
      .then(
        axios.spread(
          (
            newestRes,
            popularRes,
            topRatedRes,
            upcomingRes,
            trendingRes,
            genresRes
          ) => {
            this.setState({
              newest: newestRes.data.results,
              popular: popularRes.data.results,
              top: topRatedRes.data.results,
              upcoming: upcomingRes.data.results,
              trending: trendingRes.data.results,
              slideContent: newestRes.data.results,
              genres: genresRes.data.genres
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

  getFilter = filter => {
    switch (filter) {
      case "Popular":
        return ["popular", "popular"];
        break;
      case "Top Rated":
        return ["top", "top_rated"];
        break;
      case "New":
        return ["newest", "new"];
        break;
      case "Trending":
        return ["trending", "trending"];
        break;
      default:
        break;
    }
  };

  updateMovies() {
    const { page, activeFilter, showAdult } = this.state;
    const filters = this.getFilter(activeFilter);
    axios
      .get(
        activeFilter !== "Trending"
          ? `https://api.themoviedb.org/3/${
              activeFilter === "New" ? "discover/movie" : "movie/" + filters[1]
            }?api_key=52847a5fec3921c2383c109952fa0141&certification_country=US&certification=${
              showAdult ? "G|PG-13|R|NC-17|NR|PG" : "G|PG-13|NR|PG"
            }&region=US&language=en-US&page=${page}&vote_average.gte=1&vote_count.gte=10&${
              activeFilter === "New" ? "sort_by=release_date.desc" : "/"
            }`
          : `https://api.themoviedb.org/3/trending/movie/week?api_key=52847a5fec3921c2383c109952fa0141&certification_country=US&certification=${
              showAdult ? "G|PG-13|R|NC-17|NR|PG" : "G|PG-13|NR|PG"
            }&region=US&language=en-US&page=${page}`
      )
      .then(filterRes => {
        console.log(filterRes);
        this.setState({
          [filters[0]]: filterRes.data.results
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handlePage(page, activeFilter, showAdult) {
    this.setState({ page, activeFilter, showAdult }, () => {
      this.updateMovies();
    });
  }

  render() {
    const { userBookmarks, user } = this.props;
    const {
      newest,
      genres,
      trending,
      top,
      popular,
      upcoming,
      page,
      activeFilter,
      slideContent,
      showAdult
    } = this.state;
    const moviesList = [
      { name: "Top Rated", data: top },
      { name: "Popular", data: popular },
      { name: "New", data: newest },
      { name: "Trending", data: trending }
    ];
    return (
      <Layout activeRoute={0} user={user}>
        <div>
          {newest.length !== 0 ? (
            <Slide
              newest={popular}
              width={this.state.width}
              maxWidth={maxWidth}
              userBookmarks={userBookmarks}
              genres={genres}
            />
          ) : null}
        </div>
        <div className="contentBox">
          {(upcoming.length &&
            popular.length &&
            top.length &&
            trending.length) !== 0 ? (
            <Section
              moviesList={moviesList}
              activeFilter={activeFilter}
              showAdult={showAdult}
              page={page}
              updatePage={this.handlePage}
              userBookmarks={userBookmarks}
            />
          ) : null}
        </div>
      </Layout>
    );
  }
}

export default Home;
