import { guid } from '@utils';
import classnames from 'classnames';
import * as React from 'react';
import './input-text.css';

interface IInputText {
  id?: string;
  name: string;
  handleChange: (e: React.ChangeEvent<any>) => void;
  errors: any;
  touched: any;
  type?: string;
  placeholder?: string;
  label?: string;
}

/**
 * Input test component, it receibes the formik objects
 */
const InputText: React.SFC<IInputText> = ({
  id = guid(),
  name,
  handleChange,
  errors,
  touched,
  type = 'text',
  placeholder,
  label,
}) => {
  /**
   * Label element if the label prop exist
   */
  const labelEl = label ? (
    <label
      className="label"
      htmlFor={id}
    >{label}</label>
  ): null;
  /**
   * Error element when the error prop has a value
   */
  const errorEl = errors && errors[name] && touched[name] ? (
    <p className="input-text__error is-size-7 has-text-danger">{errors[name]}</p>
  ) : null;

  return (
    <div className="input-text field">
      {labelEl}
      <div className="control">
        <input
          id={id}
          className={classnames({
            input: true,
            ['is-danger']: errors[name] && touched[name]
          })}
          onChange={handleChange}
          type={type}
          placeholder={placeholder}
          name={name}
        />
      </div>
      {errorEl}
    </div>
  );
}

export default InputText;
