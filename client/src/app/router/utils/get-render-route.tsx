import { IRouteComponentProps } from '@interfaces';
import { paths } from '@router';
import * as React from 'react';
import { Redirect, RouteProps } from 'react-router';
import isNotFound from './is-not-found';

export interface IGetRenderRoute {
  Component: any;
  nested: Array<React.ReactElement<any>> | undefined;
  props: Partial<IRouteComponentProps>;
  isPublic: boolean;
}

export default (opts: IGetRenderRoute) => (renderProps: RouteProps) => {
  if (isNotFound(opts.props as IRouteComponentProps, renderProps)) {
    return <Redirect to={paths.noMatch} />;
  }

  const redirectPath = opts.isPublic ? paths.publicRouteRedirect : paths.protectedRouteRedirect;

  if (opts.props.isAuthorized === opts.isPublic) {
    return <Redirect to={redirectPath} />;
  }

  return (
    <opts.Component
      {...renderProps}
      nested={opts.nested}
    />
  );
};
