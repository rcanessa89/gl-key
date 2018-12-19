export const AUTH_REQUEST: string = 'AUTH_REQUEST';
export type AUTH_REQUEST = typeof AUTH_REQUEST;

export const AUTH_REQUEST_SUCCESS: string = 'AUTH_REQUEST_SUCCESS';
export type AUTH_REQUEST_SUCCESS = typeof AUTH_REQUEST_SUCCESS;

export const AUTH_REQUEST_FAILED: string = 'AUTH_REQUEST_FAILED';
export type AUTH_REQUEST_FAILED = typeof AUTH_REQUEST_FAILED;

export const AUTH_CURRENT_SESSION: string = 'AUTH_CURRENT_SESSION';
export type AUTH_CURRENT_SESSION = typeof AUTH_CURRENT_SESSION;

export const AUTH_LOG_OUT: string = 'AUTH_LOG_OUT';
export type AUTH_LOG_OUT = typeof AUTH_LOG_OUT;

export const AUTH_OFF: string = 'AUTH_OFF';
export type AUTH_OFF = typeof AUTH_OFF;

export default {
  AUTH_CURRENT_SESSION,
  AUTH_LOG_OUT,
  AUTH_OFF,
  AUTH_REQUEST,
  AUTH_REQUEST_FAILED,
  AUTH_REQUEST_SUCCESS,
};
