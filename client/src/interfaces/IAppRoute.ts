import { RouteProps } from 'react-router-dom';

export default interface IAppRoute extends RouteProps {
  abstract?: boolean;
  public?: boolean;
  nested?: IAppRoute[];
  title?: string;
};
