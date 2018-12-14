import { IStore } from '@interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  AuthAction,
  authOff,
  authRequestFailed,
  authRequestSuccess,
} from './actions';
import { IAuthContainerProps, IAuthCredentials } from './interfaces';

const mapStateToProps = ({ auth }: IStore) => ({ auth });

const mapDispatchToProps = (dispatch: Dispatch<AuthAction>, props: IAuthContainerProps) => ({
  login: (payload: IAuthCredentials) => props.fetchData({
    failed: authRequestFailed,
    options: {
      body: payload,
      method: 'POST',
      url: '/login',
    },
    success: authRequestSuccess,
  }),
  logout: () => dispatch(authOff()),
});

export default connect(mapStateToProps, mapDispatchToProps);
