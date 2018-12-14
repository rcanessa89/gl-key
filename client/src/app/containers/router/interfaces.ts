import { Action, Location } from 'history';
import { ROUTER_SET_STATE } from './types';

export interface IRouteState {
  action: Action;
  location: Location;
};

export interface IRouterState {
  from: IRouteState | null;
  current: IRouteState | null;
};

export interface IRouterSetState {
  type: ROUTER_SET_STATE;
  payload: IRouterState;
};

export interface IState {
  current: IRouteState | null;
  from: IRouteState | null;
};

export interface IRouterContainerChildProps {
  router: IRouterState,
  routerSetState: (payload: IRouterState) => undefined,
}
