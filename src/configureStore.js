/* eslint global-require: 0 */
import { get, set } from 'lodash';
import { Platform } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist';

import reducer from './reducers';
import * as actionCreators from './actions';


export const handleVersion = store => next => action => {
  const state = store.getState();
  const version = get(state, 'nav.appVersion');
  let newAction = { ...action };
  if(action.type.startsWith('Navigation/')) {

    if (parseInt(version) === 2) {
      if (action.routeName) {
        set(newAction, 'routeName', `${action.routeName}V2`)
      } else if (action.actions && action.actions.length) {
        const routeName = get(action, 'actions.0.routeName');
        if (routeName) {
          set(newAction, 'actions.0.routeName', `${get(action, 'actions.0.routeName')}V2`)
        }
      }
    }
  }

  next(newAction);
};


let composeEnhancers = compose;
if (__DEV__) {
  // Use it if Remote debugging with RNDebugger, otherwise use remote-redux-devtools
  /* eslint-disable no-underscore-dangle */
  composeEnhancers = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||
    require('remote-redux-devtools').composeWithDevTools)({
    name: Platform.OS,
    ...require('../package.json').remotedev,
    actionCreators
  });
  /* eslint-enable no-underscore-dangle */
}

const enhancer = composeEnhancers(applyMiddleware(thunk, handleVersion));

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(require('./reducers').default);
    });
  }
  let persistor = persistStore(store);
  return { persistor, store };
}
