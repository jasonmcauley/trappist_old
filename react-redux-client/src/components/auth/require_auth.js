import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
  class Authentication extends Component {

    static contextTypes = {
      router: React.PropTypes.object
    }

    isAuthenticated(authenticated) {
      if(!authenticated){
        this.context.router.push('/');
      }
    }

    componentWillMount() {
      this.isAuthenticated(this.props.authenticated);
    }

    componentWillUpdate(nextProps) {
      this.isAuthenticated(nextProps.authenticated);
    }



    render() {
      // User is authenticated
      return <ComposedComponent {...this.props} />;
    }
  }

  function mapStateToProps(state){
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
