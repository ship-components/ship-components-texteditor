/**
 * @file TextEditor React Component based on Draft
 * @author Isaac Suttell <isaac@isaacsuttell.com>
 * @see https://facebook.github.io/draft-js/docs/overview.html
 */
// Modules
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Immutable from 'immutable';
import { Editor, EditorState, RichUtils, CompositeDecorator, Modifier, SelectionState } from 'draft-js';

// Components & Helpers
import StyleButton from './StyleButton';
import Link from './Link';

// lib
import linkStrategy from './lib/linkStrategy';
import LinkTypes from './lib/LinkTypes';
import BlockTypes from './lib/BlockTypes';
import InlineStyles from './lib/InlineStyles';
import ChangeEvent from './lib/ChangeEvent';
import {convertContentFrom, convertContentTo} from './lib/convert';

// CSS Module
import css from './TextEditor.css';

/**
 * Helper function to setup any decorators
 * @param    {Object}    props
 * @return   {Array<Object>}
 */
function setupDecorators(props) {
  // Configure custom decorators
  let decorators = [];

  // Convert links inline
  if (props.convertLinksInline) {
    decorators.push({
      strategy: linkStrategy,
      component: Link
    });
  }

  return decorators;
}

export default class TextEditor extends Component {
  constructor(props) {
    super(props);

    // Convert incoming to somethign draft-js friendly
    const content = convertContentFrom(props.value, props.type);

    // Configure custom decorators
    let decorators = setupDecorators(props);

    // Setup decorators
    const compositeDecorator = new CompositeDecorator(decorators);

    // Create State
    const editorState = EditorState.createWithContent(content, compositeDecorator);

    // Set state the first time
    this.state = {
      focus: false,
      editorState
    };

    // Binding
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.focus = this.focus.bind(this);
    this.handleInlineStyleClick = this.handleInlineStyleClick.bind(this);
    this.handleBlockStyleClick = this.handleBlockStyleClick.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
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
   * Public method to cause the editor to reread it's props.value. Often used
   * when resetting the form.
   * @public
   * @example this.refs.editor.forceUpdate();
   */
  forceUpdateState(props = this.props) {
    // Convert incoming to somethign draft-js friendly
    const content = convertContentFrom(props.value, props.type);

    // Generate new date
    const updatedEditorState = EditorState.push(this.state.editorState, content);

    // Update
    this.handleEditorChange(updatedEditorState);
  }

  /**
   * Keyboard shortcuts
   */
  handleKeyCommand(command) {
    let content;
    let editor;
    let {editorState} = this.state;

    const newEditorStatue = RichUtils.handleKeyCommand(editorState, command);

    // Split the selected block into two blocks on 'Enter' command.
    // ONLY ON HTML TYPE
    // @see https://draftjs.org/docs/api-reference-modifier.html#splitblock
    if (command === 'split-block' && this.props.type === 'html') {
      content = Modifier
        .splitBlock(editorState.getCurrentContent(), editorState.getSelection());
      editor = EditorState.push(editorState, content, 'split-block');

      this.handleEditorChange(editor);
      return 'handled';
    } else if (newEditorStatue) {
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
    }, () => {
      if (typeof this.props.onChange !== 'function') {
        return;
      }

      // Convert from draft-fs format to html so its seamless with the rest of
      // the application. Should remove this eventually
      const value = convertContentTo(this.state.editorState.getCurrentContent(), this.props.type);

      let event = new ChangeEvent(value, {
        ref: this
      });

      // limit change events to only times it changed
      this.props.onChange(event);
    });
  }

  /**
   * Refocus the cursor on the editor
   * @public
   */
  focus() {
    this.refs.editor.focus();
  }

  /**
   * Toggle an inline style
   */
  handleInlineStyleClick(inlineStyle, event) {
    if (!this.props.editable) {
      return;
    } else if (event) {
      event.preventDefault();
    }

    // Generate new state with inline style applied
    const editorState = RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle);

