import { IStore } from '@interfaces';
import {
  applyMiddleware,
  combineReducers,
  createStore,
  Reducer,
  Store
} from 'redux';
import {
  combineEpics,
  createEpicMiddleware,
  EpicMiddleware
} from 'redux-observable';
import rootEpic from '../rootEpics';
import rootReducer from '../rootReducers';

export default (): Store<IStore> => {
  const epicMiddleware: EpicMiddleware<any> = createEpicMiddleware();
  const reducers: Reducer = combineReducers(rootReducer);
  const store: Store = createStore(
    reducers,
    applyMiddleware(epicMiddleware),
  );

  epicMiddleware.run(combineEpics(...rootEpic));

  return store;
};
