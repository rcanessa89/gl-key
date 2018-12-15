import { RouteComponentProps } from 'react-router';

export default interface IRouteComponentProps extends RouteComponentProps {
  abstract?: boolean;
  public: boolean;
  title?: string;
  isAuthorized: boolean;
  nested?: Array<React.ReactElement<any>> | null;
  path: string;
  exact?: boolean;
}
