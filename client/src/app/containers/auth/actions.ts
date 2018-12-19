import { actionCreator } from '@utils';
import { CognitoUser } from 'amazon-cognito-identity-js';
import {
  IAuthCredentials,
  IAuthCurrentSession,
  IAuthLogOut,
  IAuthOff,
  IAuthRequest,
  IAuthRequestFailed,
  IAuthRequestSuccess,
} from './interfaces';
import {
  AUTH_CURRENT_SESSION,
  AUTH_LOG_OUT,
  AUTH_OFF,
  AUTH_REQUEST,
  AUTH_REQUEST_FAILED,
  AUTH_REQUEST_SUCCESS
} from './types';

export type AuthAction = (
  IAuthRequestSuccess |
  IAuthRequestFailed |
  IAuthCurrentSession |
  IAuthOff |
  IAuthRequest |
  IAuthLogOut
);

export const authRequest = actionCreator<IAuthRequest, IAuthCredentials>(AUTH_REQUEST);
export const authRequestSuccess = actionCreator<IAuthRequestSuccess, CognitoUser>(AUTH_REQUEST_SUCCESS);
export const authRequestFailed = actionCreator<IAuthRequestFailed, string>(AUTH_REQUEST_FAILED);
export const authCurrentSession = actionCreator<IAuthCurrentSession>(AUTH_CURRENT_SESSION);
export const authLogOut = actionCreator<IAuthLogOut>(AUTH_LOG_OUT);
export const authOff = actionCreator<IAuthOff>(AUTH_OFF);

export default {
  authLogOut,
  authOff,
  authRequest,
  authRequestFailed,
  authRequestSuccess,
};
