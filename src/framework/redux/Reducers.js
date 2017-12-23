// @flow

import { UserAccessReducer } from '@microbusiness/common-react';
import { AppUpdaterReducer, MessageBarReducer } from '@microbusiness/common-react';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
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
