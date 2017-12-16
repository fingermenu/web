// @flow

import ActionTypes from './ActionTypes';
import initialState from './InitialState';

export default (state = initialState, action) => {
  switch (action.type) {
  case ActionTypes.LOCAL_STATE_MY_STORES_SORT_OPTION_CHANGED:
    return state.set('myStoresSortOption', action.payload.get('sortOption'));

  case ActionTypes.LOCAL_STATE_MY_PRODUCTS_SORT_OPTION_CHANGED:
    return state.set('myProductsSortOption', action.payload.get('sortOption'));

  default:
    return state;
  }
};
