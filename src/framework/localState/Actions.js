// @flow

import ActionTypes from './ActionTypes';

export function myStoresSortOptionChanged(payload) {
  return {
    type: ActionTypes.LOCAL_STATE_MY_STORES_SORT_OPTION_CHANGED,
    payload,
  };
}

export function myProductsSortOptionChanged(payload) {
  return {
    type: ActionTypes.LOCAL_STATE_MY_PRODUCTS_SORT_OPTION_CHANGED,
    payload,
  };
}
