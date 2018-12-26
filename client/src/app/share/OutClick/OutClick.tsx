import { CLASSNAMES } from '@constants';
import * as React from 'react';
import { AppContext, IAppContext } from '../../../App';

interface IOutClickProps {
  children: any;
  targetClass: React.RefObject<any>;
  targetClick: React.RefObject<any>;
}

/**
 * OutClick component handle the "is-active" class in to the children
 */
class OutClick extends React.PureComponent<IOutClickProps> {
  public static contextType: React.Context<IAppContext> = AppContext;

  /**
   * Subscription to the observable that is saved it the app contaext
   */
  private contextSubscription = this.context
    .windowClickObservable
    .subscribe((e: Event) => {
      const {
        targetClass,
        targetClick
      } = this.props;

      if (e.target === targetClick.current || targetClick.current.contains(e.target)) {
        targetClass.current.classList.add(CLASSNAMES.IS_ACTIVE);
      } else {
        targetClass.current.classList.remove(CLASSNAMES.IS_ACTIVE);
      }
    });

  public componentWillUnmount() {
    this.contextSubscription.unsubscribe();
  }

  public render() {
    return this.props.children;
  }
}

export default OutClick;
