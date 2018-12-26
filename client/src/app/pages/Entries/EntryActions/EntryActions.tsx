import { Entry } from '@models';
import { Confirm, Modal, OutClick } from '@share';
import { guid } from '@utils';
import * as moment from 'moment';
import * as React from 'react';

interface IEntryActionsProps {
  entry: Entry;
  updateEntryState: (e: Entry) => void;
  deleteEntryState: (e: Entry) => void;
}

interface IEntryActionsState {
  confirmActive: boolean;
  confirmDelete: boolean;
  signatureActive: boolean;
}

/**
 * This component is a menu for every entry in the entries table
 * It has 3 options, set the checkout value if is null, show the entry signature
 * and delete the entry by an API request
 */
class EntryActions extends React.PureComponent<IEntryActionsProps, IEntryActionsState> {
  public state = {
    confirmActive: false,
    confirmDelete: false,
    signatureActive: false,
  };

  private entry = new Entry(this.props.entry);
  private readonly id: string = guid();
  private readonly noCheckOutStr = 'N/A';
  private readonly targetClass: React.RefObject<HTMLDivElement>;
  private readonly targetClick: React.RefObject<HTMLButtonElement>;

  constructor(props: IEntryActionsProps) {
    super(props);

    this.targetClass = React.createRef<HTMLDivElement>();
    this.targetClick = React.createRef<HTMLButtonElement>();
  }

  public render() {
    const {
      confirmActive,
      confirmDelete,
      signatureActive,
    } = this.state;

    /**
     * Hide the "Set check out" option if
     * the entry has "checkOut" value different to null
     */
    const setCheckoutOption = this.entry.checkOut !== this.noCheckOutStr ? null : (
      <a
        className="dropdown-item"
        onClick={this.showConfirmActive}
      >
        Set check out
      </a>
    );

    return (
      <React.Fragment>
        <OutClick
          targetClass={this.targetClass}
          targetClick={this.targetClick}
        >
          <div
            ref={this.targetClass}
            className="dropdown"
          >
            <div className="dropdown-trigger">
              <button
                className="button is-small"
                ref={this.targetClick}
                aria-haspopup="true"
                aria-controls={this.id}
              >
                <span className="icon">
                  <i className="fas fa-ellipsis-v" />
                </span>
              </button>
            </div>
            <div
              id={this.id}
              className="dropdown-menu"
              role="menu"
            >
              <div className="dropdown-content">
                {setCheckoutOption}
                <a
                  className="dropdown-item"
                  onClick={this.openSignture}
                >
                  Signature
                </a>
                <a
                  className="dropdown-item"
                  onClick={this.showConfirmDelete}
                >
                  Delete
                </a>
              </div>
            </div>
          </div>
        </OutClick>
        <Confirm
          active={confirmActive}
          yes={this.onConfirmActiveYes}
          no={this.hideConfirmActive}
        />
        <Confirm
          active={confirmDelete}
          yes={this.onConfirmDeleteYes}
          no={this.hideConfirmDelete}
        />
        <Modal
          active={signatureActive}
          close={this.closeSignture}
        >
          <p className="image is-3by1">
            <img
              src="https://bulma.io/images/placeholders/1280x960.png"
              alt="signature"
            />
          </p>
        </Modal>
      </React.Fragment>
    );
  }

  /**
   * Show confirmation check out modal
   */
  private showConfirmActive = (): void => {
    this.setState({
      confirmActive: true,
    });
  };

  /**
   * Hide confirmation check out modal
   */
  private hideConfirmActive = (): void => {
    this.setState({
      confirmActive: false,
    });
  };

  /**
   * Make a request to the API to update the "checkOut" value of the entry
   */
  private onConfirmActiveYes = (): void => {
    this.entry.checkOut = moment.utc().toISOString();
    this.entry.update()
      .subscribe(() => {
        this.props.updateEntryState(this.entry);
      });
    this.hideConfirmActive();
  };

  /**
   * Show confirmation delete modal
   */
  private showConfirmDelete = (): void => {
    this.setState({
      confirmDelete: true,
    });
  };

  /**
   * Hide confirmation delete modal
   */
  private hideConfirmDelete = (): void => {
    this.setState({
      confirmDelete: false,
    });
  };

  /**
   * Make a request to the API to update the "checkOut" value of the entry
   */
  private onConfirmDeleteYes = (): void => {
    this.entry.delete()
      .subscribe(() => {
        this.props.deleteEntryState(this.entry);
      });
    this.hideConfirmDelete();
  };

  /**
   * Open signature modal to show the signature image
   */
  private openSignture = (): void => {
    this.setState({
      signatureActive: true,
    });
  }

  /**
   * Close signature modal
   */
  private closeSignture = (): void => {
    this.setState({
      signatureActive: false,
    });
  }
}

export default EntryActions;
