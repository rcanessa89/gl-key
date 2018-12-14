import { InjectedFormikProps } from 'formik';
import * as React from 'react';
import './login.css';
import { IFormValues, LoginFormikProps } from './LoginFormik';

const Login: React.SFC<InjectedFormikProps<LoginFormikProps, IFormValues>> = ({
  errors,
  handleChange,
  handleSubmit,
  touched,
  ...props
}) => {
  return <div className="login">Login</div>;
};

export default Login;
