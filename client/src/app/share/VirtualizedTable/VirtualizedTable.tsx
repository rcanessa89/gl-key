import { guid } from '@utils';
import { isEqual } from 'lodash';
import * as React from 'react';
import {
  Column,
  ColumnProps,
  Table,
  TableHeaderProps,
  WindowScroller
} from 'react-virtualized';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import './virtualized-table.css';

interface IVirtualizedTableProps {
  columns: ColumnProps[];
  data: any[];
}

interface IVirtualizedTableState {
  offsetWidth: number;
}

/**
 * This function return a table header
 * @param {any} any.label string to show in the table header
 * @return {React.ReactElement} table header
 */
const headerRenderer = ({ label }: TableHeaderProps) => <div>{label}</div>;

class VirtualizedTable extends React.Component<IVirtualizedTableProps, IVirtualizedTableState> {
  public state = {
    offsetWidth: 0,
  };

  /**
   * VirtualizedTable container reference
   */
  private containerRef: React.RefObject<any>;
  /**
   * Resize event observable
   */
  private resizeObs: Subscription;

  constructor(props: IVirtualizedTableProps) {
    super(props);

    this.containerRef = React.createRef();
  }

  public componentDidMount() {
    this.setState({
      offsetWidth: this.containerRef.current.offsetWidth,
    });
    this.bindResize();
  }

  public componentWillUnmount() {
    this.resizeObs.unsubscribe();
  }

  public shouldComponentUpdate(nextProps: IVirtualizedTableProps, nextState: IVirtualizedTableState) {
    return (
      !isEqual(nextProps, this.props) ||
      !isEqual(nextState, this.state)
    );
  }

  public render() {
    const {
      columns,
      data
    } = this.props;
    const tableWidth = this.state.offsetWidth;
    const columnWidth = tableWidth / columns.length;

    return (
      <div
        className="virtualized-table"
        ref={this.containerRef}
      >
        <WindowScroller>
          {({ height, isScrolling, onChildScroll, scrollTop }) => (
            <Table
              width={tableWidth}
              height={height}
              headerHeight={30}
              rowHeight={40}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              scrollTop={scrollTop}
              rowCount={data.length}
              rowGetter={this.rowGetter}
              autoHeight={true}
            >
              {
                columns.map(c => (
                  <Column
                    {...c}
                    key={guid()}
                    headerRenderer={headerRenderer}
                    width={columnWidth}
                  />
                ))
              }
            </Table>
          )}
        </WindowScroller>
      </div>
    );
  }

  /**
   * @param {number} any.index indexof the data
   * @return {any} data value by index
   */
  private rowGetter = ({ index }: any): any => {
    return this.props.data[index];
  }

  /**
   * This method bind a window resize event in to observable
   */
  private bindResize(): void {
    this.resizeObs = fromEvent(window, 'resize')
      .pipe(
        map(() => this.containerRef.current.offsetWidth),
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((offsetWidth: number) => {
        this.setState({
          offsetWidth
        });
      });
  }
}

export default VirtualizedTable;
