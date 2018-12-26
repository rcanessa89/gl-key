import loaderBackImg from '@assets/img/gorilla-black-back.png';
import { DOCUMENT_TITLE_PREFIX } from '@constants';
import AuthContainer from '@containers/auth/AuthContainer';
import { IAuthContainerChildProps } from '@containers/auth/interfaces';
import FetchContainer from '@containers/fetch/FetchContainer';
import { IFetchContainerChildProps } from '@containers/fetch/interfaces';
import { IRouterContainerChildProps, IRouteState } from '@containers/router/interfaces';
import RouterContainer from '@containers/router/RouterContainer';
import { IAppRoute, IRouteOptsProps } from '@interfaces';
import { history, paths, routes } from '@router';
import { createAsyncComponent, guid } from '@utils';
import classnames from 'classnames';
import { UnregisterCallback } from 'history';
import * as React from 'react';
import { ReactElement } from 'react';
import { Route, RouteProps, Router, Switch } from 'react-router-dom';
import { getPlainRoutes } from '../utils';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

interface IAppRouteProps extends RouteProps {
  isAuthorized: boolean;
};

type AppRouterProps = (
  IAuthContainerChildProps &
  IFetchContainerChildProps &
  IRouterContainerChildProps &
  any
);

const loaderStyles = {
  backgroundImage: `url(${loaderBackImg})`,
  backgroundPosition: 'bottom right',
  backgroundRepeat: 'no-repeat',
};

export class AppRouter extends React.Component<AppRouterProps> {
  private unlisten = this.historyListener();
  private plainRoutes: IRouteOptsProps[] = [];

  public componentDidMount(): void {
    this.setInitialRouteState();
    this.props.currentSession();
  }

  public componentWillUnmount(): void {
    this.unlisten();
  }

  public shouldComponentUpdate(nextProps: AppRouterProps): boolean {
    return (
      this.props.auth.isAuthorized !== nextProps.auth.isAuthorized ||
      this.props.auth.onRequest !== nextProps.auth.onRequest
    );
  }

  public render(): React.ReactNode {
    const routerRoutes = this.buildRouterRoutes(this.props.auth.isAuthorized, routes);
    const routerEl = this.props.auth.sessionRequested ? (
      <Router history={history}>
        <Switch>
          {routerRoutes}
          <Route component={createAsyncComponent(() => import('@pages/NotFound'))} />
          <Route
            component={createAsyncComponent(() => import('@pages/NotFound'))}
            path={paths.noMatch}
          />
        </Switch>
      </Router>
    ) : null;

    return (
      <React.Fragment>
        {routerEl}
        <div
          className={classnames({
            'is-active': this.props.auth.onRequest,
            pageloader: true,
          })}
          style={loaderStyles}
        >
          <span className="title">Loading...</span>
        </div>
      </React.Fragment>
    );
  }

  // Return a unique route element
  private buildRoute(isAuthorized: boolean, route: IRouteOptsProps): ReactElement<IAppRouteProps> {
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
    const plainRoutes = getPlainRoutes();
    const filteredRoutes = plainRoutes.filter(route => route.path === path);
    const hasTitle = filteredRoutes.length && filteredRoutes[filteredRoutes.length - 1].title;

    if (hasTitle) {
      const title = filteredRoutes[filteredRoutes.length - 1].title;
      const fullTitle = `${DOCUMENT_TITLE_PREFIX} - ${title}`;

      document.title = fullTitle;
    } else {
      document.title = DOCUMENT_TITLE_PREFIX;
    }
  }
}

export default FetchContainer(RouterContainer(AuthContainer(AppRouter)));
