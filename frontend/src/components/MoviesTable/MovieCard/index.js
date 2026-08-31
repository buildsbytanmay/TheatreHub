import React from "react";
import { connect } from "react-redux";
import { deleteMovie } from "../../../actions/moviesAction";

import FlippingCardFront from "./CardFront";
import FlippingCardBack from "./CardBack";
import "./style.css";

const MovieCard = ({ movie, user, deleteMovie }) => {
  const {
    _id,
    title,
    rate,
    genre,
    image,
    description,
    trailerLink,
    movieLength,
  } = movie;

  const coverImage = image;

  function flipCard(cardID) {
    const card = document.getElementById(`${cardID}`);
    if(card) card.classList.toggle("flipped");
  }

  const handleDelete = (e) => {
    e.stopPropagation(); // prevent flipping when deleting
    if (window.confirm("Are you sure you want to delete this movie?")) {
      deleteMovie(_id);
    }
  };

  return (
    <div className="card-container" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="card-wrapper" id={_id} onClick={() => flipCard(_id)}>
        <FlippingCardFront
          trailerLink={trailerLink}
          coverImage={coverImage}
          rate={rate}
          movieLength={movieLength}
          genre={genre}
          title={title}
        />

        <FlippingCardBack description={description} />
      </div>
      {user && user.role === "admin" && (
        <button 
          className="btn btn-danger mt-2" 
          style={{ zIndex: 10 }}
          onClick={handleDelete}
        >
          Delete Movie
        </button>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps, { deleteMovie })(MovieCard);
