import classnames from 'classnames';
import * as React from 'react';

interface IModalProps {
  active: boolean;
  children: React.ReactNode;
  close?: () => void;
}

/**
 * Modal component, it based it in Bulma css component
 * it receives the active flag by props
 */
const Modal: React.SFC<IModalProps> = ({
  active,
  children,
  close
}) => (
  <div className={classnames({
    'is-active': active,
    modal: true,
  })}>
    <div
      className="modal-background"
      onClick={close}
    />
    <div className="modal-content">{children}</div>
    <button
      className="modal-close is-large"
      aria-label="close"
      onClick={close}
    />
  </div>
);

export default Modal;
