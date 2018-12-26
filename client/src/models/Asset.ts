import { IAsset } from '@interfaces';
import { Entry } from '@models';
import { Api } from '@services';
import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';

class Asset implements IAsset {
  public id: number;
  public description: string;
	public model: string;
	public seriesNumber: string;
	public brand: string;
  public entry: Entry;
	public createdAt: string;
	public updatedAt: string;
  private api = new Api();

  constructor(asset: IAsset) {
    Object.assign(this, asset);
  }

  public update(): Observable<AjaxResponse>  {
    return this.api.call('asset', 'PATCH', {
      brand: this.brand,
      description: this.description,
      id: this.id,
      model: this.model,
      seriesNumber: this.seriesNumber,
    });
  }

  public delete(): Observable<AjaxResponse> {
    return this.api.call(`asset/${this.id}`, 'DELETE')
  }
}

export default Asset;
