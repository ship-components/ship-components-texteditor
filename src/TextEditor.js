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
import linkifyIt from 'linkify-it';
import tlds from 'tlds';

// Components & Helpers
import StyleButton from './StyleButton';
import Link from './Link';
import { ModalActions } from 'ship-components-dialog';

// Lib
import linkStrategy from './lib/linkStrategy';
import LinkTypes from './lib/LinkTypes';
import LinkModal from './lib/LinkModal';
import BlockTypes from './lib/BlockTypes';
import InlineStyles from './lib/InlineStyles';
import ChangeEvent from './lib/ChangeEvent';
import { convertContentFrom, convertContentTo } from './lib/convert';

// CSS Module
import css from './TextEditor.css';

// Setup Linkify
const linkify = linkifyIt();
linkify.tlds(tlds);

/**
 * Helper function to setup any decorators
 * @param    {Object}    props
 * @return   {Array<Object>}
 */
function setupDecorators(props) {
  // Configure custom decorators
  let decorators = [];

  // Add link component support
  decorators.push({
    strategy: linkStrategy,
    component: Link
  });

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
      editorState,
      linkState: null
    };

    // Binding
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.focus = this.focus.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleInlineStyleClick = this.handleInlineStyleClick.bind(this);
    this.handleBlockStyleClick = this.handleBlockStyleClick.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.handleLinkChange = this.handleLinkChange.bind(this);
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
   * @param {Immutable} editorState
   */
  handleEditorChange(editorState) {
    // Get the current selection so we can see if we have active focus
    const selectionState = editorState.getSelection();
    const focus = selectionState.getHasFocus();

    // Convert links inline
    if (this.props.convertLinksInline) {
      // Get the current content
      const previousContent = this.state.editorState.getCurrentContent();
      let currentContent = editorState.getCurrentContent();

      if (previousContent.isEmpty(currentContent)) {
        // Get the current block, so we can see if there are matches for links
        let block = currentContent.getBlockForKey(selectionState.getStartKey());

        // First, find and remove all existing links that were automatically matched
        block.findEntityRanges((character) => {
          // Find all existing match links
          if (character.getEntity() !== null) {
            const entity = currentContent.getEntity(character.getEntity());
            if (entity.getType() === 'LINK' && entity.getData().created === 'match') {
              return true;
            }
          }
          return false;
        }, (start, end) => {
          // Remove previous match links
          const linkSelectionState = new SelectionState({
            anchorKey: block.getKey(),
            anchorOffset: start,
            focusKey: block.getKey(),
            focusOffset: end
          });
          // Remove entity, reset immutable states
          editorState = RichUtils.toggleLink(editorState, linkSelectionState, null);
          currentContent = editorState.getCurrentContent();
          block = currentContent.getBlockForKey(selectionState.getStartKey());
        });

        // Second, find links based on the current block
        const links = linkify.match(block.get('text'));
        if (links !== null) {
          // Loop through each matched link
          for (let i = 0; i < links.length; i += 1) {
            // Create selection from matched link
            const textSelectionState = new SelectionState({
              anchorKey: block.getKey(),
              anchorOffset: links[i].index,
              focusKey: block.getKey(),
              focusOffset: links[i].lastIndex
            });
            // Check if there are any existing links
            const previousLink = this.getLink(editorState, textSelectionState);
            if (!previousLink) {
              // Create link entity
              const contentWithEntity = currentContent.createEntity('LINK', 'MUTABLE', {
                href: links[i].url,
                created: 'match'
              });
              const entityKey = contentWithEntity.getLastCreatedEntityKey();
              // Convert text to a link
              editorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
              editorState = RichUtils.toggleLink(editorState, textSelectionState, entityKey);
            }
          }
        }

        // Reset selection to original state
        editorState = EditorState.acceptSelection(editorState, selectionState);
      }
    }

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
   * Determine if there are any links in the selection block
   * @param  {Immutable} editorState
   * @param  {Immutable} selectionState
   * @return {{entity: DraftEntityInstance, block: ContentBlock, blockKey: string, selection: SelectionState}|null}
   */
  getLink(editorState = this.state.editorState, selectionState = this.state.editorState.getSelection()) {
    const currentContent = editorState.getCurrentContent();
    const block = currentContent.getBlockForKey(selectionState.getStartKey());
    // Initiate matches to null
    let matchedEntity = null;
    let matchedEntityKey = null;
    let matchedEntityInSelection = null;
    block.findEntityRanges((character) => {
      // Find all entities
      if (character.getEntity() !== null) {
        const entity = currentContent.getEntity(character.getEntity());
        if (entity.getType() === 'LINK') {
          // Matched a link entity
          matchedEntity = entity;
          matchedEntityKey = character.getEntity();
          return true;
        }
      }
      return false;
    }, (start, end) => {
      const selStart = selectionState.getStartOffset();
      const selEnd = selectionState.getEndOffset();
      // Check if selection and found entity overlaps
      if (start <= selEnd && selStart <= end) {
        // Set matched link to be returned
        matchedEntityInSelection = {
          entity: matchedEntity,
          entityKey: matchedEntityKey,
          block: block,
          selection: new SelectionState({
            anchorKey: block.getKey(),
            anchorOffset: start,
            focusKey: block.getKey(),
            focusOffset: end
          })
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
    }

    const currentLink = this.getLink();
    let editorState = this.state.editorState;
    let selectionState = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();

    // If selection is collapsed, find full link
    if (currentLink && selectionState.isCollapsed()) {
      selectionState = currentLink.selection;
    }

    let title = 'Add Link';
    let defaultUrl = '';

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
          title = 'Edit Link';
          defaultUrl = currentLink.entity.getData().href;
        }

      case 'ADD':
        // Ask for link URL
        ModalActions.open(
          <LinkModal
            title={title}
            href={defaultUrl}
            onConfirm={this.handleLinkChange}
          />
        ).then(() => {
          // Check if href was entered
          const enteredHref = this.state.linkState.href;
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
            // Remove any previous links
            if (currentLink) {
              editorState = RichUtils.toggleLink(editorState, selectionState, null);
            }
            // Create link
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
   * Handle link element property changes
   */
  handleLinkChange(state) {
    this.setState({
      linkState: state
    });
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
    const currentContent = editorState.getCurrentContent();
    const blockType = currentContent.getBlockForKey(selectionState.getStartKey()).getType();
    const currentIsLink = this.getLink() !== null;

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
