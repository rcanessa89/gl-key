import AuthContainer from '@containers/auth/AuthContainer';
import Login from './Login';
import LoginFormik from './LoginFormik';

export default AuthContainer(LoginFormik(Login));
