// @flow

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { UserAccessReducer } from 'micro-business-common-react';
import { AppUpdaterReducer, MessageBarReducer } from 'micro-business-common-react';
import { LocalStateReducer } from '../localState';

export default function getReducers() {
  return combineReducers({
    form: formReducer,
    userAccess: UserAccessReducer,
    appUpdater: AppUpdaterReducer,
    messageBar: MessageBarReducer,
    localState: LocalStateReducer,
  });
}
