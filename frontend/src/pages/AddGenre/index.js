import React from "react";
import Joi from "joi";
import { connect } from "react-redux";
import { addGenre, getGenres, deleteGenre } from "../../actions/genreAction";
import { Input, Button } from "../../components/common";

class AddGenre extends React.Component {
  state = {
    data: {
      name: "",
    },
    errors: {},
  };

  componentDidMount() {
    this.props.getGenres();
  }

  schema = {
    name: Joi.string().required().label("Genre"),
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  validateProperty = (input) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const subSchema = Joi.object({ [name]: this.schema[name] });
    const { error } = subSchema.validate(obj);
    return error ? error.details[0].message : null;
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.object(this.schema).validate(
      this.state.data,
      options
    );
    if (!error) return null;

    const errors = {};
    error.details.forEach(
      (element) => (errors[element.path[0]] = element.message)
    );
    return errors;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    if (errors) {
      this.setState({ errors });
      return;
    }
    await this.props.addGenre(this.state.data);
    this.setState({ data: { name: "" } });
    this.props.getGenres();
  };

  handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete this genre?")) {
      await this.props.deleteGenre(id);
    }
  };

  render() {
    const { data, errors } = this.state;
    const { name } = data;
    const { genres } = this.props;

    return (
      <div className="background-container pt-5">
        <div className="container">
          <h1 className="header">Add Genre</h1>
          <form onSubmit={this.handleSubmit}>
            <Input
              name="name"
              label="Genre"
              type="text"
              error={errors["name"]}
              iconClass="fas fa-film"
              onChange={this.handleChange}
              placeholder="Please enter the genre..."
              value={name}
              autoFocus
            />
            <Button disabled={this.validate()} type="submit" label="Add Genre" />
          </form>

          <hr className="mt-5" />
          <h2 className="header mt-4">Manage Genres</h2>
          {genres && genres.length > 0 ? (
            <ul className="list-group mt-3" style={{ maxWidth: "500px", margin: "0 auto" }}>
              {genres.map(genre => (
                <li key={genre._id} className="list-group-item d-flex justify-content-between align-items-center text-dark">
                  {genre.name}
                  <button 
                    className="btn btn-sm btn-danger" 
                    onClick={() => this.handleDelete(genre._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white mt-3">No genres available.</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    genres: state.genre.genres,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addGenre: (genre) => dispatch(addGenre(genre)),
    getGenres: () => dispatch(getGenres()),
    deleteGenre: (id) => dispatch(deleteGenre(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGenre);
