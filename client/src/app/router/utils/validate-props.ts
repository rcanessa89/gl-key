import { IRouteOptsProps } from "@interfaces";

export default (props: Partial<IRouteOptsProps>) => {
  if (props.abstract && props.exact) {
    console.error('An abstract route can\'t be exact');
  }
};
