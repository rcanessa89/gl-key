import * as React from 'react';
import './confirm.css';
import Modal from './Modal';

interface IConfirmProps {
  active: boolean;
  message?: string;
  yes: () => void;
  no: () => void;
}

/**
 * Confirm component, it has the Modal component as dependency
 * it show a card with confirmation options
 */
const Confirm: React.SFC<IConfirmProps> = ({
  active,
  message = 'Are you sure?',
  no,
  yes
}) => (
  <Modal
    active={active}
    close={no}
  >
    <div className="card confirm">
      <header className="card-header">
        <p className="card-header-title">Confirm</p>
      </header>
      <div className="card-content">
        <div className="content">{message}</div>
      </div>
      <footer className="card-footer">
        <a
          className="card-footer-item"
          onClick={yes}
        >
          Yes
        </a>
        <a
          className="card-footer-item"
          onClick={no}
        >
          No
        </a>
      </footer>
    </div>
  </Modal>
);

export default Confirm;
