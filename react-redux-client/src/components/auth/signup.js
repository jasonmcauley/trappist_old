import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, Form } from 'redux-form';
import * as actions from '../../actions';


const renderInput = (field) => {
  const { label, type, input, meta: { error, touched } } = field;
  return (
      <div>
          <label>{label}:</label>
          <input {...input} type={type}
              className="form-control" />
              {touched && error && <div className="error">{error}</div>}
      </div>
  );
}

class Signup extends Component {

  handleFormSubmit(formProps) {
    // Call action creator to sign up user
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  render() {

    const { handleSubmit } = this.props;

    return (
      <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <Field className="form-control" name="email" component={renderInput} type="email" label="E-mail"/>
        </fieldset>
        <fieldset className="form-group">
          <Field className="form-control" name="password" component={renderInput} type="password" label="Password" />
        </fieldset>
        <fieldset className="form-group">
          <Field className="form-control" name="passwordConfirm" component={renderInput} type="password" label="Password Confirm"/>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>
      </Form>
    );
  }

}

function validate(formProps) {
  const errors = {};

  if (formProps.password !== formProps.passwordConfirm) {
      errors.password = 'Passwords must match';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  return errors;
}

function mapStateToProps(state) {

    return {
        errorMessage: state.auth.error
    };
}



const form = reduxForm({ form: 'signup', validate });
export default connect(mapStateToProps, actions)(form(Signup));
