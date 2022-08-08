import React from 'react';
import { Redirect, Route } from 'react-router-dom';

// Utils
import auth from '../../utils/auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    auth.getToken() !== null ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: 'auth/login',
        state: { from: props.location }
        }}
      />
    ):
  )} />
);

componentDidMount() {
    // Generate the form with a function to avoid code duplication
    // in other lifecycles
    this.generateForm(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // Since we use the same container for all the auth views we need to update
    // the UI on location change
    if (nextProps.location.match.params.authType !== this.props.location.match.params.authType) {
      this.generateForm(nextProps);
    }
  }

export default PrivateRoute;