    // Update
    this.handleEditorChange(editorState);
  }

  /**
   * Toggle an inline style
   */
  handleBlockStyleClick(blockStyle, event) {
    if (!this.props.editable) {
      return;
    } else if (event) {
      event.preventDefault();
    }

    // Generate new state with block style applied
    const editorState = RichUtils.toggleBlockType(this.state.editorState, blockStyle);

    // Update
    this.handleEditorChange(editorState);
  }

  /**
   * Determine if there are any links in the selection block
   * @return {{entity: DraftEntityInstance, start: number, end: number, block: ContentBlock}|null}
   */
  getCurrentLink() {
    const editorState = this.state.editorState;
    const selectionState = editorState.getSelection();
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(selectionState.getStartKey());

    let matchedEntity = null;
    let matchedEntityInSelection = null;
    block.findEntityRanges((character) => {
      if (character.getEntity() !== null) {
        const entity = content.getEntity(character.getEntity());
        if (entity.getType() === 'LINK') {
          matchedEntity = entity;
          return true;
        }
      }
      return false;
    }, (start, end) => {
      const selStart = selectionState.getStartOffset();
      const selEnd = selectionState.getEndOffset();
      if (start <= selEnd && selStart <= end) {
        matchedEntityInSelection = {
          entity: matchedEntity,
          block: block,
          start: start,
          end: end
        };
      }
    });
    return matchedEntityInSelection;
  }

  /**
   * Toggle a link element
   */
  handleLinkClick(linkAction, event) {
    if (!this.props.editable) {
      return;
    } else if (event) {
      event.preventDefault();
    }

    const currentLink = this.getCurrentLink();
    const editorState = this.state.editorState;
    const content = editorState.getCurrentContent();
    let selectionState = editorState.getSelection();
    
    // If selection is collapsed, find full link
    if (selectionState.isCollapsed()) {
      selectionState = new SelectionState({
        anchorKey: currentLink.block.getKey(),
        anchorOffset: currentLink.start,
        focusKey: currentLink.block.getKey(),
        focusOffset: currentLink.end,
        isBackwards: false,
        hasFocus: false
      });
      console.log(selectionState);
    }

    let defaultUrl = 'http://';

    switch (linkAction) {
      case 'DELETE':
        // Delete a link
        this.handleEditorChange(RichUtils.toggleLink(editorState, selectionState, null));
        break;

      case 'EDIT':
      default:
        // Find current link
        if (currentLink !== null) {
          // Set default to current link href
          defaultUrl = currentLink.entity.getData().href;
        }

      case 'ADD':
        // Ask for link URL
        const newHref = window.prompt('Set Link URL', defaultUrl);
        if (newHref === null) {
          // User cancelled
          return;
        } else if (newHref.trim() === '' || newHref.trim() === defaultUrl) {
          // Used entered empty string or kept default - remove link
          this.handleEditorChange(RichUtils.toggleLink(editorState, selectionState, null));
          return;
        }
        // Set link in content
        const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
          href: newHref
        });
        const newEditorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
        const entityKey = contentWithEntity.getLastCreatedEntityKey();
        this.handleEditorChange(RichUtils.toggleLink(newEditorState, selectionState, entityKey));
    }
  }

  /**
   * Make it all happen
   * @return    {React}
   */
  render() {
    // Grab the props
    const {noStyleButtons, onlyInline} = this.props;

    // Grab the state of the editor, part of draft-fs
    const {editorState} = this.state;

    // Get the current selection so we can see if we have active focus
    const selectionState = editorState.getSelection();

    // Get the current style of the selection so we can change the look of the buttons
    const currentInlineStyle = editorState.getCurrentInlineStyle();

    // Determing the current block type
    const content = editorState.getCurrentContent();
    const blockType = content.getBlockForKey(selectionState.getStartKey()).getType();
    const currentIsLink = this.getCurrentLink() !== null;

    return (
      <div className={classNames(css.container, this.props.className, 'text-editor', {
        'text-editor--editable': this.props.editable,
        'text-editor--focus': this.state.focus,
        [css.editable]: this.props.editable,
        [css.focus] : this.state.focus
      })}>
        {this.props.editable && !noStyleButtons ?
          <div className={css.controls}>
            {InlineStyles
              // Allow user to select styles to show
              .filter(type => this.props.inlineStyles.has(type.style))
              .map(type =>
                <StyleButton
                  className={this.props.buttonClass}
                  key={type.style}
                  // Determine if the style is active or not
                  active={selectionState.getHasFocus() && currentInlineStyle.has(type.style)}
                  onClick={this.handleInlineStyleClick.bind(this, type.style)}
                  {...type}
                />
              )}
            {LinkTypes
              // Allow user to create links
              .filter(type => this.props.inlineStyles.has('LINK') && type.whenLink === currentIsLink)
              .map((type, key) =>
                <StyleButton
                  className={this.props.buttonClass}
                  key={key}
                  // Determine if the style is active or not
                  active={selectionState.getHasFocus() && currentIsLink}
                  onClick={this.handleLinkClick.bind(this, type.action)}
                  {...type}
                />
              )}
            {!onlyInline ? BlockTypes
              // Allow user to select styles to show
              .filter(type => this.props.blockTypes.has(type.style))
              .map(type =>
                <StyleButton
                  className={this.props.buttonClass}
                  key={type.style}
                  active={type.style === blockType}
                  onClick={this.handleBlockStyleClick.bind(this, type.style)}
                  {...type}
                />
              ) : null}
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
            placeholder={this.props.editable ? this.props.placeholder : void 0}
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
  blockTypes: PropTypes.instanceOf(Immutable.Set),
  tabIndex: PropTypes.number,
  className: PropTypes.string,
  buttonClass: PropTypes.string,
  editable: PropTypes.bool,
  value: PropTypes.any.isRequired,
  type: PropTypes.oneOf(['html', 'json', 'Immutable']),
  spellCheck: PropTypes.bool,
  convertLinksInline: PropTypes.bool,
  stripPastedStyles: PropTypes.bool,
  noStyleButtons: PropTypes.bool,
  onlyInline: PropTypes.bool
};

/**
 * Defaults
 * @type    {Object}
 */
TextEditor.defaultProps = {
  noStyleButtons: false,
  onlyInline: false,
  inlineStyles: new Immutable.Set(['BOLD', 'ITALIC', 'UNDERLINE', 'STRIKETHROUGH', 'LINK', 'CODE']),
  blockTypes: new Immutable.Set(['blockquote', 'code-block', 'unordered-list-item', 'ordered-list-item', 'header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six']),
  editable: true,
  type: 'html',
  spellCheck: true,
  convertLinksInline: true,
  stripPastedStyles: true
};
