import { InjectedFormikProps } from 'formik';
import * as React from 'react';
import glImg from '../../../assets/img/gorillalogic.jpg';
import './login.css';
import { IFormValues, LoginFormikProps } from './LoginFormik';

const Login: React.SFC<InjectedFormikProps<LoginFormikProps, IFormValues>> = ({
  errors,
  handleChange,
  handleSubmit,
  touched,
  ...props
}) => {
  return (
    <div className="login">
      <div className="login__form-wrapper box">
        <img
          className="login__logo"
          src={glImg}
          alt="Gorilla logic"
        />
        <form className="login__form">
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Email"
              />
            </div>
          </div>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="password"
                placeholder="Password"
              />
            </div>
          </div>
          <div className="login__bottom">
            <button
              type="submit"
              className="button is-primary is-fullwidth"
            >Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
