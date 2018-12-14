import { IStore } from '@interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RouteAction, routerSetState } from './actions';
import { IRouterState } from './interfaces';

const mapStateToProps = ({ router }: IStore) => ({ router });

const mapDispatchToProps = (dispatch: Dispatch<RouteAction>) => ({
  routerSetState: (payload: IRouterState) => dispatch(routerSetState(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps);
