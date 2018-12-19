import { CognitoUser } from 'amazon-cognito-identity-js';
import {
  AUTH_CURRENT_SESSION,
  AUTH_LOG_OUT,
  AUTH_OFF,
  AUTH_REQUEST,
  AUTH_REQUEST_FAILED,
  AUTH_REQUEST_SUCCESS
} from './types';

export interface IAuthCredentials {
  email: string;
  password: string;
};

export interface IAuthRequest {
  type: AUTH_REQUEST,
  payload: IAuthCredentials,
}

export interface IAuthRequestSuccess {
  type: AUTH_REQUEST_SUCCESS;
  payload: CognitoUser;
};

export interface IAuthRequestFailed {
  type: AUTH_REQUEST_FAILED;
  payload: string;
};

export interface IAuthCurrentSession {
  type: AUTH_CURRENT_SESSION;
}

export interface IAuthLogOut {
  type: AUTH_LOG_OUT;
};

export interface IAuthOff {
  type: AUTH_OFF;
};

export interface IAuthState {
  isAuthorized: boolean;
  message: string;
  user: CognitoUser | null;
  onRequest: boolean;
}

export interface IAuthContainerChildProps {
  auth: IAuthState,
  login: (payload: IAuthCredentials) => IAuthRequest;
  logout: () => IAuthOff;
  currentSession: any;
}
