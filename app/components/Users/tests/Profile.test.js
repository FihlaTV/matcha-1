import React from 'react';
import Profile from 'app/components/Users/Profile';
import toJson from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { currentUser } from 'app/pages/Auth/constants';

describe('Profile', () => {
  describe('render test', () => {
    it('should render', () => {
      const wrapper = shallow(<Profile user={currentUser} photos={[]} />);
      expect(toJson(wrapper)).toMatchSnapshot();
    });
  });
});
