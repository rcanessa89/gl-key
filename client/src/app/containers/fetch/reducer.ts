import { IAction } from '@interfaces';
import { createReducer } from '@utils';
import { AjaxRequest } from 'rxjs/ajax';
import { IFetchState } from './interfaces';
import {
  FETCH_DATA,
  FETCH_DATA_CANCEL,
  FETCH_DATA_COMPLETED
} from './types';

const initialState: IFetchState = {
  loading: false,
  request: null,
};

export default createReducer<IFetchState>(initialState, {
  [FETCH_DATA](state: IFetchState, action: IAction<AjaxRequest>) {
    return {
      loading: true,
      request: action.payload,
    };
  },
  [FETCH_DATA_COMPLETED]() {
    return {
      loading: false,
      request: null,
    };
  },
  [FETCH_DATA_CANCEL]() {
    return {
      loading: false,
      request: null,
    };
  }
});
