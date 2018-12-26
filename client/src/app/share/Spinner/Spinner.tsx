import * as React from 'react';

interface ISpinnerProps {
  size?: number;
}

/**
 * Spinner component, it receives the active flag by props
 * and the spinner size
 */
const Spinner: React.SFC<ISpinnerProps> = ({
  size
}) => (
  <div>Spinner</div>
);

export default Spinner;
