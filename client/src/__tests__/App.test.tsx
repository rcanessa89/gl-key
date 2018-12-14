import { AppRouter } from '@router';
import store from '@store';
import { configure, shallow, ShallowWrapper } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { Provider } from 'react-redux';
import App from '../App';

configure({ adapter: new Adapter() });

describe('<App />', () => {
  let shallowApp: ShallowWrapper;

  beforeEach(() => {
    shallowApp = shallow(<App />);
  });

  it('Matches the snapshot', () => {
    expect(toJson(shallowApp)).toMatchSnapshot();
  });

  it('Should has redux Provider', () => {
    expect(shallowApp.find(Provider).exists()).toBe(true);
    expect(shallowApp.find(Provider).props()).toHaveProperty('store', store);
  });

  it('Should has a AppRouter component', () => {
    expect(shallowApp.find(AppRouter).exists()).toBe(true);
  });
});
