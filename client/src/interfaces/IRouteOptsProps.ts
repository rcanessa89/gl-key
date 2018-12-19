export default interface IRouteOptsProps {
  abstract?: boolean;
  public?: boolean;
  title?: string;
  component: any;
  isAuthorized: boolean;
  nested?: Array<React.ReactElement<any>>;
  path: string;
  exact?: boolean;
  challengeName?: string;
}
