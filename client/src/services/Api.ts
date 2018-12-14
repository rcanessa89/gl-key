import { getEnvVar } from '@utils';
import { forkJoin, Observable } from 'rxjs';
import {
  ajax,
  AjaxRequest,
  AjaxResponse
} from 'rxjs/ajax';

type httpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface ICallParams {
  url: string;
  method: httpMethod;
  body?: any;
};

export default class Api {
  private readonly baseUrl: string = getEnvVar('base_api_url');
  private readonly config: AjaxRequest;
  private readonly defaultConfig: AjaxRequest = {};

  constructor(config: AjaxRequest = {}) {
    this.config = {
      ...this.defaultConfig,
      ...config,
    };
  }

  public call(url: string, method: httpMethod = 'GET', body?: any): Observable<AjaxResponse> {
    const config: AjaxRequest = {
      ...this.config,
      body,
      method,
      url: `${this.baseUrl}${this.formatUrl(url)}`,
    };

    return ajax(config);
  }

  public callMany(options: ICallParams[]): Observable<AjaxRequest[]> {
    return forkJoin(
      ...options.map((option: ICallParams) => {
        const {
          body,
          method,
          url
        } = option;

        return this.call(url, method, body);
      })
    );
  }

  private formatUrl(url: string): string {
		let fullUrl: string;

		if (url.charAt(0) === '/') {
			fullUrl = url;
		} else {
			fullUrl = `/${url}`;
		}

		return fullUrl;
	}
}
