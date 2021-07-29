import React, { Component } from "react";
import Like from "../common/Like";
import Paginate from "../common/Paginate";
import { getMovies } from "../services/fakeMovieService";
import { paginate } from "../utils/paginate";

class Table extends Component {
  state = {
    movies: getMovies(),
    pageSize: 4,
    currentPage: 1,
  };

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

  render() {
    const { length: count } = this.state.movies;
    const { movies: allMovies, pageSize, currentPage } = this.state;
    const movies = paginate(allMovies, currentPage, pageSize);
    if (count === 0) {
      return <h1 style={{ marginTop: "10px" }}>No Movies in Database 😕</h1>;
    }
    return (
      <React.Fragment>
        <h2 style={{ marginTop: "10px" }} className="container text-center">
          Showing {count} Movies in Database 🎥
        </h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Rate</th>
              <th>Action</th>
              <th>Like</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie.liked}
                    onClick={() => this.handleLike(movie)}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(movie)}
                    className="btn btn-danger btn-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Paginate
          pageSize={pageSize}
          itemsCount={count}
          currentPage={currentPage}
          onPageChange={this.handleChange}
        />
        <h1 className="container text-center">Vidly</h1>
      </React.Fragment>
    );
  }
}

export default Table;
