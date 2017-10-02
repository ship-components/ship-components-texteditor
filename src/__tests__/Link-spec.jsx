/**
 * Test Link component
 */

import React from 'react';
import TestUtils from 'react-dom/test-utils';

describe('Link', () => {
  const Link = require('../Link').default;

  it('should render without error', () => {
    let element = React.createElement(
       Link,
       {decoratedText: 'https://github.com'},
       'Wubba lubba dub dub!'
    );

    expect(() => TestUtils.renderIntoDocument(element))
       .not.toThrow();
  });
});
