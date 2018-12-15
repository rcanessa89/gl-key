import { IAsset, IRouteComponentProps } from '@interfaces';
import { Table } from '@share';
import { Tabs } from '@share';
import * as React from 'react';

const t: IAsset[] = [
  {
    brand: 'string',
    checkIn: 'string',
    checkOut: 'string',
    createdAt: 'string',
    description: 'string',
    id: 0,
    model: 'string',
    owner: 'any',
    seriesNumber: 'string',
    updatedAt: 'string',
  },
  {
    brand: 'string',
    checkIn: 'string',
    checkOut: 'string',
    createdAt: 'string',
    description: 'string',
    id: 1,
    model: 'string',
    owner: 'any',
    seriesNumber: 'string',
    updatedAt: 'string',
  },
  {
    brand: 'string',
    checkIn: 'string',
    checkOut: 'string',
    createdAt: 'string',
    description: 'string',
    id: 2,
    model: 'string',
    owner: 'any',
    seriesNumber: 'string',
    updatedAt: 'string',
  },
  {
    brand: 'string',
    checkIn: 'string',
    checkOut: 'string',
    createdAt: 'string',
    description: 'string',
    id: 3,
    model: 'string',
    owner: 'any',
    seriesNumber: 'string',
    updatedAt: 'string',
  },
];

class Assets extends React.PureComponent<IRouteComponentProps> {
  private columns: any[] = [
    {
      dataKey: 'description',
      label: 'Description',
    },
    {
      dataKey: 'model',
      label: 'Model',
    },
    {
      dataKey: 'seriesNumber',
      label: 'Series Number',
    },
    {
      dataKey: 'owner',
      label: 'Owner',
    },
    {
      dataKey: 'checkOut',
      label: 'Check Out',
    },
    {
      dataKey: 'checkIn',
      label: 'Check In',
    },
    {
      dataKey: 'checkOut',
      label: 'Check Out',
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
}

export default Assets
