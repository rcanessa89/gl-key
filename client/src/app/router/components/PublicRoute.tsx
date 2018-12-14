import { IRouteComponentProps } from '@interfaces';
import * as React from 'react';
import { SFC } from 'react';
import { Route } from 'react-router-dom';
import { getRenderRoute, validateProps } from '../utils';

const PublicRoute: SFC<IRouteComponentProps> = ({
  component,
  nested,
  ...props
}) => {
  validateProps(props);

  const renderComponent: SFC<any> = getRenderRoute({
    Component: component,
    isPublic: true,
    nested,
    props,
  });

  return (
    <Route
      {...props}
      render={renderComponent}
    />
  );
};

export default PublicRoute;
