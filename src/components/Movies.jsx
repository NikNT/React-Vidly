import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Like from "../common/Like";

class Table extends Component {
  state = {
    movies: getMovies(),
  };

  handleDelete(movie) {
    const movies = this.state.movies.filter((m) => m._id !== movie._id); //Gives a new array : Containing Movies with ID Not Matching the ID of Selected Movie
    this.setState({
      movies,
    });
  }

  handleLike(movie) {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({
      movies,
    });
  }

  render() {
    const { movies } = this.state;

    if (movies.length === 0) {
      return <h1 style={{ marginTop: "10px" }}>No Movies in Database 😕</h1>;
    }

    return (
      <React.Fragment>
        <p style={{ marginTop: "10px" }}>
          Showing {movies.length} Movies in Database 🎥
        </p>
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
      </React.Fragment>
    );
  }
}

export default Table;
