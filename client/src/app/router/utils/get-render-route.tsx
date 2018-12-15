import { IRouteOptsProps } from '@interfaces';
import { paths } from '@router';
import * as React from 'react';
import { Redirect, RouteProps } from 'react-router';
import isNotFound from './is-not-found';

export interface IGetRenderRoute {
  Component: any;
  nested: Array<React.ReactElement<any>> | undefined;
  props: Partial<IRouteOptsProps>;
  isPublic: boolean;
}

export default (opts: IGetRenderRoute) => (renderProps: RouteProps) => {
  if (isNotFound(opts.props as IRouteOptsProps, renderProps)) {
    return <Redirect to={paths.noMatch} />;
  }

  const redirectPath = opts.isPublic ? paths.publicRouteRedirect : paths.protectedRouteRedirect;

  if (opts.props.isAuthorized === opts.isPublic) {
    return <Redirect to={redirectPath} />;
  }

  const nested = opts.nested || null;

  return (
    <opts.Component
      {...renderProps}
      {...opts.props}
      nested={nested}
      public={opts.isPublic}
    />
  );
};
