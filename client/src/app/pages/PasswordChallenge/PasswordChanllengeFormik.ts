import { PASSWORD_REGEX } from '@constants';
import { IAuthContainerChildProps } from '@containers/auth/interfaces';
import { IRouteComponentProps } from '@interfaces';
import { withFormik } from 'formik';
import { object, ref, string } from 'yup';

export type PasswordChanllengeFormik = IAuthContainerChildProps & IRouteComponentProps;

export interface IFormValues {
  confirmPassword: string,
  lastName: string,
  name: string,
  password: string,
}

/**
 * Formik configuration for password challege form
 */
export default withFormik<PasswordChanllengeFormik, IFormValues>({
  handleSubmit: (values, { props, setStatus, setSubmitting }) => {
    const { user } = props.auth as any;

    user!.completeNewPasswordChallenge(values.password, {
      family_name: values.lastName,
      name: values.name,
      preferred_username: user.challengeParam.userAttributes.email,
    }, {
      onFailure: (error: any) => {
        setSubmitting(false);
        setStatus({
          cognitoError: error.message,
        });
      },
      onSuccess: () => props.currentSession(),
    })
  },
  mapPropsToValues: () => ({
    confirmPassword: '',
    lastName: '',
    name: '',
    password: '',
  }),
  validationSchema: object().shape({
    confirmPassword: string()
      .oneOf([ref('password'), null], 'Password doesn\'t match.')
      .required('Confirm password is required'),
    lastName: string()
      .trim()
      .required('Last name is required'),
    name: string()
      .trim()
      .required('Name is required'),
    password: string()
      .required('Password field is required.')
      .matches(PASSWORD_REGEX, {
        excludeEmptyString: true,
        message: 'Password invalid.'
      })
  })
});
