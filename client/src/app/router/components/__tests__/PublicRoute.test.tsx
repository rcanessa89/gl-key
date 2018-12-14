import { configure, shallow } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import PublicRoute from '../PublicRoute';

configure({ adapter: new Adapter() });

const page = () => (
  <div>
    <h1>Page example</h1>
  </div>
);

describe('<PublicRoute />', () => {
  it('Matches the snapshot', () => {
    const tree = shallow(
      <PublicRoute
        component={page}
        isAuthorized={true}
        path="/"
      />
    );

    expect(toJson(tree)).toMatchSnapshot();
  });
});
