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
import { Editor, EditorState, RichUtils, CompositeDecorator, Modifier } from 'draft-js';
import linkifyIt from 'linkify-it';
import tlds from 'tlds';

// Components & Helpers
import StyleButton from './StyleButton';
import Autocomplete from './Autocomplete';
import Link from './Link/Link';
import LinkModal from './Link/LinkModal';
import Mention from './Mention/Mention';
import MentionSuggestion from './Mention/MentionSuggestion';
import { ModalActions } from 'ship-components-dialog';

// Lib
import EntityState from './lib/EntityState';
import linkStrategy from './lib/decorators/linkStrategy';
import mentionStrategy from './lib/decorators/mentionStrategy';
import mentionSuggestionStrategy from './lib/decorators/mentionSuggestionStrategy';
import LinkTypes from './lib/LinkTypes';
import BlockTypes from './lib/BlockTypes';
import InlineStyles from './lib/InlineStyles';
import ChangeEvent from './lib/ChangeEvent';
import { convertContentFrom, convertContentTo } from './lib/convert';
import { convertStyles } from './lib/modifiers/convertStyles';
import { convertLinks } from './lib/modifiers/convertLinks';
import { convertMentions } from './lib/modifiers/convertMentions';

// CSS Module
import css from './TextEditor.css';

// Setup Linkify
const linkify = linkifyIt();
linkify.tlds(tlds);

/**
 * Helper function to setup any decorators
 * @param    {Object}    props
 * @return   {Array<import('draft-js').DraftDecorator>}
 */
function setupDecorators(props) {
  // Configure custom decorators
  let decorators = [];

  // Add link component support
  decorators.push({
    strategy: linkStrategy,
    component: Link
  });

  // Add mention component support
  decorators.push({
    strategy: mentionSuggestionStrategy,
    component: MentionSuggestion
  });
  decorators.push({
    strategy: mentionStrategy,
    component: Mention
  });

  return decorators;
}

