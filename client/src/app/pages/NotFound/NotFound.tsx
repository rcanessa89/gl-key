import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const NotFound: React.SFC<RouteComponentProps<any>> = ({
  location
}) => (<div>{location.pathname} Not Found</div>)

export default NotFound;
