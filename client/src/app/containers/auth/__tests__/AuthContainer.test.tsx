// import { authRequestFailed, authRequestSuccess } from '../actions';
// import { IAuthState, IAuthCredentials } from '../interfaces';
// import { AUTH_OFF } from '../types';
// import { FETCH_DATA } from '../types';
// import { configure, shallow, ShallowWrapper } from 'enzyme';
// import * as Adapter from 'enzyme-adapter-react-16';
// import * as React from 'react';
// import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
// import AuthContainer from '../AuthContainer';

// configure({ adapter: new Adapter() });

// const mockStore = configureStore();

// const Component = () => <div />;
// const WrappedComponent = AuthContainer(Component);

// interface IProps  {
//   login: (payload: IAuthCredentials) => {};
//   logout: () => void;
//   auth: IAuthState;
// }

// describe('AuthContainer', () => {
//   let wrapper: ShallowWrapper<IProps>;
//   let store: MockStoreEnhanced;

//   beforeEach(() =>{
//     store = mockStore({
//       auth: {
//         isAuthorized: false,
//         message: '',
//         user: null,
//       },
//     });
//     store.dispatch = jest.fn();

//     wrapper = shallow(<WrappedComponent />, {
//       context: {
//         store,
//       },
//     });
//   });

//   it('Maps state and dispatch to props', () => {
//     expect(wrapper.props()).toEqual({
//       isAuthorized: false,
//       login: expect.any(Function),
//       logout: expect.any(Function),
//       message: '',
//       user: null,
//     });
//   });

//   it('Login should dispatch fetch action for auth', () => {
//     const credentials = {
//       email: 'rcanessa89@hotmail.com',
//       password: 'Abc!1234',
//     };

//     const payload = {
//       failed: authRequestFailed,
//       options: {
//         body: credentials,
//         method: 'POST',
//         url: '/login',
//       },
//       success: authRequestSuccess,
//     };

//     const action = {
//       payload,
//       type: FETCH_DATA,
//     };

//     wrapper.props().login(credentials);

//     expect(store.dispatch).toHaveBeenCalledWith(action);
//   });

//   it('Logout should dispatch auth off', () => {
//     const action = {
//       type: AUTH_OFF,
//     };

//     wrapper.props().logout();

//     expect(store.dispatch).toHaveBeenCalledWith(action);
//   });
// });
