import authEpics from '@containers/auth/epics';
import fetchEpics from '@containers/fetch/epics';

export default [
  ...fetchEpics,
  ...authEpics,
];
