import classnames from 'classnames';
import { isEqual } from 'lodash';
import * as React from 'react';
import './tabs.css';

interface ITabItem {
  title: string;
  content: any;
  active?: boolean;
}

interface ITabsProps {
  items: ITabItem[]
}

interface ITabItemState extends ITabItem {
  index: number;
  active: boolean;
}

interface ITabsState {
  items: ITabItemState[];
}

class Tabs extends React.PureComponent<ITabsProps, ITabsState> {
  public static getDerivedStateFromProps(p: ITabsProps, s: ITabsState): ITabsState | null {
    const props = {
      items: p.items.map(itemState => ({
        content: itemState.content,
        title: itemState.title,
      })),
    };
    const state = {
      items: s.items.map(itemState => ({
        content: itemState.content,
        title: itemState.title,
      })),
    };

    if (!isEqual(props, state)) {
      return Tabs.mapPropsToState(p.items);
    }

    return s;
  }

  /**
   * This method return new state data base it in
   * new props data
   * @param {ITabItem[]} items data from new props
   * @returns {ITabsState} new state data
   */
  private static mapPropsToState(items: ITabItem[]): ITabsState {
    return {
      items: items.map((item, i) => ({
        ...item,
        active: item.active || i === 0,
        index: i,
      })),
    };
  }

  public state = Tabs.mapPropsToState(this.props.items);

  public render() {
    const content = this.state.items.filter(item => item.active)[0].content;

    return (
      <React.Fragment>
        <div className="tabs is-medium">
          <ul>
            {
              this.state.items.map(item => {
                const onClick = () => this.setTab(item.index);

                return (
                  <li
                    key={item.index}
                    className={classnames({
                      ['tabs__item']: true,
                      ['is-active']: item.active
                    })}
                    onClick={onClick}
                  ><a className="tabs__link">{item.title}</a></li>
                );
              })
            }
          </ul>
        </div>
        {content}
      </React.Fragment>
    );
  }

  /**
   * This method set the active tab state
   * @param index The index of the next active tab
   */
  private setTab(index: number): void {
    this.setState({
      items: this.state.items.map(item => ({
        ...item,
        active: index === item.index,
      })),
    });
  }
}

export default Tabs;
