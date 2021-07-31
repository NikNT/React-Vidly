import React, { Component } from "react";
import Paginate from "../common/Paginate";
import ListGroup from "../common/ListGroup";
import MoviesTable from "./MoviesTable";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Table extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: "title",
    sortColumn: {
      path: "title",
      order: "asc",
    },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({
      movies: getMovies(),
      genres,
    });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id); //Gives a new array : Containing Movies with ID Not Matching the ID of Selected Movie
    this.setState({
      movies,
      pageSize: 4,
    });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({
      movies,
    });
  };

  handleChange = (page) => {
    this.setState({
      currentPage: page,
    });
  };

  handleGenreSelect = (genre) => {
    this.setState({
      selectedGenre: genre,
      currentPage: 1,
    });
  };

  handleSort = (sortColumn) => {
    this.setState({
      sortColumn,
    });
  };

  getPageData = () => {
    const {
      movies: allMovies,
      pageSize,
      currentPage,
      selectedGenre,
      sortColumn,
    } = this.state;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, genres, selectedGenre, sortColumn } =
      this.state;

    if (count === 0) {
      return <h1 style={{ marginTop: "10px" }}>No Movies in Database 😕</h1>;
    }

    const { totalCount, data: movies } = this.getPageData();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={genres}
            onItemSelect={this.handleGenreSelect}
            selectedGenre={selectedGenre}
          />
        </div>
        <div className="col">
          <h2 style={{ marginTop: "10px" }} className="container text-center">
            Showing {totalCount} Movies in Database 🎥
          </h2>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Paginate
            pageSize={pageSize}
            itemsCount={totalCount}
            currentPage={currentPage}
            onPageChange={this.handleChange}
          />
          <h1 className="container text-center">Vidly</h1>
        </div>
      </div>
    );
  }
}

export default Table;
