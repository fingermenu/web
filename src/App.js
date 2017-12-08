// @flow

import Immutable, { Map } from 'immutable';
import * as userAccessActions from 'micro-business-parse-server-common-web/dist/userAccess/Actions';
import { UserAccessStatus } from 'micro-business-parse-server-common-web';
import { MessageType } from 'micro-business-common-react';
import * as messageBarActions from 'micro-business-common-react/dist/messageBar/Actions';
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
import { ShellContainer } from './sharedComponents/shell';
import { SignInContainer, SignUpContainer } from './app/auth';
import { HomeContainer } from './app/home';
import { Stores, NewStoreContainer } from './app/stores';
import { Products } from './app/products';
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
          <Route path="/myStores" exact render={props => <ShellContainer {...props} shellContent={<Stores />} />} />
          <Route path="/myProducts" exact render={props => <ShellContainer {...props} shellContent={<Products />} />} />
          <Route path="/newStore" exact render={props => <ShellContainer {...props} shellContent={<NewStoreContainer />} />} />
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
