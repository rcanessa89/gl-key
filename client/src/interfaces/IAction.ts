import { Action } from 'redux';

export default interface IAction<P = any> extends Action {
  payload: P;
};
