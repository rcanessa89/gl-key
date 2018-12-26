import { IAppRoute } from '@interfaces';
import { createAsyncComponent } from '@utils';
import paths from './paths';

const login: IAppRoute = {
  component: createAsyncComponent(() => import('@pages/Login')),
  exact: true,
  path: paths.login,
  public: true,
  title: 'Login',
};

const main: IAppRoute = {
  component: createAsyncComponent(() => import('@pages/Main')),
  nested: [
    {
      component: createAsyncComponent(() => import('@pages/Entries')),
      exact: true,
      path: paths.entries,
      title: 'Entries',
    },
    {
      component: createAsyncComponent(() => import('@pages/Assets')),
      exact: true,
      path: paths.assests,
      title: 'Assets',
    },
    {
      component: createAsyncComponent(() => import('@pages/Exports')),
      exact: true,
      path: paths.exports,
      title: 'Exports',
    },
    {
      component: createAsyncComponent(() => import('@pages/PasswordChallenge')),
      exact: true,
      path: paths.passwordChallenge,
      title: 'Change your password',
    }
  ],
  path: paths.main,
};

const routes: IAppRoute[] = [
  login,
  main,
];

export default routes;
