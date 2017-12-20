// @flow

import React from 'react';
import Button from 'material-ui/Button';
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { TextField } from 'redux-form-material-ui';
import { translate } from 'react-i18next';
import Styles from './Styles';

const SignIn = ({ classes, handleSubmit, handleCancel, t }) => (
  <Grid container className={classes.root}>
    <Grid item xs={12}>
      <form onSubmit={handleSubmit}>
        <Grid container className={classes.inputSection} alignItems="center" direction="column" justify="center">
          <Grid item>
            <Field id="email" label={t('email.label')} name="email" component={TextField} type="email" required />
          </Grid>
          <Grid item>
            <Field id="password" label={t('password.label')} name="password" component={TextField} type="password" required />
          </Grid>
        </Grid>
        <Grid container className={classes.actionSection} alignItems="center" direction="row" justify="center">
          <Grid item>
            <Button color="primary" raised type="submit">
              {t('signIn.button')}
            </Button>
          </Grid>
          <Grid item>
            <Button color="default" raised onClick={handleCancel}>
              {t('cancel.button')}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  </Grid>
);

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
};

export default withStyles(Styles)(reduxForm({ form: 'SignIn' })(translate()(SignIn)));
