// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import ResponsiveDrawer from './ResponsiveDrawer';

class ResponsiveDrawerContainer extends Component {
  state = {
    mobileOpen: false,
  };

  handleLanguageChange = language => {
    this.props.i18n.changeLanguage(language);
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  render = () => (
    <ResponsiveDrawer
      mobileOpen={this.state.mobileOpen}
      handleDrawerToggle={this.handleDrawerToggle}
      drawerListItems={this.props.drawerListItems}
      appBarTitle={this.props.appBarTitle}
      handleLanguageChange={this.handleLanguageChange}
    >
      {this.props.children}
    </ResponsiveDrawer>
  );
}

ResponsiveDrawer.propTypes = {
  drawerListItems: PropTypes.object.isRequired,
  appBarTitle: PropTypes.string.isRequired,
};

export default translate()(ResponsiveDrawerContainer);
