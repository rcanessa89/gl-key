import { IStore } from '@interfaces';
import {
  applyMiddleware,
  combineReducers,
  compose,
  createStore,
  Middleware,
  Reducer,
  Store
} from 'redux';
import { createLogger } from 'redux-logger';
import { combineEpics, createEpicMiddleware, EpicMiddleware } from 'redux-observable';
import rootEpic from '../rootEpics';
import rootReducer from '../rootReducers';

declare const window: any;

export default (): Store<IStore> => {
  const epicMiddleware: EpicMiddleware<any> = createEpicMiddleware();
  const reducers: Reducer = combineReducers(rootReducer);
  const logger: Middleware = createLogger({ collapsed: true });
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store: Store = createStore(
    reducers,
    {},
    composeEnhancers(applyMiddleware(epicMiddleware, logger))
  );

  epicMiddleware.run(combineEpics(...rootEpic));

  if ((module as any).hot) {
    (module as any).hot.accept('../rootReducers', () => {
      store.replaceReducer(combineReducers(rootReducer));
    });
  }

  return store;
};
