import { MOMENT_FORMAT } from '@constants';
import { IEntry, IRouteComponentProps } from '@interfaces';
import { Entry } from '@models';
import { Api } from '@services';
import { Table, Tabs } from '@share';
import * as moment from 'moment';
import * as React from 'react';
import { AjaxResponse } from 'rxjs/ajax';
import EntryActions from './EntryActions/EntryActions';

interface IEntryState extends IEntry {
  actions: React.ReactElement<EntryActions>;
}

interface IEntriesState {
  entries: IEntryState[];
}

/**
 * Entries route view component
 */
class Entries extends React.PureComponent<IRouteComponentProps, IEntriesState> {
  public state: IEntriesState = {
    entries: [],
  };

  private api = new Api();
  /**
   * Columns map of the entries table
   */
  private readonly columns = [
    {
      header: 'Cedula',
      key: 'cedula',
    },
    {
      header: 'Full name',
      key: 'fullName',
    },
    {
      header: 'Check in',
      key: 'checkIn',
    },
    {
      header: 'Check out',
      key: 'checkOut',
    },
    {
      header: 'Actions',
      key: 'actions'
    }
  ];

  public componentDidMount() {
    this.fetchEntries();
  }

  public render() {
    const { entries } = this.state;
    const activeEntries = entries.filter((e: IEntry) => !e.checkOut);
    const deactiveEntries = entries.filter((e: IEntry) => e.checkOut);
    const tabsItems = [
      {
        content: (
          <Table
            className="is-striped"
            keys={this.columns}
            data={entries}
          />
        ),
        title: 'All',
      },
      {
        content: (
          <Table
            className="is-striped"
            keys={this.columns}
            data={activeEntries}
          />
        ),
        title: 'Active',
      },
      {
        content: (
          <Table
            className="is-striped"
            keys={this.columns}
            data={deactiveEntries}
          />
        ),
        title: 'Deactive',
      },
    ];

    return (
      <section className="section">
        <div className="container">
          <Tabs items={tabsItems} />
        </div>
      </section>
    );
  }

  /**
   * This method consume the API service to get the entries data
   */
  private fetchEntries() {
    const filter = {
      relations: [
        'assets',
      ],
    };

    this.api.call(`entry?filter=${JSON.stringify(filter)}`)
      .subscribe((value: AjaxResponse) => this.setState({
        entries: value.response.map((e: IEntry) => {
          const entry = new Entry(({
            ...e,
            checkIn: moment(e.checkIn).format(MOMENT_FORMAT.MMDDYYYY_HHMM_A),
            checkOut: e.checkOut ? moment(e.checkOut).format(MOMENT_FORMAT.MMDDYYYY_HHMM_A) : 'N/A',
          }));

          return this.getActionsValue(entry);
        }),
      }));
  }

  /**
   * Change the entries state putting the updated entry
   * @param {Entry} updatedEntry updated entry data
   */
  private updateEntryState = (updatedEntry: Entry): void => {
    this.setState({
      entries: this.state.entries.map((entry: IEntryState) => {
        if (updatedEntry.id === entry.id) {
          return this.getActionsValue(updatedEntry);
        }

        return entry;
      })
    });
  };

  /**
   * Change the entries state removing the deleted entry
   * @param {Entry} deletedEntry deleted entry data
   */
  private deleteEntryState = (deletedEntry: Entry): void => {
    this.setState({
      entries: this.state.entries.filter((e: IEntryState) => e.id !== deletedEntry.id),
    });
  }

  /**
   * Return the EntryActions element
   * @param {Entry} entry data of the entries table row
   */
  private getActionsValue = (entry: Entry) => {
    return {
      ...entry,
      actions: (
        <EntryActions
          entry={entry}
          updateEntryState={this.updateEntryState}
          deleteEntryState={this.deleteEntryState}
        />
      ),
      fullName: entry.fullName,
    };
  };
}

export default Entries
