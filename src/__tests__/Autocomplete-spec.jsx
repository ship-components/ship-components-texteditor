/**
 * Test Autocomplete component
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import Immutable from 'immutable';

describe('Autocomplete', () => {
  const Autocomplete = require('../Autocomplete').default;

  it('should render without error', () => {
    const suggestions = new Immutable.OrderedMap({
      'rick': 'Rick',
      'morty': 'Morty'
    });
    let element = React.createElement(Autocomplete, {
      suggestions
    });

    expect(() => TestUtils.renderIntoDocument(element)).not.toThrow();
  });

  it('should match snapshot when suggestions are passed', () => {
    const suggestions = new Immutable.OrderedMap({
      'rick': 'Rick',
      'morty': 'Morty'
    });
    const wrapper = mount(
      <Autocomplete
        suggestions={suggestions}
        className='real-classy-stuff'
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match snapshot when an empty list of suggestions are passed', () => {
    const suggestions = new Immutable.OrderedMap();
    const wrapper = mount(
      <Autocomplete
        suggestions={suggestions}
        className='real-classy-stuff'
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should match snapshot when suggestions are not passed', () => {
    const wrapper = mount(
      <Autocomplete
        className='real-classy-stuff'
      />
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
