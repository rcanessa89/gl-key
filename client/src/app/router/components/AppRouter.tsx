import AuthContainer from '@containers/auth/AuthContainer';
import { IAuthContainerChildProps } from '@containers/auth/interfaces';
import FetchContainer from '@containers/fetch/FetchContainer';
import { IFetchContainerChildProps } from '@containers/fetch/interfaces';
import { IRouterContainerChildProps, IRouteState } from '@containers/router/interfaces';
import RouterContainer from '@containers/router/RouterContainer';
import { IAppRoute, IRouteComponentProps } from '@interfaces';
import { history, paths, routes } from '@router';
import { CreateAsyncComponent, guid } from '@utils';
import { UnregisterCallback } from 'history';
import * as React from 'react';
import { ReactElement } from 'react';
import { Route, RouteProps, Router, Switch } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

interface IAppRouteProps extends RouteProps {
  isAuthorized: boolean;
};

type AppRouterProps = IAuthContainerChildProps & IFetchContainerChildProps & IRouterContainerChildProps;

export class AppRouter extends React.Component<any> {
  private unlisten = this.historyListener();
  private plainRoutes: IRouteComponentProps[] = [];

  public componentDidMount(): void {
    this.setInitialRouteState();
  }

  public componentWillUnmount(): void {
    this.unlisten();
  }

  public shouldComponentUpdate(nextProps: AppRouterProps): boolean {
    return this.props.auth.isAuthorized !== nextProps.auth.isAuthorized;
  }

  public render(): React.ReactNode {
    const routerRoutes = this.buildRouterRoutes(this.props.auth.isAuthorized, routes);

    return (
      <Router history={history}>
        <Switch>
          {routerRoutes}
          <Route component={CreateAsyncComponent(() => import('@pages/NotFound'))} />
          <Route
            component={CreateAsyncComponent(() => import('@pages/NotFound'))}
            path={paths.noMatch}
          />
        </Switch>
      </Router>
    );
  }

  // Return a unique route element
  private buildRoute(isAuthorized: boolean, route: IRouteComponentProps): ReactElement<IAppRouteProps> {
    this.plainRoutes.push(route);

    const key = guid();

    if (route.public) {
      return (
        <PublicRoute
          key={key}
          isAuthorized={isAuthorized}
          component={route.component}
          {...route}
        />
      );
    }

    return (
      <ProtectedRoute
        key={key}
        isAuthorized={isAuthorized}
        component={route.component}
        {...route}
      />
    );
  }

  // Return an array of route elements with nested routes
  private buildRouterRoutes(isAuthorized: boolean, routesArray: IAppRoute[]): Array<ReactElement<IAppRouteProps>> {
    return routesArray.map((route: any) => {
      if (route.nested) {
        route = {
          ...route,
          nested: this.buildRouterRoutes(isAuthorized, route.nested),
        };
      }

      return this.buildRoute(isAuthorized, route);
    });
  }

  private dispatchRouteChange(current: IRouteState, from?: IRouteState | null): void {
    const fromValue: IRouteState | null = from || null;

    this.props.routerSetState({
      current,
      from: fromValue,
    });
  }

  private historyListener(): UnregisterCallback {
    return history.listen((location, action) => {
      if (this.props.fetch.loading) {
        this.props.fetchDataCancel()
      }

      const fromRouterState = this.props.router.current;
      const currentRouterState: IRouteState = { location, action };

      this.setDocumentTitle(location.pathname);
      this.dispatchRouteChange(currentRouterState, fromRouterState);
    });
  }

  private setInitialRouteState(): void {
    const initialState: IRouteState = {
      action: history.action,
      location: history.location,
    };

    this.setDocumentTitle(history.location.pathname);
    this.dispatchRouteChange(initialState);
  }

  private setDocumentTitle(path: string): void {
    const filteredRoutes = routes.filter(route => route.path === path);
    const hasTitle = filteredRoutes.length && filteredRoutes[0].title;

    if (hasTitle) {
      document.title = filteredRoutes[0].title as string;
    } else {
      document.title = '';
    }
  }
}

export default FetchContainer(RouterContainer(AuthContainer(AppRouter)));
