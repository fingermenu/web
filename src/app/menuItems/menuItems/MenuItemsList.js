// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import Paper from 'material-ui/Paper';
import Styles from './Styles';
import { MenuItemsProp } from './PropTypes';

const MenuItemsList = ({ classes, menuItems, sortingState, handleSortingChanged, handleAddButtonClicked }) => (
  <div>
    <Paper className={classes.root} />
    <Button fab color="primary" aria-label="add" className={classes.fabButton} onClick={handleAddButtonClicked}>
      <AddIcon />
    </Button>
  </div>
);

MenuItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
  menuItems: MenuItemsProp,
  sortingState: PropTypes.arrayOf(
    PropTypes.shape({
      columnName: PropTypes.string.isRequired,
      direction: PropTypes.string.isRequired,
    }),
  ),
  handleSortingChanged: PropTypes.func.isRequired,
  handleAddButtonClicked: PropTypes.func.isRequired,
};

export default withStyles(Styles)(MenuItemsList);
