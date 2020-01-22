import React, { Component } from "react";
import { IconContext } from "react-icons";
import {
  MdTrendingUp,
  MdWhatshot,
  MdNewReleases,
  MdStar,
  MdMovieCreation,
  MdPriorityHigh,
  MdCheckBoxOutlineBlank,
  MdCheckBox,
  MdStars,
  MdArrowDownward,
  MdArrowUpward
} from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";

import Button from "../Button/Button";
import Poster from "../Poster/Poster";

import "./Section.css";

class Section extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFilter: false
    };

    this.filterRef = React.createRef();
    this.renderIcon = this.renderIcon.bind(this);
    this.renderPopUp = this.renderPopUp.bind(this);
  }

  renderPopUp() {
    const { sort, showAdult, activeFilter } = this.props;
    const { showFilter } = this.state;
    const filters = ["Trending", "Popular", "New", "Top Rated"];
    const sortFilters = [
      { name: "Popular", val: "popularity.desc" },
      { name: "Date", val: "release_date.desc" },
      { name: "Rating", val: "vote_average.desc" },
      { name: "Popular", val: "popularity.asc" },
      { name: "Date", val: "release_date.asc" },
      { name: "Rating", val: "vote_average.asc" }
    ];
    if (showFilter) {
      if (!sort) {
        return filters.map(item => {
          return (
            <button
              className="popUpButton"
              key={item}
              style={{ opacity: activeFilter === item ? 0.3 : 1 }}
              onClick={() =>
                this.setState(
                  {
                    activeFilter: item,
                    showFilter: false
                  },
                  () => this.props.updatePage("1", item, showAdult)
                )
              }
            >
              <p className="popUpText">{item}</p>
              {this.renderIcon(item)}
            </button>
          );
        });
      }
      return sortFilters.map(item => {
        return (
          <button
            className="popUpButton"
            key={item.val}
            style={{ opacity: activeFilter === item.val ? 0.3 : 1 }}
            onClick={() => {
              this.setState(
                {
                  activeFilter: item.val,
                  showFilter: false
                },
                () => this.props.updatePage("1", item.val, showAdult)
              );
            }}
          >
            <p className="popUpText">{item.name}</p>
            {this.renderIcon(item.val)}
          </button>
        );
      });
    }
    return null;
  }

  renderIcon(filter) {
    const { sort } = this.props;
    const sortFilter = filter.split(".")[1];
    switch (sort ? sortFilter : filter) {
      case "Trending":
        return (
          <IconContext.Provider value={{ color: "white", size: 15 }}>
            <MdTrendingUp />
          </IconContext.Provider>
        );
        break;
      case "Popular":
        return (
          <IconContext.Provider value={{ color: "white", size: 15 }}>
            <MdWhatshot />
          </IconContext.Provider>
        );
        break;
      case "New":
        return (
          <IconContext.Provider value={{ color: "white", size: 15 }}>
            <MdNewReleases />
          </IconContext.Provider>
        );
        break;
      case "desc":
        return (
          <IconContext.Provider value={{ color: "white", size: 15 }}>
            <MdArrowDownward />
          </IconContext.Provider>
        );
        break;
      case "asc":
        return (
          <IconContext.Provider value={{ color: "white", size: 15 }}>
            <MdArrowUpward />
          </IconContext.Provider>
        );
        break;
      default:
        return (
          <IconContext.Provider value={{ color: "white", size: 15 }}>
            <MdStar />
          </IconContext.Provider>
        );
        break;
    }
  }

  scrollToFilter = () =>
    window.scroll({
      top: this.filterRef.current.offsetTop - 70,
      left: 0,
      behavior: "smooth"
    });

  update = item => {
    const { updatePage, activeFilter, showAdult } = this.props;
    this.scrollToFilter();
    updatePage(item, activeFilter, showAdult);
  };

  updateNext = action => {
    const { updatePage, page, activeFilter, showAdult } = this.props;
    updatePage(
      action === "+"
        ? (parseInt(page) + 1).toString()
        : (parseInt(page) - 1).toString(),
      activeFilter,
      showAdult
    );
    this.scrollToFilter();
    // alert(this.filterRef.current.offsetTop);
  };

  render() {
    const {
      moviesList,
      title,
      color,
      sort,
      userBookmarks,
      page,
      activeFilter,
      showAdult
    } = this.props;
    const { showFilter } = this.state;
    const sortFilters = [
      { name: "Popular", val: "popularity.desc" },
      { name: "Popular", val: "popularity.asc" },
      { name: "Date", val: "release_date.desc" },
      { name: "Date", val: "release_date.asc" },
      { name: "Rating", val: "vote_average.desc" },
      { name: "Rating", val: "vote_average.asc" }
    ];
    const sortIndex = sortFilters.findIndex(item => item.val === activeFilter);
    const movieFilter =
      moviesList[moviesList.findIndex(item => item.name === activeFilter)];
    // const filters = ["Trending", "Popular", "New", "Top Rated"];
    return (
      <div className="sectionBox" ref={this.filterRef}>
        <div
          className="sortContainer"
          style={{
            backgroundColor: sort ? "transparent" : "#1d2a39",
            border: sort ? "1px solid #1d2a39" : "none"
          }}
        >
          <div className="sortBox1">
            <div className="sortTextBox">
              <p className="sortText1">Sort:</p>
            </div>
            <div className="filterBox">
              <button
                className="filterButton"
                onClick={() => this.setState({ showFilter: !showFilter })}
              >
                {this.renderIcon(activeFilter)}
                <p className="filterText">
                  {sort ? sortFilters[sortIndex].name : activeFilter}
                </p>
                <IconContext.Provider
                  value={{ color: "white", size: 15, className: "arrowDown" }}
                >
                  <IoMdArrowDropdown />
                </IconContext.Provider>
              </button>
              <div className={showFilter ? "popUpBox" : "popUpBoxHidden"}>
                {this.renderPopUp()}
              </div>
            </div>
            <div className="filterBox">
              <button
                className="filterButton"
                style={{ opacity: 0.3 }}
                disabled
              >
                <IconContext.Provider value={{ color: "white", size: 12 }}>
                  <MdMovieCreation />
                </IconContext.Provider>
                <p className="filterText">Movies</p>
                <IconContext.Provider
                  value={{ color: "white", size: 15, className: "arrowDown" }}
                >
                  <IoMdArrowDropdown />
                </IconContext.Provider>
              </button>
            </div>
          </div>
          <div className="adultContainer">
            <div className="adultBox">
              <button
                className="adultButton"
                onClick={() => {
                  this.setState(
                    {
                      showAdult: !showAdult
                    },
                    () => this.props.updatePage(page, activeFilter, !showAdult)
                  );
                }}
              >
                <IconContext.Provider value={{ color: "#FF6461", size: 15 }}>
                  <MdPriorityHigh />
                </IconContext.Provider>
                <p className="adultText">Rated-R</p>
                <IconContext.Provider value={{ color: "white", size: 15 }}>
                  {showAdult ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                </IconContext.Provider>
              </button>
            </div>
          </div>
        </div>
        <div className="postersBox">
          {movieFilter.data.map((item, i) => {
            var bookmark =
              userBookmarks !== null ? userBookmarks.includes(item.id) : null;
            return (
              <div className="posterBox" key={i} ref={i}>
                <Poster size={300} item={item} bookmarked={bookmark} />
                <p className="posterText">{item.title}</p>
              </div>
            );
          })}
        </div>
        <div className="pageBox">
          <button
            className="nextBox1"
            style={{ opacity: page === "1" ? 0.3 : 1 }}
            disabled={page === "1"}
            onClick={() => this.updateNext("-")}
          >
            <p className="nextText">Previous</p>
          </button>
          <div className="allNumsBox">
            {["1", "2", "3", "4", "5", "6", "7"].map(item => {
              return (
                <button
                  key={item}
                  className={page !== item ? "numBox" : "numBoxSelected"}
                  onClick={() => this.update(item)}
                >
                  <p className="numText">{item}</p>
                </button>
              );
            })}
          </div>
          <button
            className="nextBox1"
            style={{ opacity: page === "7" ? 0.3 : 1 }}
            disabled={page === "7"}
            onClick={() => this.updateNext("+")}
          >
            <p className="nextText">Next</p>
          </button>
        </div>
      </div>
    );
  }
}

export default Section;
