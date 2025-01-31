import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllMovies } from "../../api/fetch";
import MovieListing from "./MovieListing";
import ErrorMessage from "../errors/ErrorMessage";
import "./MoviesIndex.css";

function filterMovies(search, movies) {
  return movies.filter((movie) => {
    return movie.title.toLowerCase().includes(search.toLowerCase());
  })
}

export default function MoviesIndex() {
  const [error, setError] = useState(false);
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState([]);

  function handleTextChange(event) {
    setSearchTitle(event.target.value);
    const result = event.target.value ? filterMovies(event.target.value, allMovies) : allMovies;
    setMovies(result);
  }

  useEffect(() => {
    getAllMovies()
      .then(response => {
        setMovies(response);
        setAllMovies(response);
        setError(false);
      }).catch(error => {
        console.log(error);
        setError(true);
      })
  }, []);

  return (
    <div>
      {error ? (
        <ErrorMessage />
      ) : (
        <section className="shows-index-wrapper">
          <h2>All Movies</h2>
          <button>
            <Link to="/movies/new">Add a new movie</Link>
          </button>
          <br />
          <label htmlFor="searchTitle">
            Search movies:
            <input
              type="text"
              value={searchTitle}
              id="searchTitle"
              onChange={handleTextChange}
            />
          </label>
          <section className="movies-index">
            {movies.map((movie) => {
              return <MovieListing movie={movie} key={movie.id} />;
            })}
          </section>
        </section>
      )}
    </div>
  );
}
