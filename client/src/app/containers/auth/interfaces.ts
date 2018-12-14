import { IFetchDataPayload } from '../fetch/interfaces';
import {
  AUTH_OFF,
  AUTH_REQUEST_FAILED,
  AUTH_REQUEST_SUCCESS
} from './types';

export interface IAuthCredentials {
  email: string;
  password: string;
};

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface IAuthRequestSuccess {
  type: AUTH_REQUEST_SUCCESS;
  payload: IUser;
};

export interface IAuthRequestFailed {
  type: AUTH_REQUEST_FAILED;
  payload: string;
};

export interface IAuthOff {
  type: AUTH_OFF;
};

export interface IAuthState {
  readonly isAuthorized: boolean;
  readonly message: string;
  readonly user: IUser | null;
}

export interface IAuthLoginPayload {
  email: string;
  password: string;
}

export interface IAuthContainerProps {
  fetchData: (payload: IFetchDataPayload) => undefined;
}

export interface IAuthContainerChildProps extends IAuthContainerProps {
  auth: IAuthState,
  login: (payload: IAuthLoginPayload) => undefined;
  logout: () => undefined;
}
