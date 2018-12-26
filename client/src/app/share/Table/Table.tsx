import { guid } from '@utils';
import classnames from 'classnames';
import * as React from 'react';
import './table.css';

interface ITableKeys {
  key: string;
  header: string;
}

interface ITableProps {
  data: any[];
  keys: ITableKeys[];
  className?: string;
}

/**
 * Table component, it based in Bulma css table component
 * it receives a columns map and data to show
 */
const Table = React.memo<ITableProps>((({
  data,
  keys,
  className = ''
}) => (
  <table className={classnames({
    table: true,
    [className]: className
  })}>
    <thead>
      <tr>
        {
          keys.map(k => (
            <th key={guid()}>{k.header}</th>
          ))
        }
      </tr>
    </thead>
    <tbody>
      {
        data.map(d => (
          <tr key={guid()}>
            {
              keys.map(k => (
                <td key={guid()}>{d[k.key]}</td>
              ))
            }
          </tr>
        ))
      }
    </tbody>
  </table>
)));

export default Table;
