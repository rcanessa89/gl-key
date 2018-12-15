import { IEntry } from '@interfaces';
import { guid } from '@utils';
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
import './table.css';

interface ITableProps {
  columns: ColumnProps[];
  data: any[];
}

interface IEntriesTableState {
  offsetWidth: number;
}

const headerRenderer = ({ label }: TableHeaderProps) => <div>{label}</div>;

class EntriesTable extends React.PureComponent<ITableProps, IEntriesTableState> {
  public state = {
    offsetWidth: 0,
  };

  private containerRef: React.RefObject<any>;
  private resizeObs: Subscription;

  constructor(props: ITableProps) {
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

  public render() {
    const {
      columns,
      data
    } = this.props;
    const tableWidth = this.state.offsetWidth;
    const columnWidth = tableWidth / 5;

    return (
      <div
        className="table"
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

  private rowGetter = ({ index }: any): IEntry => {
    return this.props.data[index];
  }

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

export default EntriesTable;
