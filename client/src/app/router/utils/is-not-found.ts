import { IRouteComponentProps } from '@interfaces';
import { matchPath, RouteProps } from 'react-router';

export default (props: IRouteComponentProps, renderProps: RouteProps): boolean => {
  const matchResult = matchPath(
    renderProps.location!.pathname,
    {
      exact: !!props.exact,
      path: props.path,
    }
  );

  if (props.abstract && matchResult!.isExact) {
    return true;
  } else if (
    props.abstract &&
    !matchResult!.isExact &&
    Array.isArray(props.nested) &&
    props.nested.length
  ) {
    const nestedMatches = props.nested.filter(route => {
      const nestedPathMatch = matchPath(
        renderProps.location!.pathname,
        {
          exact: !!route.props.exact,
          path: route.props.path,
        }
      );

      return nestedPathMatch !== null;
    });

    if (!nestedMatches.length) {
      return true;
    }
  }

  return false;
};
