import { CHALLENGES } from '@constants';
import { paths } from '@router';
import { InputText } from '@share';
import classnames from 'classnames';
import { InjectedFormikProps } from 'formik';
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import './password-challenge.css';
import { IFormValues, PasswordChanllengeFormik } from './PasswordChanllengeFormik';

const PasswordChanllenge: React.SFC<
  InjectedFormikProps<PasswordChanllengeFormik, IFormValues>
> = ({
  errors,
  handleChange,
  handleSubmit,
  isSubmitting,
  touched,
  status,
  auth
}) => {
  const { challengeName } = auth.user as any;

  if (challengeName !== CHALLENGES.NEW_PASSWORD_REQUIRED) {
    return <Redirect to={paths.entries} />;
  }

  const cognitoError = !isSubmitting && status && status.cognitoError && !errors ? (
    <p className="is-size-7 has-text-danger">{status.cognitoError}</p>
  ) : null;

  return (
    <div className="pass-challenge section">
      <div className="container">
        <form
          className="pass-challenge__form"
          onSubmit={handleSubmit}
        >
          <InputText
            label="Name"
            name="name"
            handleChange={handleChange}
            errors={errors}
            touched={touched}
            placeholder="Your name..."
          />
          <InputText
            label="Lastname"
            name="lastname"
            handleChange={handleChange}
            errors={errors}
            touched={touched}
            placeholder="Your lastname..."
          />
          <div className="content">
            <ul>
              <li>Minimun 8 characters</li>
              <li>Require numbers</li>
              <li>Require uppercase letters</li>
              <li>Require lowercase letters</li>
            </ul>
          </div>
          <InputText
            label="Password"
            name="password"
            handleChange={handleChange}
            errors={errors}
            touched={touched}
            type="password"
            placeholder="Your new password..."
          />
          <InputText
            label="Confirm password"
            name="confirmPassword"
            handleChange={handleChange}
            errors={errors}
            touched={touched}
            type="password"
            placeholder="Confirm your new password..."
          />
          {cognitoError}
          <div className="pass-challenge__bottom">
            <button
              type="submit"
              disabled={isSubmitting}
              className={classnames({
                button: true,
                ['is-link']: true,
                ['is-loading']: isSubmitting,
              })}
            >Confirm</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordChanllenge;
