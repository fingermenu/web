// @flow

import React from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import Styles from './Styles';

const SignUp = ({ classes, handleSubmit, handleCancel }) => (
  <Grid container className={classes.root}>
    <Grid item xs={12}>
      <form onSubmit={handleSubmit}>
        <Grid container className={classes.inputSection} alignItems="center" direction="column" justify="center">
          <Grid item>
            <Field id="email" label="Email" name="email" component={TextField} type="email" required />
          </Grid>
          <Grid item>
            <Field id="password" label="Password" name="password" component={TextField} type="password" required />
          </Grid>
          <Grid item>
            <Field id="repassword" label="Retype Password" name="repassword" component={TextField} type="password" required />
          </Grid>
        </Grid>
        <Grid container className={classes.actionSection} alignItems="center" direction="row" justify="center">
          <Grid item>
            <Button color="primary" raised type="submit">
              Sign Up
            </Button>
          </Grid>
          <Grid item>
            <Button color="default" raised onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  </Grid>
);

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default withStyles(Styles)(reduxForm({ form: 'SignUp' })(SignUp));
