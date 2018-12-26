import { IAsset, IRouteComponentProps } from '@interfaces';
import { Asset } from '@models';
import { Api } from '@services';
import { Table, Tabs } from '@share';
import * as React from 'react';
import { AjaxResponse } from 'rxjs/ajax';

interface IAssetState extends IAsset {
  owner: string;
}

interface IAssetsState {
  assets: IAssetState[];
}

/**
 * Assets route view component
 */
class Assets extends React.PureComponent<IRouteComponentProps, IAssetsState> {
  public state = {
    assets: [],
  };

  private api = new Api();
  /**
   * Columns map of the asset table
   */
  private readonly columns = [
    {
      header: 'Brand',
      key: 'brand',
    },
    {
      header: 'Description',
      key: 'description',
    },
    {
      header: 'Model',
      key: 'model',
    },
    {
      header: 'Series',
      key: 'series',
    },
  ];

  public componentDidMount() {
    this.fetchAssets();
  }

  public render() {
    const { assets } = this.state;
    const activeAssets = assets.filter((a: Asset) => !a.entry.checkOut);
    const deactiveAssets = assets.filter((a: Asset) => a.entry.checkOut);
    const tabsItems = [
      {
        content: (
          <Table
            className="is-striped"
            keys={this.columns}
            data={assets}
          />
        ),
        title: 'All',
      },
      {
        content: (
          <Table
            className="is-striped"
            keys={this.columns}
            data={activeAssets}
          />
        ),
        title: 'Active',
      },
      {
        content: (
          <Table
            className="is-striped"
            keys={this.columns}
            data={deactiveAssets}
          />
        ),
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

  /**
   * This method consume the API service to get the assets data
   */
  private fetchAssets() {
    const filter = {
      relations: [
        'entry',
      ],
    };

    this.api.call(`asset?filter=${JSON.stringify(filter)}`)
      .subscribe((value: AjaxResponse) => this.setState({
        assets: value.response.map((a: Asset) => new Asset(a)),
      }));
  }
}

export default Assets
