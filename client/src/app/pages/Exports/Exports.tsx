import { DATE_PICKER_OPTIONS } from '@constants';
import { IRouteComponentProps } from '@interfaces';
import * as React from 'react';
import './exports.css';

declare var bulmaCalendar: any;

class Exports extends React.PureComponent<IRouteComponentProps> {
  private calendars: any[];

  public componentDidMount() {
    this.calendars = bulmaCalendar.attach('[type="date"]', {
      ...DATE_PICKER_OPTIONS,
      isRange: true,
    });

    this.calendars.forEach(c => {
      c.on('date:selected', (date: any) => {
        console.log(date);
      });
    });
  }

  public render() {
    return (
      <section className="exports section">
        <div className="container">
          <div className="columns">
            <div className="column is-5">
              <h4 className="title is-4">Entries</h4>
              <input className="input" placeholder="Select the date range" type="date" />
              <div className="exports__button-container">
                <button className="button is-link">Export</button>
              </div>
            </div>
            <div className="column is-5 is-offset-1">
              <h4 className="title is-4">Assets</h4>
              <input className="input" placeholder="Select the date range" type="date" />
              <div className="exports__button-container">
                <button className="button is-link">Export</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Exports
