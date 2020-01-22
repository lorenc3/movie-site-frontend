import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Layout from "../../components/Layout/Layout";
import "./Categories.css";

const maxWidth = window.screen.availWidth;
const maxHeight = window.screen.availHeight;

class Categories extends Component {
  constructor() {
    super();
    this.renderCategories = this.renderCategories.bind(this);
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    this.showImg = this.showImg.bind(this);

    this.state = {
      genres: [],
      width: 0,
      height: 0,
      selected: { id: 12, name: "Adventure", image: "adventure.png" },
      show: true
    };
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  showImg(item) {
    this.setState({ show: false, selected: item });
    setTimeout(() => {
      this.setState({ show: true });
    }, 200);
  }

  renderCategories() {
    const { selected, height } = this.state;
    const genres = [
      {
        id: 12,
        name: "Adventure",
        image: "adventure.png"
      },
      {
        id: 28,
        name: "Action",
        image: "action.png"
      },
      {
        id: 16,
        name: "Animation",
        image: "animation.png"
      },
      {
        id: 35,
        name: "Comedy",
        image: "comedy.png"
      },
      {
        id: 18,
        name: "Drama",
        image: "drama.png"
      },
      {
        id: 36,
        name: "History",
        image: "history.png"
      },
      {
        id: 27,
        name: "Horror",
        image: "horror.png"
      },
      {
        id: 10749,
        name: "Romance",
        image: "romance.png"
      },
      {
        id: 878,
        name: "Sci-Fi",
        image: "sci-fi.png"
      },
      {
        id: 53,
        name: "Thriller",
        image: "thriller.png"
      }
    ];
    return genres.map(item => {
      return (
        <button
          className="catBox"
          onClick={() => this.showImg(item)}
          key={item.id}
          style={{
            backgroundColor: selected.id === item.id ? "#f7cc00" : "#f3f3f3"
          }}
        >
          <p className="catText">{item.name}</p>
        </button>
      );
    });
  }

  render() {
    const { selected, show, width, height } = this.state;
    const imgPath = `/images/${selected.image}`;
    const align = height < maxHeight * 0.9;
    const white2 = width < maxWidth;
    return (
      <Layout
        activeRoute={1}
        user={this.props.user}
        white={width === maxWidth}
        white2={white2}
      >
        {!white2 ? (
          <div
            className={show ? "genresImg" : "hiddenImg"}
            style={{
              backgroundImage: `url(${imgPath})`
            }}
          />
        ) : null}

        <div
          className="genresBox"
          style={{
            justifyContent: !white2 ? "flex-start" : "center",
            alignItems: align ? "start" : "center"
          }}
        >
          <div className="genres">
            {this.renderCategories()}
            <Link
              to={{
                pathname: `/categories/${selected.id}`,
                state: { name: selected.name }
              }}
              className="browseBox"
            >
              <p className="browseText">Browse</p>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Categories;
