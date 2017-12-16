// @flow

import React from 'react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import SignOutIcon from 'material-ui-icons/PowerSettingsNew';
import HomeIcon from 'material-ui-icons/Home';
import MyStoresIcon from 'material-ui-icons/Store';
import MyProductsIcon from 'material-ui-icons/Storage';
import { Link } from 'react-router-dom';

export const notSignedInStoreMainDrawerListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <SignOutIcon />
      </ListItemIcon>
      <Link to="/signin">Sign In</Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SignOutIcon />
      </ListItemIcon>
      <Link to="/signup">Sign Up</Link>
    </ListItem>
  </div>
);

export const signedInStoreMainDrawerListItems = handleSignOut => (
  <div>
    <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <Link to="/">Home</Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MyStoresIcon />
      </ListItemIcon>
      <Link to="/myStores">My Stores</Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <MyProductsIcon />
      </ListItemIcon>
      <Link to="/myProducts">My Products</Link>
    </ListItem>
    <ListItem button onClick={handleSignOut}>
      <ListItemIcon>
        <SignOutIcon />
      </ListItemIcon>
      <ListItemText primary="Sign Out" />
    </ListItem>
  </div>
);
