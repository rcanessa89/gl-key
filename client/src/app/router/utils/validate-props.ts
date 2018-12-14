import { IRouteComponentProps } from "@interfaces";

export default (props: Partial<IRouteComponentProps>) => {
  if (props.abstract && props.exact) {
    console.error('An abstract route can\'t be exact');
  }
};
