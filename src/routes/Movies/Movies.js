import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { MdKeyboardArrowRight } from "react-icons/md";

import MoviesList from "../../components/MovieList/MovieList";
import Layout from "../../components/Layout/Layout";
import Section from "../../components/Section/Section";
import "./Movies.css";

class Movies extends Component {
  constructor() {
    super();

    this.getMovies = this.getMovies.bind(this);
    this.handlePage = this.handlePage.bind(this);
    this.state = {
      activeFilter: "popularity.desc",
      page: "1",
      movies: [],
      showAdult: true
    };
  }

  componentDidMount() {
    this.getMovies();
  }

  handlePage(page, activeFilter, showAdult) {
    this.setState({ page, activeFilter, showAdult }, () => {
      this.getMovies();
    });
  }

  getMovies() {
    const { id } = this.props.match.params;
    const { page, movies, activeFilter, showAdult } = this.state;
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=52847a5fec3921c2383c109952fa0141" +
          `&language=en-US&region=US&certification_country=US&certification=${
            showAdult ? "G|PG-13|R|NC-17|NR|PG" : "G|PG-13|NR|PG"
          }` +
          `&vote_average.gte=1&vote_count.gte=10&sort_by=${activeFilter}&include_adult=false` +
          `&include_video=false&page=${page}&with_genres=${id}`
      )
      .then(response => {
        this.setState({ movies: response.data.results });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { userBookmarks } = this.props;
    const { movies, page, activeFilter, showAdult } = this.state;
    const { name } = this.props.location.state;
    const moviesList = [{ name: activeFilter, data: movies }];
    return (
      <Layout className="routeBox" user={this.props.user}>
        <div className="snackBox">
          <div className="snacks">
            <Link
              to={{
                pathname: "/categories"
              }}
              className="snackText"
              style={{ color: "#03C6E5" }}
            >
              Categories
            </Link>
            <IconContext.Provider
              value={{ color: "rgba(255,255,255,0.5)", size: 20 }}
            >
              <MdKeyboardArrowRight />
            </IconContext.Provider>
            <p className="snackText">{name}</p>
          </div>
        </div>
        {this.state.movies.length !== 0 ? (
          <Section
            sort={true}
            showAdult={showAdult}
            activeFilter={activeFilter}
            moviesList={moviesList}
            title={name}
            page={page}
            updatePage={this.handlePage}
            userBookmarks={userBookmarks}
          />
        ) : null}
      </Layout>
    );
  }
}

export default Movies;
