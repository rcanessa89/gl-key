import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import ProtectedRoute from '../ProtectedRoute';

configure({ adapter: new Adapter() });

const page = () => (
  <div>
    <h1>Page example</h1>
  </div>
);

describe('<ProtectedRoute />', () => {
  const shallowProtectedRoute = (isAuthorized: boolean) => shallow(
    <ProtectedRoute
      component={page}
      isAuthorized={isAuthorized}
      path="/"
    />
  );

  it('Matches the snapshot', () => {
    expect(toJson(shallowProtectedRoute(true))).toMatchSnapshot();
  });
});
