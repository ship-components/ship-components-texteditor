// Don't need to test these and they currently throw errors
jest.setMock('ship-components-icon', 'div');

import React from 'react';
import TestUtils from 'react-dom/test-utils';
import Immutable from 'immutable';
import {mount} from 'enzyme';
import { EditorState } from 'draft-js';

describe('TextEditor', () => {
  let props = {
    inlineStyles: new Immutable.Set(['BOLD', 'ITALIC', 'UNDERLINE', 'STRIKETHROUGH', 'CODE']),
    blockTypes: new Immutable.Set(['blockquote', 'code-block', 'unordered-list-item', 'ordered-list-item', 'header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six']),
    value: 'Test'
  };

  let TextEditor;

  beforeEach(() => {
    TextEditor = require('../TextEditor').default;
  });

  // Render without error
  it('should render without error', () => {
    let element = React.createElement(
       TextEditor, // component class
       props
    );

    expect(() => TestUtils.renderIntoDocument(element))
       .not.toThrow();
  });

  it('fires a change handler', () => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <TextEditor
        value='test content'
        onChange={handleChange}
      />
    );

    expect(handleChange).not.toHaveBeenCalled();
    const reactEl = wrapper.instance();
    reactEl.handleEditorChange(wrapper.state('editorState'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('should support custom css classes', () => {
    let className = 'testClass';
    let reactTree = TestUtils.renderIntoDocument(
      <TextEditor
        className={className}
        {...props}
      />
    );
    let comp = TestUtils.findRenderedDOMComponentWithClass(reactTree, className);

    expect(comp).toBeDefined();
  });
});
