/**
 * Test Mention component
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Mention', () => {
  const Mention = require('../Mention/Mention').default;

  it('should render without error', () => {
    let element = React.createElement(Mention, {}, 'test');

    expect(() => TestUtils.renderIntoDocument(element)).not.toThrow();
  });

  it('should match snapshot', () => {
    const wrapper = mount(
      <Mention
        title='Morty'
        className='real-classy-stuff'
      >
        @morty
      </Mention>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
