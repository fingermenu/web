// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Styles from './Styles';

const Home = ({ classes }) => (
  <Paper className={classes.root}>
    <Typography className={classes.content}>Home Page</Typography>
  </Paper>
);

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(Home);
