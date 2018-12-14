import { IAction} from '@interfaces';
import { createReducer } from '@utils';
import { IRouterState, IState } from './interfaces';
import { ROUTER_SET_STATE } from './types';

const initialState: IRouterState = {
  current: null,
  from: null,
};

export default createReducer<IState>(initialState, {
  [ROUTER_SET_STATE](state, action: IAction<IRouterState>) {
    return action.payload;
  },
});
