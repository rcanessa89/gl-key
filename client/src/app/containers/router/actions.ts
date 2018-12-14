import { actionCreator } from '@utils';
import { IRouterSetState, IRouterState } from './interfaces';
import { ROUTER_SET_STATE } from './types';

export type RouteAction = IRouterSetState;

export const routerSetState = actionCreator<IRouterSetState, IRouterState>(ROUTER_SET_STATE);
