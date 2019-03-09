import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from '../rootReducer';

const isDevelopment = process.env.NODE_ENV === 'development';
export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware];
  if (isDevelopment) {
    middlewares.push(loggerMiddleware);
  }
  const middlewareEnhancer = applyMiddleware(...middlewares);
  const enchancers = [middlewareEnhancer];
  const composedEnchancers = isDevelopment
    ? composeWithDevTools(...enchancers)
    : compose(...enchancers);

  const store = createStore(rootReducer, preloadedState, composedEnchancers);

  // if (isDevelopment && module.hot) {
  //   module.hot.accept('../rootReducer', () =>
  //     store.replaceReducer(rootReducer)
  //   );
  // }

  return store;
}
