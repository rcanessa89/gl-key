import { InputText } from '@share';
import classnames from 'classnames';
import { InjectedFormikProps } from 'formik';
import * as React from 'react';
import glImg from '../../../assets/img/gorillalogic.jpg';
import './login.css';
import { IFormValues, LoginFormikProps } from './LoginFormik';

const Login: React.SFC<InjectedFormikProps<LoginFormikProps, IFormValues>> = ({
  auth,
  errors,
  handleChange,
  handleSubmit,
  isSubmitting,
  touched,
}) => {
  const cognitoError = !auth.onRequest && auth.message ? (
    <p className="is-size-7 has-text-danger">{auth.message}</p>
  ) : null;

  return (
    <div className="login">
      <div className="login__form-wrapper box">
        <img
          className="login__logo"
          src={glImg}
          alt="Gorilla logic"
        />
        <form
          className="login__form"
          onSubmit={handleSubmit}
        >
          <InputText
            handleChange={handleChange}
            placeholder="Email"
            name="email"
            errors={errors}
            touched={touched}
          />
          <InputText
            handleChange={handleChange}
            placeholder="Password"
            name="password"
            type="password"
            errors={errors}
            touched={touched}
          />
          {cognitoError}
          <div className="login__bottom">
            <button
              disabled={auth.onRequest}
              type="submit"
              className={classnames({
                button: true,
                'is-fullwidth': true,
                'is-loading': auth.onRequest,
                'is-primary': true,
              })}
            >Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
