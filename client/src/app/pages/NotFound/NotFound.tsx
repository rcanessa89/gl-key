import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

/**
 * NotFound component is to handle the "not found / 404" exceptions
 */
const NotFound: React.SFC<RouteComponentProps<any>> = ({
  location
}) => (<div>{location.pathname} Not Found</div>)

export default NotFound;
