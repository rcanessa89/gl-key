import { IAction } from '@interfaces';

export interface IReducerHandlers<S> { [x: string]: (state: S, action: IAction) => S };
export type ReducerFunction<S> = (s: S, a: IAction) => S;

/**
 * This function create a redux reducer
 * @param {any} initialState redux reducer inital state
 * @param {Object} reducer handler
 * @return {Function} redux reducer
 */
export default function createReducer<S>(initialState: S, handlers: IReducerHandlers<S>): ReducerFunction<S> {
  return (state: S = initialState, action) => {
    if (handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action);
    } else {
      return state;
    }
  }
}
