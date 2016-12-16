/**
 * @file TextEditor React Component based on Draft
 * @author Isaac Suttell <isaac@isaacsuttell.com>
 * @see https://facebook.github.io/draft-js/docs/overview.html
 */

import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import Immutable from 'immutable';
import { Editor, EditorState, ContentState, convertFromHTML, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import Icon from 'ship-components-icon';
import StyleButton from './StyleButton';

// CSS Module
import css from './TextEditor.css';

/**
 * Avaiable inline styles to be used with draft-js
 * @type    {Array}
 */
const INLINE_STYLES = [
  {
    label: 'Bold',
    style: 'BOLD',
    iconClass: Icon.format_bold
  },
  {
    label: 'Italic',
    style: 'ITALIC',
    iconClass: Icon.format_italic
  },
  {
    label: 'Underline',
    style: 'UNDERLINE',
    iconClass: Icon.format_underlined
  },
  {
    label: 'Link',
    style: 'LINK',
    iconClass: Icon.insert_link
  }
];

/**
 * Options for convert to HTML
 * @see https://www.npmjs.com/package/draft-js-export-html
 * @type    {Object}
 */
const TO_HTML_OPTIONS = {
  inlineStyles: {
    BOLD: {
      element: 'b'
    },
    UNDERLINE: {
      // When converting back to the right format this needs to be `u` otherwise
      // wise draft-fs doesn't recognize it>
      element: 'u'
    },
    ITALIC: {
      element: 'i'
    }
  }
};

export default class TextEditor extends Component {
  constructor(props) {
    super(props);

    const content = this.convertContentFrom(props);

    this.state = {
      focus: false,
      editorState: EditorState.createWithContent(content)
    };

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.focus = this.focus.bind(this);
    this.handleInlineStyleClick = this.handleInlineStyleClick.bind(this);
  }

  /**
   * Performance catch
   */
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.props.editable ||
           nextState.focus !== this.state.focus ||
           nextState.editorState !== this.state.editorState;
  }

  /**
   * Clean up
   */
  componentWillUnmount() {
    clearTimeout(this.blueTimeoutId);
  }

  /**
   * Get the content depending on the type of data we're passing around
   */
  convertContentFrom(props = this.props) {
    if (!props.value) {
      return ContentState.createFromText('');
    } else if (props.type === 'json') {
      return convertFromRaw(props.value);
    } else if (props.type === 'html') {
      return ContentState.createFromBlockArray(convertFromHTML(props.value));
    } else {
      return props.value;
    }
  }

  /**
   * Convert the content depending on what the parent wants
   */
  convertContentTo() {
    const content = this.state.editorState.getCurrentContent();
    if (this.props.type === 'json') {
      return convertToRaw(content);
    } else if (this.props.type === 'html') {
      return stateToHTML(content, TO_HTML_OPTIONS);
    } else {
      return content;
    }
  }

  /**
   * Keyboard shortcuts
   */
  handleKeyCommand(command) {
    const newEditorStatue = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newEditorStatue) {
      this.handleEditorChange(newEditorStatue);
      return 'handled';
    }
    return 'not-handled';
  }

  /**
   * Text editor change
   */
  handleEditorChange(editorState) {
    // Get the current selection so we can see if we have active focus
    const focus = editorState.getSelection().getHasFocus();

    this.setState({
      editorState,
      focus
    },()=>{
      if (typeof this.props.onChange !== 'function') {
        return;
      }

      // Convert from draft-fs format to html so its seamless with the rest of
      // the application. Should remove this eventually
      const value = this.convertContentTo();

      // limit change events to only times it changed
      this.props.onChange({
        target: {
          value
        }
      });
    });
  }

  /**
   * Refocus the cursor on the editor
   * @public
   */
  focus(){
    this.refs.editor.focus();
  }

  /**
   * Toggle an inline style
   */
  handleInlineStyleClick(inlineStyle, event) {
    if (!this.props.editable) {
      return;
    }
    if (event) {
      event.preventDefault();
    }

    // Generate new state with inline style applied
    const editorState = RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle);

    // Update
    this.handleEditorChange(editorState);
  }

  /**
   * Make it all happen
   * @return    {React}
   */
  render() {
    // Grab the state of the editor, part of draft-fs
    const {editorState} = this.state;

    // Get the current selection so we can see if we have active focus
    const selectionState = editorState.getSelection();

    // Get the current style of the selection so we can change the look of the
    // buttons
    const currentStyle = editorState.getCurrentInlineStyle();

    return (
      <div className={classNames(css.container, this.props.className, 'text-editor', {
        'text-editor--editable': this.props.editable,
        'text-editor--focus': this.state.focus,
        [css.editable]: this.props.editable,
        [css.focus] : this.state.focus
      })}>
        {this.props.editable ?
          <div className={css.controls}>
            {INLINE_STYLES
              // Allow user to select styles to show
              .filter(type => this.props.inlineStyles.has(type.style))
              .map(type => {
                return (
                  <StyleButton
                    key={type.style}
                    editorState={editorState}
                    // Determine if the style is active or not
                    active={selectionState.getHasFocus() && currentStyle.has(type.style)}
                    onMouseDown={this.handleInlineStyleClick.bind(this, type.style)}
                    {...type}
                  />
                );
              })}
          </div>
        : null}
        <div
          onClick={this.focus}
          className={css.editor}
        >
          <Editor
            ref='editor'
            editorState={editorState}
            onChange={this.handleEditorChange}
            handleKeyCommand={this.handleKeyCommand}
            placeholder={this.props.placeholder}
            readOnly={!this.props.editable}
            onFocus={this.props.onFocus}
            onBlur={this.props.onBlur}
            stripPastedStyles={this.props.stripPastedStyles}
            spellCheck={this.props.spellCheck}
            tabIndex={this.props.tabIndex}
          />
        </div>
      </div>
    );
  }
}

/**
 * Type checking
 * @type    {Object}
 */
TextEditor.propTypes = {
  inlineStyles: PropTypes.instanceOf(Immutable.Set),
  focusTimeout: PropTypes.number,
  tabIndex: PropTypes.number,
  className: PropTypes.string,
  editable: PropTypes.bool,
  value: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['html', 'json', 'Immutable']),
  spellCheck: PropTypes.bool,
  stripPastedStyles: PropTypes.bool
};

/**
 * Defaults
 * @type    {Object}
 */
TextEditor.defaultProps = {
  inlineStyles: new Immutable.Set(['BOLD', 'ITALIC', 'UNDERLINE']),
  focusTimeout: 500,
  editable: true,
  type: 'html',
  spellCheck: true,
  stripPastedStyles: true
};
