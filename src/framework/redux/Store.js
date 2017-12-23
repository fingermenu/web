// @flow

import {
  watchGetCurrentUser,
  watchSignUpWithUsernameAndPassword,
  watchSignInWithUsernameAndPassword,
  watchSignOut,
} from '@microbusiness/parse-server-common-web';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import getReducers from './Reducers';

const rootSagas = function* sagas() {
  yield [watchGetCurrentUser(), watchSignUpWithUsernameAndPassword(), watchSignInWithUsernameAndPassword(), watchSignOut()];
};

const configureStore = initialState => {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);
  const store = createStore(getReducers(), initialState, middleware);

  sagaMiddleware.run(rootSagas);

  return store;
};

const reduxStore = configureStore();

export default reduxStore;
