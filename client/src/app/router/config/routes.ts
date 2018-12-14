import { IAppRoute } from '@interfaces';
import { CreateAsyncComponent } from '@utils';
import paths from './paths';

const login: IAppRoute = {
  component: CreateAsyncComponent(() => import('@pages/Login')),
  exact: true,
  path: paths.login,
  public: true,
  title: 'Login',
};

const main: IAppRoute = {
  component: CreateAsyncComponent(() => import('@pages/Main')),
  path: paths.main,
}

const routes: IAppRoute[] = [
  login,
  main,
];

export default routes;
