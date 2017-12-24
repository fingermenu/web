// @flow

import { createPaginationContainer, graphql } from 'react-relay';
import MenuItemsContainer from './MenuItemsContainer';

export default createPaginationContainer(
  MenuItemsContainer,
  {
    user: graphql`
      fragment MenuItemsRelayContainer_user on User {
        id
        menuItems(first: $count, after: $cursor) @connection(key: "User_menuItems") {
          pageInfo {
            hasNextPage
            endCursor
          }
          edges {
            node {
              id
              name
            }
          }
        }
      }
    `,
  },
  {
    direction: 'forward',
    getConnectionFromProps(props) {
      return props.user && props.user.ownedMenuItems;
    },
    getFragmentVariables(prevVars, totalCount) {
      return {
        ...prevVars,
        count: totalCount,
      };
    },
    getVariables(props, { count, cursor }, fragmentVariables) {
      return {
        count,
        cursor,
      };
    },
    variables: {
      cursor: null,
    },
    query: graphql`
      query MenuItemsRelayContainerPaginationQuery($count: Int!, $cursor: String) {
        user {
          ...MenuItemsRelayContainer_user
        }
      }
    `,
  },
);
