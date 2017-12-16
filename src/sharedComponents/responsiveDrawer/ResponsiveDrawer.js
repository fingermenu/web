// @flow

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Hidden from 'material-ui/Hidden';
import Divider from 'material-ui/Divider';
import MenuIcon from 'material-ui-icons/Menu';
import Styles from './Styles';

const getDrawer = (classes, drawerListItems) => (
  <div>
    <div className={classes.drawerHeader} />
    <Divider />
    <List>{drawerListItems}</List>
  </div>
);

const ResponsiveDrawer = ({ classes, theme, mobileOpen, handleDrawerToggle, drawerListItems, appBarTitle, children }) => (
  <div className={classes.root}>
    <div className={classes.appFrame}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton color="contrast" aria-label="open drawer" onClick={handleDrawerToggle} className={classes.navIconHide}>
            <MenuIcon />
          </IconButton>
          <Typography type="title" color="inherit" noWrap>
            {appBarTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Hidden mdUp>
        <Drawer
          type="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onRequestClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {getDrawer(classes, drawerListItems)}
        </Drawer>
      </Hidden>
      <Hidden mdDown implementation="css">
        <Drawer
          type="permanent"
          open
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          {getDrawer(classes, drawerListItems)}
        </Drawer>
      </Hidden>
      <main className={classes.content}>{children}</main>
    </div>
  </div>
);

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  drawerListItems: PropTypes.object.isRequired,
  appBarTitle: PropTypes.string.isRequired,
};

export default withStyles(Styles, { withTheme: true })(ResponsiveDrawer);
