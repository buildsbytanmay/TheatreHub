import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import { search, categorize, filterRating } from "../../utils";
import { MoviesTable, Pagination } from "../../components";
import { Input, Loading, ListGroup, Rating } from "../../components/common";

import { getMovies } from "../../actions/moviesAction";
import { getGenres } from "../../actions/genreAction";

const Movies = (props) => {
  const [pageSize] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentGenre, setCurrentGenre] = useState("All");
  const [searchFilter, setSearchFilter] = useState("");
  const [rating, setRating] = useState(0);

  useEffect(() => {
    props.getMovies();
    props.getGenres();
  }, [props.loggedIn, props.getMovies, props.getGenres]);

  const handleChange = (name, value) => {
    if (name === "currentGenre") {
      setCurrentGenre(value);
    } else if (name === "searchFilter") {
      setSearchFilter(value);
    } else if (name === "rating") {
      setRating(value);
    }
    setCurrentPage(1);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const { movies, genres, loading } = props;
  const allGenres = [{ name: "All" }, ...genres];

  const filteredMovies = useMemo(() => {
    let result = search(movies, searchFilter, "title");
    result = categorize(result, currentGenre);
    result = filterRating(result, Number(rating));
    return result;
  }, [movies, searchFilter, currentGenre, rating]);

  if (loading) {
    return (
      <div className="background-container pt-5">
        <Loading />
      </div>
    );
  }

  return (
    <div className="background-container">
      {filteredMovies.length > 0 && (
        <div 
          className="hero-banner" 
          style={{ 
            backgroundImage: `linear-gradient(to right, #0f0f11 20%, transparent 100%), linear-gradient(to top, #0f0f11 0%, transparent 20%), url(${filteredMovies[0].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '65vh',
            display: 'flex',
            alignItems: 'center',
            padding: '0 5%',
            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
            marginTop: '-70px', /* offset the App.css padding-top */
            paddingTop: '70px'
          }}
        >
          <div style={{ maxWidth: '600px', zIndex: 2 }}>
            <h1 style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '20px', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
              {filteredMovies[0].title}
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#e5e5e5', marginBottom: '30px', textShadow: '1px 1px 2px rgba(0,0,0,0.8)', lineHeight: '1.6' }}>
              {filteredMovies[0].description}
            </p>
            <a href={filteredMovies[0].trailerLink} target="_blank" rel="noopener noreferrer" className="btn" style={{ backgroundColor: '#e50914', color: 'white', padding: '12px 35px', fontSize: '1.1rem', fontWeight: 600, borderRadius: '4px', textDecoration: 'none' }}>
              <i className="fas fa-play mr-2"></i> Watch Trailer
            </a>
          </div>
        </div>
      )}
      <div className="mx-5 py-5">
        <div className="row">
          <div className="col-lg-2 col-sm-12 mt-10">
            <h4 className="text-muted text-left p-1">Filters</h4>
            <ListGroup
              active={currentGenre}
              onChange={(val) => handleChange("currentGenre", val)}
              options={allGenres}
            />
            <h4 className="text-muted text-left p-1 mt-3">Rating</h4>
            <Rating
              total={10}
              filled={rating}
              onChange={(val) => handleChange("rating", val)}
            />
          </div>

          <div className="col-lg-10 col-sm-12">
            <Input
              onChange={(event) =>
                handleChange("searchFilter", event.target.value)
              }
              label="Search Movie"
              iconClass="fas fa-search"
              placeholder="Search..."
            />
            <p className="text-left text-muted">
              {!!filteredMovies.length ? `${filteredMovies.length}` : "0"}
              movies found.
            </p>

            {!!filteredMovies ? (
              <MoviesTable
                pageSize={pageSize}
                currentPage={currentPage}
                movies={filteredMovies}
              />
            ) : (
              <h1 className="text-white">No Movies</h1>
            )}
            <br />

            <Pagination
              itemsCount={filteredMovies.length}
              pageSize={pageSize}
              onPageChange={onPageChange}
              currentPage={currentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    movies: state.movie.movies,
    genres: state.genre.genres,
    loggedIn: state.auth.loggedIn,
    loading: state.movie.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMovies: () => dispatch(getMovies()),
    getGenres: () => dispatch(getGenres()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
