// @flow

import * as userAccessActions from 'micro-business-common-react/dist/userAccess/Actions';
import { UserAccessStatus } from 'micro-business-common-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { translate } from 'react-i18next';
import { ResponsiveDrawerContainer } from '../../sharedComponents/responsiveDrawer';
import { notSignedInStoreMainDrawerListItems, signedInStoreMainDrawerListItems } from '../navigation';
import Loading from '../../sharedComponents/loading';

class ShellContainer extends Component {
  componentWillReceiveProps = nextProps => {
    if (nextProps.signOutStatus === UserAccessStatus.SUCCEEDED) {
      this.props.userAccessActions.resetSignOutStatus();
      this.props.history.push('/');
    }
  };

  handleSignOut = values => {
    this.props.userAccessActions.signOut();
  };

  render = () => (
    <div>
      <ResponsiveDrawerContainer
        drawerListItems={
          this.props.userExists
            ? signedInStoreMainDrawerListItems(this.props.t, this.handleSignOut)
            : notSignedInStoreMainDrawerListItems(this.props.t)
        }
        appBarTitle="Finger Menu"
      >
        {this.props.signOutStatus === UserAccessStatus.IN_PROGRESS && <Loading />}
        {this.props.shellContent}
      </ResponsiveDrawerContainer>
    </div>
  );
}

ShellContainer.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  userAccessActions: PropTypes.object.isRequired,
  userExists: PropTypes.bool.isRequired,
  signOutStatus: PropTypes.number.isRequired,
};

function mapStateToProps(state) {
  return {
    signOutStatus: state.userAccess.get('signOutStatus'),
    userExists: state.userAccess.get('userExists'),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccessActions: bindActionCreators(userAccessActions, dispatch),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(translate()(ShellContainer)));