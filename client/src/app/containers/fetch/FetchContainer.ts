import { IStore } from '@interfaces';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { FetchAction, fetchData, fetchDataCancel } from './actions';
import { IFetchDataPayload } from './interfaces';

const mapStateToProps = ({ fetch }: IStore) => ({ fetch });

const mapDispatchToProps = (dispatch: Dispatch<FetchAction>) => ({
  fetchData: (payload: IFetchDataPayload) => dispatch(fetchData(payload)),
  fetchDataCancel: () => dispatch(fetchDataCancel()),
});

export default connect(mapStateToProps, mapDispatchToProps);
