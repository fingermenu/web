// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { translate } from 'react-i18next';
import Styles from './Styles';

const Home = ({ classes, t }) => (
  <Paper className={classes.root}>
    <Typography className={classes.content}>{t('homePage.label')}</Typography>
  </Paper>
);

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(Styles)(translate()(Home));
