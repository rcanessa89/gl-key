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
      public: true,
      title: 'Entries',
    },
    {
      component: createAsyncComponent(() => import('@pages/Assets')),
      exact: true,
      path: paths.assests,
      public: true,
      title: 'Assets',
    },
    {
      component: createAsyncComponent(() => import('@pages/Exports')),
      exact: true,
      path: paths.exports,
      public: true,
      title: 'Exports',
    },
  ],
  path: paths.main,
  public: true,
};

const routes: IAppRoute[] = [
  login,
  main,
];

export default routes;
