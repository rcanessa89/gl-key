import { actionCreator } from '@utils';
import {
  IAuthOff,
  IAuthRequestFailed,
  IAuthRequestSuccess,
  IUser
} from './interfaces';
import {
  AUTH_OFF,
  AUTH_REQUEST_FAILED,
  AUTH_REQUEST_SUCCESS
} from './types';

export type AuthAction = IAuthRequestSuccess | IAuthRequestFailed | IAuthOff;

export const authRequestSuccess = actionCreator<IAuthRequestSuccess, IUser>(AUTH_REQUEST_SUCCESS);
export const authRequestFailed = actionCreator<IAuthRequestFailed, string>(AUTH_REQUEST_FAILED);
export const authOff = actionCreator<IAuthOff>(AUTH_OFF);

export default {
  authOff,
  authRequestFailed,
  authRequestSuccess,
};
