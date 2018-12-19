import { IAction } from '@interfaces';
import { createReducer } from '@utils';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { IAuthState } from './interfaces';
import {
  AUTH_CURRENT_SESSION,
  AUTH_OFF,
  AUTH_REQUEST,
  AUTH_REQUEST_FAILED,
  AUTH_REQUEST_SUCCESS
} from './types';

const initialState: IAuthState = {
  isAuthorized: false,
  message: '',
  onRequest: false,
  user: null,
};

export default createReducer<IAuthState>(initialState, {
  [AUTH_REQUEST](state) {
    return {
      ...state,
      onRequest: true,
    };
  },
  [AUTH_CURRENT_SESSION](state) {
    return {
      ...state,
      onRequest: true,
    };
  },
  [AUTH_REQUEST_SUCCESS](state, action: IAction<CognitoUser>) {
    return {
      isAuthorized: true,
      message: 'Authentication success',
      onRequest: false,
      user: action.payload,
    };
  },
  [AUTH_REQUEST_FAILED](state, action: IAction<string>) {
    return {
      ...state,
      isAuthorized: false,
      message: action.payload,
      onRequest: false,
      user: null,
    };
  },
  [AUTH_OFF]() {
    return initialState;
  },
});
