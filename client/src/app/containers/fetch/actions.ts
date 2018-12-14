import { actionCreator } from '@utils';
import {
  IFetchCancel,
  IFetchData,
  IFetchDataCompleted,
  IFetchDataPayload
} from './interfaces';
import {
  FETCH_DATA,
  FETCH_DATA_CANCEL,
  FETCH_DATA_COMPLETED
} from './types';

export type FetchAction = IFetchData | IFetchDataCompleted | IFetchCancel;

export const fetchData = actionCreator<IFetchData, IFetchDataPayload>(FETCH_DATA);
export const fetchDataCompleted = actionCreator<IFetchDataCompleted>(FETCH_DATA_COMPLETED);
export const fetchDataCancel = actionCreator<IFetchDataCompleted>(FETCH_DATA_CANCEL);
