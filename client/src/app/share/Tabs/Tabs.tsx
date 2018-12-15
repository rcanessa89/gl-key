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
    const props = p.items.map(prop => prop.title);
    const state = s.items.map(itemState => itemState.title);

    if (!isEqual(props, state)) {
      return Tabs.mapPropsToState(p.items);
    }

    return null;
  }

  private static mapPropsToState(items: ITabItem[]) {
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
