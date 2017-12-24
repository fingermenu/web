// @flow

import * as userAccessActions from '@microbusiness/common-react/dist/userAccess/Actions';
import { UserAccessStatus } from '@microbusiness/common-react';
import { MessageType } from '@microbusiness/common-react';
import * as messageBarActions from '@microbusiness/common-react/dist/messageBar/Actions';
import Immutable, { Map } from 'immutable';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';
import { LinearProgress } from 'material-ui/Progress';
import Fade from 'material-ui/transitions/Fade';
import { withStyles } from 'material-ui/styles';
import withRoot from './sharedComponents/withRoot';
import { ShellContainer } from './app/shell';
import { SignInContainer, SignUpContainer } from './app/auth';
import { HomeContainer } from './app/home';
import { MenuItems } from './app/menuItems';
import Styles from './Styles';
import './App.css';

class App extends Component {
  state = {
    snackbar: {
      open: false,
      errorMessageToDisplay: null,
    },
  };

  componentWillMount = () => {
    this.props.userAccessActions.getCurrentUser();
  };

  componentWillReceiveProps = nextProps => {
    const errorMessages = Immutable.fromJS(nextProps.messagesInfo)
      .filter(messageInfo => messageInfo.get('messageType') === MessageType.ERROR)
      .map(messageInfo => messageInfo.get('message'));

    if (!errorMessages.isEmpty()) {
      this.showSnackbar(errorMessages.reduce((acc, message) => acc + '\n' + message));
    }

    nextProps.messagesInfo.forEach(messageInfo => this.props.messageBarActions.remove(messageInfo.messageId));

    nextProps.userAccessFailedOperations.forEach(failedOperation => {
      this.props.messageBarActions.add(failedOperation.errorMessage, MessageType.ERROR);

      this.props.userAccessActions.acknowledgeFailedOperation(
        Map({
          operationId: failedOperation.operationId,
        }),
      );
    });
  };

  showSnackbar = errorMessageToDisplay => {
    this.setState({ snackbar: { open: true, errorMessageToDisplay } });
  };

  handleRequestCloseSnackbar = () => {
    this.setState({ snackbar: { open: false, errorMessageToDisplay: null } });
  };

  render = () => {
    const { classes, getCurrentUserStatus } = this.props;
    const { snackbar } = this.state;

    return getCurrentUserStatus === UserAccessStatus.IN_PROGRESS ? (
      <div className={classes.progressRoot}>
        <LinearProgress />
      </div>
    ) : (
      <BrowserRouter>
        <div className={classes.root}>
          <Route path="/signin" component={SignInContainer} exact />
          <Route path="/signup" component={SignUpContainer} exact />
          <Route path="/" exact render={props => <ShellContainer {...props} shellContent={<HomeContainer />} />} />
          <Route path="/myMenuItems" exact render={props => <ShellContainer {...props} shellContent={<MenuItems />} />} />
          <Snackbar
            open={snackbar.open}
            onRequestClose={this.handleRequestCloseSnackbar}
            transition={Fade}
            SnackbarContentProps={{
              'aria-describedby': 'message-id',
            }}
            message={<span id="message-id">{snackbar.errorMessageToDisplay}</span>}
          />
        </div>
      </BrowserRouter>
    );
  };
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
  getCurrentUserStatus: PropTypes.number.isRequired,
  messageBarActions: PropTypes.object.isRequired,
  userAccessActions: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    getCurrentUserStatus: state.userAccess.get('getCurrentUserStatus'),
    messagesInfo: state.messageBar.get('messages').toJS(),
    userAccessFailedOperations: state.userAccess.get('failedOperations').toJS(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    userAccessActions: bindActionCreators(userAccessActions, dispatch),
    messageBarActions: bindActionCreators(messageBarActions, dispatch),
  };
}

export default withRoot(withStyles(Styles)(connect(mapStateToProps, mapDispatchToProps)(App)));
