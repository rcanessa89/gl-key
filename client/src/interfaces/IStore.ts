import { IAuthState } from '@containers/auth/interfaces';
import { IFetchState } from '@containers/fetch/interfaces';
import { IRouterState } from '@containers/router/interfaces';

export default interface IStore {
  auth: IAuthState;
  fetch: IFetchState;
  router: IRouterState;
};
