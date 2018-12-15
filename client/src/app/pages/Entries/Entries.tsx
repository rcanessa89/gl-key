import { IEntry, IRouteComponentProps } from '@interfaces';
import { Table } from '@share';
import { Tabs } from '@share';
import * as React from 'react';

const t: IEntry[] = [
  {
    cedula: 603780292,
    checkIn: 'viernes',
    checkOut: 'sabado',
    createdAt: 'ayer',
    id: 0,
    lastname: 'canessa',
    name: 'rodolfo',
    signature: 'test',
    updatedAt: 'manana',
  },
  {
    cedula: 603780292,
    checkIn: 'viernes',
    checkOut: 'sabado',
    createdAt: 'ayer',
    id: 1,
    lastname: 'canessa',
    name: 'rodolfo',
    signature: 'test',
    updatedAt: 'manana',
  },
  {
    cedula: 603780292,
    checkIn: 'viernes',
    checkOut: 'sabado',
    createdAt: 'ayer',
    id: 2,
    lastname: 'canessa',
    name: 'rodolfo',
    signature: 'test',
    updatedAt: 'manana',
  },
];

class Entries extends React.PureComponent<IRouteComponentProps> {
  private columns: any[] = [
    {
      dataKey: 'cedula',
      label: 'Cedula',
    },
    {
      dataKey: 'name',
      label: 'Name',
    },
    {
      dataKey: 'lastname',
      label: 'Lastname',
    },
    {
      dataKey: 'checkIn',
      label: 'Check In',
    },
    {
      dataKey: 'checkOut',
      label: 'Check Out',
    },
    {
      cellRenderer: ({ rowData }: any) => {
        return (
          <span
            className="icon entries-table__icon"
            onClick={this.onSignatureClick.bind(this, rowData)}
          >
            <i className="fas fa-signature" />
          </span>
        );
      },
      dataKey: 'signature',
      label: 'Signature',
    },
  ];

  public render() {
    const tabsItems = [
      {
        content: <Table columns={this.columns} data={t} />,
        title: 'All',
      },
      {
        content: <Table columns={this.columns} data={t} />,
        title: 'Active',
      },
      {
        content: <Table columns={this.columns} data={t} />,
        title: 'Deactive',
      },
    ]

    return (
      <section className="section">
        <div className="container">
          <Tabs items={tabsItems} />
        </div>
      </section>
    );
  }

  private onSignatureClick = (x: any): void => {
    console.log(x);
  }
}

export default Entries
