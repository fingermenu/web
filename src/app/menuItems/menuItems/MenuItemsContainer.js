// @flow

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import MenuItemsList from './MenuItemsList';
import { type MenuItemsRelayContainer_user } from './__generated__/MenuItemsRelayContainer_user.graphql';

type Props = {
  user: MenuItemsRelayContainer_user,
};

type State = {
  sortingState: string,
};

class MenuItemsContainer extends Component<any, Props, State> {
  state = {
    sortingState: [{ columnName: 'name', direction: 'desc' }],
  };

  handleSortingChanged = sortingState => {
    this.setState({ sortingState });
  };

  handleAddButtonClicked = () => {
    this.props.history.push('/newMenuItem');
  };

  render = () => (
    <MenuItemsList
      menuItems={this.props.user.menuItems.edges
        .map(_ => _.node)
        .map(_ => ({
          id: _.id,
          name: _.name,
        }))
        .sort((menuItem1, menuItem2) => {
          const columnSorting = this.state.sortingState[0];

          if (columnSorting.direction.localeCompare('desc') === 0) {
            if (columnSorting.columnName.localeCompare('name') === 0) {
              return menuItem1.name.localeCompare(menuItem2.name);
            } else {
              return menuItem1.name.localeCompare(menuItem2.name);
            }
          } else {
            let comparisonResult;

            if (columnSorting.columnName.localeCompare('name') === 0) {
              comparisonResult = menuItem1.name.localeCompare(menuItem2.name);
            } else {
              comparisonResult = menuItem1.name.localeCompare(menuItem2.name);
            }

            if (comparisonResult > 0) {
              return -1;
            } else if (comparisonResult < 0) {
              return 1;
            } else {
              return 0;
            }
          }
        })}
      sortingState={this.state.sortingState}
      handleSortingChanged={this.handleSortingChanged}
      handleAddButtonClicked={this.handleAddButtonClicked}
    />
  );
}

MenuItemsContainer.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {};
}

export default withRouter(connect(mapStateToProps)(MenuItemsContainer));
