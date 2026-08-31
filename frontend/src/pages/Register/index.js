import React from "react";
import Joi from "joi";
import Input from "../../components/common/Input";
import { connect } from "react-redux";
import { signUp } from "../../actions/authAction";
import Button from "../../components/common/Button";
import { Link } from "react-router-dom";
import "../auth.css";

class RegisterForm extends React.Component {
  state = {
    data: {
      email: "",
      password: "",
      passwordRepeat: "",
    },
    errors: {},
    passwordError: "",
  };

  componentDidUpdate(prevProps) {
    if (this.props.loggedIn && !prevProps.loggedIn) {
      this.props.history.push("/");
    }
  }

  validateProperty = (input) => {
    const { name, value } = input;
    const obj = { [name]: value };
    const subSchema = Joi.object({ [name]: this.schema[name] });
    const { error } = subSchema.validate(obj);
    return error ? error.details[0].message : null;
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
  handleSubmit = (e) => {
    e.preventDefault();
    const { password, passwordRepeat, email } = this.state.data;
    if (password !== passwordRepeat)
      this.setState({ passwordError: "The passwords doesn not match." });
    else this.props.signUp({ email, password }, this.props.history);
  };

  schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Email"),
    password: Joi.string().min(8).required().label("Password"),
    passwordRepeat: Joi.string().required().label("Repear Password"),
  };
  render() {
    const { authMessage } = this.props;
    const { errors, passwordError } = this.state;
    const { email, password, passwordRepeat } = this.state.data;

    return (
      <div className="background-container">
        <div className="auth-wrapper">
          <div className="auth-card">
            <h1 className="auth-header">Create an Account</h1>
            <form onSubmit={this.handleSubmit}>
              <Input
                name="email"
                label="Email"
                type="email"
                error={errors["email"]}
                iconClass="fas fa-envelope"
                onChange={this.handleChange}
                placeholder="Enter your email"
                value={email}
                autoFocus
              />
              <Input
                name="password"
                label="Password"
                type="password"
                error={errors["password"]}
                iconClass="fas fa-key"
                onChange={this.handleChange}
                placeholder="Create a password"
                value={password}
              />
              <Input
                name="passwordRepeat"
                type="password"
                label="Repeat Password"
                error={errors["passwordRepeat"]}
                iconClass="fas fa-key"
                onChange={this.handleChange}
                placeholder="Repeat your password"
                value={passwordRepeat}
              />
              {authMessage || passwordError ? (
                <p className="text-danger mt-3">
                  {authMessage} {passwordError}
                </p>
              ) : null}
              
              <Button disabled={this.validate()} type="submit" label="Sign Up" />
              
              <p className="auth-footer-text">
                Already have an account? <Link to="/login">Sign in.</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
    authMessage: state.auth.authMessage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (creds, history) => dispatch(signUp(creds, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
