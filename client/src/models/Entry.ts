import { IEntry } from '@interfaces';
import { Asset } from '@models';
import { Api } from '@services';
import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';

class Entry implements IEntry {
  public id: number | string;
  public cedula: number;
  public name: string;
  public firstLastName: string;
  public secondLastName: string;
  public checkIn: string;
  public checkOut: string;
  public signature: string;
  public assets: Asset[];
  public createdAt: string;
  public updatedAt: string;
  private api = new Api();

  constructor(entry: IEntry) {
    Object.assign(this, entry);
  }

  public update(): Observable<AjaxResponse> {
    return this.api.call('entry', 'PATCH', {
      cedula: this.cedula,
      checkIn: this.checkIn,
      checkOut: this.checkOut,
      firstLastName: this.firstLastName,
      id: this.id,
      name: this.name,
      secondLastName: this.secondLastName,
    });
  }

  public delete(): Observable<AjaxResponse> {
    return this.api.call(`entry/${this.id}`, 'DELETE')
  }

  public get fullName(): string {
    return `${this.name} ${this.firstLastName} ${this.secondLastName}`;
  }
}

export default Entry;
