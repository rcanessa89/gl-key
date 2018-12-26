import * as React from 'react';
import * as Loadable from 'react-loadable';

type loadingFunc = React.ComponentType<Loadable.LoadingComponentProps> | (() => null);

/**
 * This function create Loadable Map component, it receives
 * a promise and show a "loading" when is not still resolved
 * and show a component when is already resolved
 * @param resolve promise to resolve
 * @param component component to show
 * @param loading component to show when the promises are resolving
 * @return {Loadable.Map} Loadable Map component
 */
export const createAsyncComponentMap = (
  resolve: () => Promise<any>,
  component: () => Promise<any>,
  loading: any = () => null
) => Loadable.Map({
  loader: {
    component,
    resolve,
  },
  loading,
  render(loaded, props) {
    const ComponentToRender = loaded.component.default;

    return (
      <ComponentToRender
        {...props}
        resolve={loaded.resolve}
      />
    );
  },
});

/**
 * This function return a Loadable component
 * @return {Loadable}
 */
export default (
  loader: () => Promise<any>,
  loading: loadingFunc = () => null
) => Loadable({
  loader,
  loading,
});
