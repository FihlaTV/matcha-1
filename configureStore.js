import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import rootReducer from 'app/rootReducers';
import rootSaga from 'app/sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware, logger];
const enhancer = composeWithDevTools({
  // Options: https://github.com/jhen0409/react-native-debugger#options
})(applyMiddleware(...middlewares));

// WHITELIST
const persistConfig = {
  blacklist: [], // useless now
  key: 'root',
  storage,
  whitelist: ['user'], // only navigation will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

function configureStore(initialState) {
  const store = createStore(persistedReducer, initialState, enhancer);
  if (module.hot) {
    module.hot.accept(() => {
      const nextRootReducer = require('./app/rootReducers').default; // eslint-disable-line
      store.replaceReducer(persistReducer(persistConfig, nextRootReducer));
    });
  }
  return store;
}

export const store = configureStore();
export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
