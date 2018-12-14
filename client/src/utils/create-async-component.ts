import * as React from 'react';
import * as Loadable from 'react-loadable';

type loadingFunc = React.ComponentType<Loadable.LoadingComponentProps> | (() => null);

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
    const componentToRender = loaded.component.default({
      ...props,
      resolve: loaded.resolve,
    });

    return componentToRender;
  },
});

export default (
  loader: () => Promise<any>,
  loading: loadingFunc = () => null
) => Loadable({
  loader,
  loading,
});
