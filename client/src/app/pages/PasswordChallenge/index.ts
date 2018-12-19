import AuthContainer from '@containers/auth/AuthContainer';
import PasswordChallenge from './PasswordChallenge';
import PasswordChallengeFormik from './PasswordChanllengeFormik';

export default AuthContainer(PasswordChallengeFormik(PasswordChallenge));
