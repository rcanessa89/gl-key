import authReducer from '@containers/auth/reducer';
import fetchReducer from '@containers/fetch/reducer';
import routerReducer from '@containers/router/reducer';

export default {
  auth: authReducer,
  fetch: fetchReducer,
  router: routerReducer,
};
