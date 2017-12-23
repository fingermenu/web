// @flow

import * as userAccessActions from '@microbusiness/common-react/dist/userAccess/Actions';
import { UserAccessStatus } from '@microbusiness/common-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { LinearProgress } from 'material-ui/Progress';
import SignIn from './SignIn';

class SignInContainer extends Component {
  componentWillReceiveProps = nextProps => {
    if (nextProps.signInStatus === UserAccessStatus.SUCCEEDED) {
      this.props.userAccessActions.resetSignInStatus();

      if (this.props.history.location.state && this.props.history.location.state.from) {
        this.props.history.goBack();
      } else {
        this.props.history.push('/');
      }
    }
  };

  handleSignInWithUsernameAndPassword = values => {
    this.props.userAccessActions.signInWithUsernameAndPassword(values.email, values.password);
  };

  handleCancel = () => {
    this.props.history.goBack();
  };

  render = () => (
    <div>
      {this.props.signInStatus === UserAccessStatus.IN_PROGRESS && <LinearProgress />}

      <SignIn onSubmit={this.handleSignInWithUsernameAndPassword} handleCancel={this.handleCancel} />
    </div>
  );
}

SignInContainer.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  userAccessActions: PropTypes.object.isRequired,
  signInStatus: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    signInStatus: state.userAccess.get('signInStatus'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccessActions: bindActionCreators(userAccessActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignInContainer));
