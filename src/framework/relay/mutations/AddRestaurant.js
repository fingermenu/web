// @flow

import { MessageType } from '@microbusiness/common-react';
import * as messageBarActions from '@microbusiness/common-react/dist/messageBar/Actions';
import cuid from 'cuid';
import { commitMutation, graphql } from 'react-relay';
import { ConnectionHandler } from 'relay-runtime';
import { reduxStore } from '../../redux';

const mutation = graphql`
  mutation AddRestaurantMutation($input: AddRestaurantInput!) {
    addRestaurant(input: $input) {
      errorMessage
      restaurant {
        __typename
        cursor
        node {
          id
          name
          address
        }
      }
    }
  }
`;

const sharedUpdater = (restaurant, userId, restaurantItemsEdge) => {
  const userProxy = restaurant.get(userId);
  const connection = ConnectionHandler.getConnection(userProxy, 'User_ownedRestaurants');

  if (!connection) {
    return;
  }

  ConnectionHandler.insertEdgeAfter(connection, restaurantItemsEdge);
};

const commit = (environment, userId, name, address) => {
  return commitMutation(environment, {
    mutation,
    variables: {
      input: {
        name,
        address,
      },
    },
    updater: restaurant => {
      const payload = restaurant.getRootField('addRestaurant');
      const errorMessage = payload.getValue('errorMessage');

      if (errorMessage) {
        reduxStore.dispatch(messageBarActions.add(errorMessage, MessageType.ERROR));
      } else {
        const restaurantEdge = payload.getLinkedRecord('restaurant');

        /* sharedUpdater(restaurant, userId, restaurantEdge);*/
      }
    },
    optimisticUpdater: restaurant => {
      const id = cuid();
      const node = restaurant.create(id, 'item');

      node.setValue(true, 'savingInProgress');
      node.setValue(id, 'id');
      node.setValue(name, 'name');
      node.setValue(name, 'address');

      const restaurantEdge = restaurant.create(cuid(), 'RestaurantEdge');

      restaurantEdge.setLinkedRecord(node, 'node');
      /* sharedUpdater(restaurant, userId, restaurantEdge);*/
    },
  });
};

export default {
  commit,
};
