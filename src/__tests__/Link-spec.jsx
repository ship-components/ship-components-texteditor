/**
 * Test Link component
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';

describe('Link', () => {
  const Link = require('../Link').default;

  it('should render without error', () => {
    let element = React.createElement(
       Link,
       {decoratedText: 'www.internet.com'},
       'test'
    );

    expect(() => TestUtils.renderIntoDocument(element))
       .not.toThrow();
  });

  it('should match snapshot', () => {
    const wrapper = mount(
      <Link
        alt='100 years forever Rick and Morty'
        title='Interdimensional Twitter'
        decoratedText='https://twitter.com/RickandMorty'
        className='real-classy-stuff'
      >
        Wubba lubba dub dub!
      </Link>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
