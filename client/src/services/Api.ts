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

/**
 * This service handle all HTTP request
 */
export default class Api {
  /**
   * This value is the base url of the http request,
   * is saved it in a environment variable
   */
  private readonly baseUrl: string = getEnvVar('base_api_url');
  /**
   * HTTP request configuration for every class instance
   */
  private readonly config: AjaxRequest;
  /**
   * HTTP request default configuration for every request
   */
  private readonly defaultConfig: AjaxRequest = {};

  constructor(config: AjaxRequest = {}) {
    this.config = {
      ...this.defaultConfig,
      ...config,
    };
  }

  /**
   * This method makes HTTP requests
   * @param {string} url url of the request
   * @param {httpMethod} method HTTP method
   * @param {any} body request body
   * @return {Observable} async observable
   */
  public call(url: string, method: httpMethod = 'GET', body?: any): Observable<AjaxResponse> {
    const config: AjaxRequest = {
      ...this.config,
      body,
      method,
      url: `${this.baseUrl}${this.formatUrl(url)}`,
    };

    return ajax(config);
  }

  /**
   * This function receives the options of multiple HTTP requests
   * @param {ICallParams[]} options options of every HTTP request
   * @return  {Observable} async observable
   */
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

  /**
   * This function transform an url in to a correct url format
   * @param {string} url url to form
   * @return {string} formated url
   */
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
