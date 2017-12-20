// @flow

import React, { Component } from 'react';
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
import Menu, { MenuItem } from 'material-ui/Menu';
import MenuIcon from 'material-ui-icons/Menu';
import LanguageIcon from 'material-ui-icons/Language';
import { translate } from 'react-i18next';
import Styles from './Styles';

const getDrawer = (classes, drawerListItems) => (
  <div>
    <div className={classes.drawerHeader} />
    <Divider />
    <List>{drawerListItems}</List>
  </div>
);

class ResponsiveDrawer extends Component {
  state = {
    anchorEl: null,
  };

  handleLanguagesMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleLanguagesClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLanguagesChange = language => {
    this.props.handleLanguageChange(language);
    this.handleLanguagesClose();
  };

  render = () => {
    const { classes, theme, mobileOpen, handleDrawerToggle, drawerListItems, appBarTitle, children, t } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
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
              <div className={classes.languagesDiv}>
                <IconButton aria-owns={open ? 'menu-languages' : null} aria-haspopup="true" onClick={this.handleLanguagesMenu} color="contrast">
                  <LanguageIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleLanguagesClose}
                >
                  <MenuItem onClick={() => this.handleLanguageChange('en')}>{t('englishLanguage.menuItem')}</MenuItem>
                  <MenuItem onClick={() => this.handleLanguageChange('zh')}>{t('chineseLanguage.menuItem')}</MenuItem>
                </Menu>
              </div>
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
  };
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  drawerListItems: PropTypes.object.isRequired,
  appBarTitle: PropTypes.string.isRequired,
  handleLanguageChange: PropTypes.func.isRequired,
};

export default withStyles(Styles, { withTheme: true })(translate()(ResponsiveDrawer));