export default class TextEditor extends Component {
  constructor(props) {
    super(props);

    // Convert incoming to somethign draft-js friendly
    const content = convertContentFrom(props.value, props.type);

    // Setup decorators
    const decorators = new CompositeDecorator(setupDecorators(props));

    // Create editor state
    let editorState = EditorState.createWithContent(content, decorators);

    // Convert styles if neccessary
    editorState = convertStyles(editorState, {
      allowBlock: !props.onlyInline
    });

    // Convert links if neccessary
    if (this.props.convertLinksInline) {
      editorState = convertLinks(editorState);
    }

    // Convert mentions if neccessary
    editorState = convertMentions(editorState);

    // Create entity state
    const currentContent = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const entityState = EntityState.create(currentContent, selectionState);

    // Set state the first time
    this.state = {
      editorState,
      entityState,
      suggestions: props.suggestions
    };

    // Binding
    this.focus = this.focus.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleInlineStyleClick = this.handleInlineStyleClick.bind(this);
    this.handleBlockStyleClick = this.handleBlockStyleClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
    this.forceUpdate = this.forceUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      suggestions: nextProps.suggestions
    });
  }

  /**
   * Performance catch
   */
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.editable !== this.props.editable ||
           nextProps.suggestions !== this.props.suggestions ||
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
   * Refocus the cursor on the editor
   * @public
   */
  focus() {
    this.refs.editor.focus();
  }

  /**
   * Keyboard shortcuts
   */
  handleKeyCommand(command) {
    let content;
    let editor;
    let { editorState } = this.state;

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
   * @param {EditorState} editorState
   */
  handleEditorChange(editorState) {
    // Convert styles if neccessary
    editorState = convertStyles(editorState, {
      allowBlock: !this.props.onlyInline
    });

    // Convert links if neccessary
    if (this.props.convertLinksInline) {
      editorState = convertLinks(editorState);
    }

    // Convert mentions if neccessary
    editorState = convertMentions(editorState);

    // Entity state
    const currentContent = editorState.getCurrentContent();
    const selectionState = editorState.getSelection();
    const entityState = EntityState.create(currentContent, selectionState);

    this.setState({
      editorState,
      entityState
    }, () => {
      if (typeof this.props.onChange !== 'function') {
        return;
      }

      // Convert from draft-fs format to html so its seamless with the rest of
      // the application. Should remove this eventually
      const value = convertContentTo(this.state.editorState.getCurrentContent(), this.props.type);

      let event = new ChangeEvent(value, {
        ref: this,
        editorState,
        entityState
      });

      // limit change events to only times it changed
      this.props.onChange(event);
    });
  }

  /**
   * MouseDown on a button
   */
  handleMouseDown(event) {
    // Prevent losing focus of editor
    event.preventDefault();
  }

  /**
   * Toggle an inline style
   */
  handleInlineStyleClick(inlineStyle, event) {
    if (!this.props.editable) {
      return;
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
    }

    // Generate new state with block style applied
    const editorState = RichUtils.toggleBlockType(this.state.editorState, blockStyle);

    // Update
    this.handleEditorChange(editorState);
  }

  /**
   * Toggle a link element
   */
  handleLinkClick(linkAction, event) {
    if (!this.props.editable) {
      return;
    }

    let editorState = this.state.editorState;
    const currentContent = editorState.getCurrentContent();
    const entityState = this.state.entityState;

    // Find current link, if any
    const currentLinkEntity = entityState.isEntityType('LINK')
      ? entityState.getEntity()
      : null;

    // If selection is collapsed, find selection around full link
    let selectionState = editorState.getSelection();
    if (currentLinkEntity && selectionState.isCollapsed()) {
      selectionState = entityState.getEntitySelection();
    }

    let title = 'Add Link';
    let defaultUrl = '';

    switch (linkAction) {
    case 'DELETE':
        // Delete a link
      editorState = RichUtils.toggleLink(editorState, selectionState, null);
      this.handleEditorChange(editorState);
      break;

    case 'EDIT':
    default:
        // Find current link
      if (currentLinkEntity) {
          // Set default to current link href
        title = 'Edit Link';
        defaultUrl = currentLinkEntity.getData().href;
      }

    case 'ADD':
        // Ask for link URL
      ModalActions.open(
        <LinkModal
          title={title}
          href={defaultUrl}
        />
        ).then((modalState) => {
          // Check if href was entered
          const enteredHref = modalState.href;
          if (enteredHref.trim() !== '') {
            // Parse link href
            const links = linkify.match(enteredHref);
            const newHref = (links !== null) ? links[0].url : enteredHref;
            // Set link entity
            const contentWithEntity = currentContent.createEntity('LINK', 'MUTABLE', {
              href: newHref,
              created: 'insert'
            });
            const entityKey = contentWithEntity.getLastCreatedEntityKey();
            if (selectionState.isCollapsed()) {
              // No selection, create link
              const contentWithEntityText = Modifier.insertText(currentContent, selectionState, newHref, null, entityKey);
              editorState = EditorState.push(editorState, contentWithEntityText, 'create-entity');
            } else {
              // Convert selection into link
              editorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
            }
            editorState = RichUtils.toggleLink(editorState, selectionState, entityKey);
          } else {
            // Used entered empty string - remove link
            editorState = RichUtils.toggleLink(editorState, selectionState, null);
          }
          // Update editor with changes
          this.handleEditorChange(editorState);
        }).catch(() => {
          // User cancelled, do nothing
        });
    }
  }

  /**
   * Click handler for an autocomplete suggestion
   */
  handleSuggestionClick(suggestion) {
    let editorState = this.state.editorState;
    const currentContent = this.state.editorState.getCurrentContent();
    const entitySelection = this.state.entityState.getEntitySelection();
    // Add suggestion
    const contentWithEntityText = Modifier.replaceText(currentContent, entitySelection, `${suggestion} `);
    editorState = EditorState.push(editorState, contentWithEntityText, 'create-entity');
    // Update editor with changes
    this.handleEditorChange(editorState);
  }

  /**
   * Make it all happen
   * @return    {React}
   */
  render() {
    // Grab the props
    const { noStyleButtons, onlyInline } = this.props;

    // Grab the state of the editor, part of draft-fs
    const { editorState, entityState, suggestions } = this.state;

    // Get the current selection so we can see if we have active focus
    const selectionState = editorState.getSelection();

    // Determining whether the editor is focused or not
    const isFocused = selectionState.getHasFocus();

    // Get the current style of the selection so we can change the look of the buttons
    const currentInlineStyle = editorState.getCurrentInlineStyle();

    // Determing the current block type
    const currentContent = editorState.getCurrentContent();
    const blockType = currentContent.getBlockForKey(selectionState.getStartKey()).getType();

    // Determining if a link is selected
    const currentIsLink = entityState.isEntityType('LINK');

    return (
      <div className={classNames(css.container, this.props.className, 'text-editor', {
        'text-editor--editable': this.props.editable,
        'text-editor--focus': isFocused,
        [css.editable]: this.props.editable,
        [css.focus] : isFocused
      })}
      >
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
                  onMouseDown={this.handleMouseDown}
                  onClick={this.handleInlineStyleClick.bind(this, type.style)}
                  {...type}
                />
              )}
            {LinkTypes
              // Allow user to create links
              .filter(type => this.props.inlineStyles.has('LINK') && type.whenLink === currentIsLink)
              .map(type =>
                <StyleButton
                  className={this.props.buttonClass}
                  key={type.action}
                  // Determine if the style is active or not
                  active={selectionState.getHasFocus() && currentIsLink}
                  onMouseDown={this.handleMouseDown}
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
                  onMouseDown={this.handleMouseDown}
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
            handleKeyCommand={this.handleKeyCommand}
            onBlur={this.props.onBlur}
            onChange={this.handleEditorChange}
            onFocus={this.props.onFocus}
            placeholder={this.props.editable ? this.props.placeholder : void 0}
            readOnly={!this.props.editable}
            stripPastedStyles={this.props.stripPastedStyles}
            spellCheck={this.props.spellCheck}
            tabIndex={this.props.tabIndex}
          />
        </div>
        <Autocomplete
          suggestions={suggestions}
          onClick={this.handleSuggestionClick}
        />
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
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['html', 'text', 'json', 'Immutable']),
  suggestions: PropTypes.instanceOf(Immutable.OrderedMap),
  convertLinksInline: PropTypes.bool,
  noStyleButtons: PropTypes.bool,
  onlyInline: PropTypes.bool,
  spellCheck: PropTypes.bool,
  stripPastedStyles: PropTypes.bool,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func
};

/**
 * Defaults
 * @type    {Object}
 */
TextEditor.defaultProps = {
  inlineStyles: new Immutable.Set(['BOLD', 'ITALIC', 'UNDERLINE', 'STRIKETHROUGH', 'LINK', 'CODE']),
  blockTypes: new Immutable.Set(['blockquote', 'code-block', 'unordered-list-item', 'ordered-list-item', 'header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six']),
  tabIndex: undefined,
  className: undefined,
  buttonClass: undefined,
  editable: true,
  placeholder: undefined,
  type: 'html',
  suggestions: undefined,
  convertLinksInline: true,
  noStyleButtons: false,
  onlyInline: false,
  spellCheck: true,
  stripPastedStyles: true,
  onChange: undefined,
  onFocus: undefined,
  onBlur: undefined
};
