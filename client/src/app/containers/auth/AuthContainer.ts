import { IStore } from '@interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AuthAction,
  authCurrentSession,
  authLogOut,
  authRequest,
} from './actions';
import { IAuthCredentials } from './interfaces';

const mapStateToProps = ({ auth }: IStore) => ({ auth });

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>) => ({
  currentSession: () => dispatch(authCurrentSession()),
  login: (payload: IAuthCredentials) => dispatch(authRequest(payload)),
  logout: () => dispatch(authLogOut()),
});

export default connect(mapStateToProps, mapDispatchToProps);
