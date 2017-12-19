// @flow

import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import SignOutIcon from 'material-ui-icons/PowerSettingsNew';
import HomeIcon from 'material-ui-icons/Home';
import { Link } from 'react-router-dom';

export const notSignedInStoreMainDrawerListItems = translate => {
  return (
    <div>
      <ListItem button>
        <ListItemIcon>
          <SignOutIcon />
        </ListItemIcon>
        <Link to="/signin">{translate('signIn.label')}</Link>
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SignOutIcon />
        </ListItemIcon>
        <Link to="/signup">{translate('signUp.label')}</Link>
      </ListItem>
    </div>
  );
};

export const signedInStoreMainDrawerListItems = (translate, handleSignOut) => (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <Link to="/">{translate('home.label')}</Link>
    </ListItem>
    <ListItem button onClick={handleSignOut}>
      <ListItemIcon>
        <SignOutIcon />
      </ListItemIcon>
      <ListItemText primary={translate('signOut.label')} />
    </ListItem>
  </div>
);
