import { DOCUMENT_TITLE_PREFIX } from '@constants';
import { IRouteComponentProps } from '@interfaces';
import { paths } from '@router';
import classnames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import glImg from '../../../assets/img/gorillalogic-white.png';
import './main.css';

const navContentId = 'nav-bar-content';

interface IMainState {
  open: boolean;
}

class Main extends React.PureComponent<IRouteComponentProps, IMainState> {
  public state = {
    open: false,
  };

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
            <a
              className="navbar-item"
              href="https://bulma.io"
            >
              <img
                className="navbar__logo"
                src={glImg}
                alt="Gorilla logic"
              />
            </a>
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
