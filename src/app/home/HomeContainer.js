// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';

class HomeContainer extends Component {
  render = () => <Home />;
}

HomeContainer.propTypes = {};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
