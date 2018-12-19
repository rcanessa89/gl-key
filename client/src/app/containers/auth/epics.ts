import { CHALLENGES } from '@constants';
import { history, paths } from '@router';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { Auth } from 'aws-amplify';
import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { catchError, delay, filter, finalize, map, mergeMap } from 'rxjs/operators';
import { authOff, authRequestFailed, authRequestSuccess } from './actions';
import { IAuthRequest } from './interfaces';
import { AUTH_CURRENT_SESSION, AUTH_LOG_OUT, AUTH_REQUEST } from './types';

const authLogInEpic: Epic = (action$, state$) => action$.pipe(
  filter((action: IAuthRequest) => (
    action.type === AUTH_REQUEST || action.type === AUTH_CURRENT_SESSION
  )),
  mergeMap((action: IAuthRequest) => {
    const authPromise: Promise<any> = action.type === AUTH_REQUEST ? (
      Auth.signIn(action.payload.email, action.payload.password)
    ) : Auth.currentAuthenticatedUser();

    return from(authPromise)
      .pipe(
        delay(1000),
        mergeMap((cognitoUser: CognitoUser) => {
          return of(authRequestSuccess(cognitoUser))
            .pipe(
              finalize(() => {
                const { challengeName } = cognitoUser as any;

                if (challengeName === CHALLENGES.NEW_PASSWORD_REQUIRED) {
                  history.push(paths.passwordChallenge);
                }
              })
            );
        }),
        catchError((error: ErrorEvent) => of(authRequestFailed(error.message)))
      );
  })
);

const authLogOutEpic: Epic = (action$, state$) => action$.pipe(
  ofType(AUTH_LOG_OUT),
  mergeMap((action: IAuthRequest) => {
    return from(Auth.signOut())
      .pipe(
        map(() => authOff()),
        catchError((error: ErrorEvent) => of(authRequestFailed(error.message)))
      );
  })
);

export default [
  authLogInEpic,
  authLogOutEpic
];
