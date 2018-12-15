import { IRouteOptsProps } from '@interfaces';
import * as React from 'react';
import { SFC } from 'react';
import { Route } from 'react-router-dom';
import { getRenderRoute, validateProps } from '../utils';

const ProtectedRoute: SFC<IRouteOptsProps> = ({
  component,
  nested,
  ...props
}) => {
  validateProps(props);

  const renderComponent: SFC<any> = getRenderRoute({
    Component: component,
    isPublic: false,
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

export default ProtectedRoute;
