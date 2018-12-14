import { IAction } from '@interfaces';
import { createReducer } from '@utils';
import { IAuthState, IUser } from './interfaces';
import {
  AUTH_OFF,
  AUTH_REQUEST_FAILED,
  AUTH_REQUEST_SUCCESS
} from './types';

const initialState: IAuthState = {
  isAuthorized: false,
  message: '',
  user: null,
};

export default createReducer<IAuthState>(initialState, {
  [AUTH_REQUEST_SUCCESS](state, action: IAction<IUser>) {
    return {
      isAuthorized: true,
      message: 'Authentication success',
      user: action.payload,
    };
  },
  [AUTH_REQUEST_FAILED](state, action: IAction<string>) {
    return {
      isAuthorized: false,
      message: action.payload,
      user: null,
    };
  },
  [AUTH_OFF]() {
    return initialState;
  },
});
