import { DOCUMENT_TITLE_PREFIX } from '@constants';
import { IAuthContainerChildProps } from '@containers/auth/interfaces';
import { IRouteComponentProps } from '@interfaces';
import { paths } from '@router';
import classnames from 'classnames';
import { isEqual } from 'lodash';
import * as React from 'react';
import { Link } from 'react-router-dom';
import glImg from '../../../assets/img/gorillalogic-white.png';
import './main.css';

const navContentId = 'nav-bar-content';

type MainProps = IRouteComponentProps & IAuthContainerChildProps;

interface IMainState {
  open: boolean;
}

class Main extends React.Component<MainProps, IMainState> {
  public state = {
    open: false,
  };

  public shouldComponentUpdate(nextProps: MainProps, nextState: IMainState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState)
  }

  public render() {
    const textToRemove = `${DOCUMENT_TITLE_PREFIX} - `;
    const title = document.title.replace(textToRemove, '');

    return (
      <React.Fragment>
        <nav
          className="navbar"
          role="navigation"
          aria-label="main navigation"
        >
          <div className="navbar-brand">
            <Link
              className="navbar-item"
              to={paths.entries}
            >
              <img
                className="navbar__logo"
                src={glImg}
                alt="Gorilla logic"
              />
            </Link>
            <a
              className="navbar-burger burger"
              role="button"
              aria-label="menu"
              aria-expanded="false"
              data-target={navContentId}
              onClick={this.toggle}
            >
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </a>
          </div>
          <div
            id={navContentId}
            className={classnames({
              ['navbar__menu']: true,
              ['navbar-menu']: true,
              ['is-active']: this.state.open,
            })}
          >
            <div className="navbar-start">
              <Link
                className="navbar__item navbar-item"
                to={paths.entries}
              >
                Entries
              </Link>
              <Link
                className="navbar__item navbar-item"
                to={paths.assests}
              >
                Assets
              </Link>
              <Link
                className="navbar__item navbar-item"
                to={paths.exports}
              >
                Exports
              </Link>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <button
                    className="button is-link"
                    onClick={this.props.logout}
                  >Log out</button>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <section className="hero is-primary">
          <div className="hero-body">
            <div className="container">
              <h1 className="title is-capitalized">{title}</h1>
            </div>
          </div>
        </section>
        {this.props.nested}
      </React.Fragment>
    );
  }

  private toggle = () => {
    this.setState({
      open: !this.state.open,
    });
  }
}

export default Main;
