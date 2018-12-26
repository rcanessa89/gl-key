import { IAuthContainerChildProps } from '@containers/auth/interfaces';
import { withFormik } from 'formik';
import { RouteComponentProps } from 'react-router-dom';
import { object, string } from 'yup';

export interface IFormValues {
  email: string;
  password: string;
};

export type LoginFormikProps = IAuthContainerChildProps & RouteComponentProps;

/**
 * Formik form configuration for login form
 */
export default withFormik<LoginFormikProps & any, IFormValues>({
  handleSubmit: ({ email, password }, { props }) => {
    props.login({ email, password });
  },
  mapPropsToValues: () => ({
    email: '',
    password: ''
  }),
  validationSchema: object().shape({
    email: string()
      .trim()
      .email('Username should be a valid email format.')
      .required('Username is required.'),
    password: string()
      .trim()
      .required('Password is required.'),
  }),
});
