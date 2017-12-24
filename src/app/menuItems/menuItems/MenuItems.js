// @flow

import React from 'react';
import { environment } from '../../../framework/relay';
import { graphql, QueryRenderer } from 'react-relay';
import Loading from '../../../sharedComponents/loading';
import MenuItemsRelayContainer from './MenuItemsRelayContainer';

const MenuItems = () => (
  <QueryRenderer
    environment={environment}
    query={graphql`
      query MenuItemsQuery($count: Int!, $cursor: String) {
        user {
          ...MenuItemsRelayContainer_user
        }
      }
    `}
    variables={{
      cursor: null,
      count: 30,
    }}
    render={({ error, props, retry }) => {
      if (error) {
        console.log(error);
        return <div />;
      }

      if (props) {
        return <MenuItemsRelayContainer user={props.user} />;
      }

      return <Loading />;
    }}
  />
);

export default MenuItems;
