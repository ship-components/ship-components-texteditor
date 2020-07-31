import { EditorState, Modifier, SelectionState } from 'draft-js';
import BlockTypes from './BlockTypes';
import InlineStyles from './InlineStyles';


/**
 * Converts text styles based on editor settings, returns the new editor state
 *
 * @param {EditorState} editorState
 * @param {SelectionState} selectionState
 * @param {Object} options
 * @param {Boolean} options.allowBlock
 * @param {Boolean} options.allowInline
 * @param {Boolean} options.allowEntities
 * @return {EditorState}
 */
export function convertStyles(editorState, selectionState, options) {
  // Defaults
  options = Object.assign({
    allowBlock: true,
    allowInline: true,
    allowEntities: true
  }, options);

  // No changes needed
  if (options.allowBlock && options.allowInline && options.allowEntities) {
    return editorState;
  }

  // Get the current content
  let currentContent = editorState.getCurrentContent();

  // Remove block styles
  if (!options.allowBlock) {
    const block = currentContent.getBlockForKey(selectionState.getStartKey());
    const blockType = block.getType();
    BlockTypes.forEach(({ style }) => {
      if (style === blockType) {
        currentContent = Modifier.setBlockType(currentContent, selectionState, 'unstyled');
      }
    });
  }
  // Remove inline styles
  if (!options.allowInline) {
    InlineStyles.forEach(({ style }) => {
      currentContent = Modifier.removeInlineStyle(currentContent, selectionState, style);
    });
  }
  // Remove entities
  if (!options.allowEntities) {
    currentContent = Modifier.applyEntity(currentContent, selectionState, null);
  }

  // Set new editor content
  editorState = EditorState.push(editorState, currentContent, 'convert-styles');

  return editorState;
}

/**
 * Converts text styles based on editor settings, returns the new editor state
 *
 * @param {EditorState} editorState
 * @param {Object} options
 * @param {Boolean} options.allowBlock
 * @param {Boolean} options.allowInline
 * @param {Boolean} options.allowEntities
 * @return {EditorState}
 */
export function convertAllStyles(editorState, options) {
  // Defaults
  options = Object.assign({
    allowBlock: true,
    allowInline: true,
    allowEntities: true
  }, options);

  // No changes needed
  if (options.allowBlock && options.allowInline && options.allowEntities) {
    return editorState;
  }

  // Get the current content
  const currentContent = editorState.getCurrentContent();
  // Get the current selection
  const selectionState = editorState.getSelection();

  // Loop thorugh all blocks
  const contentWithoutStyles = currentContent.getBlocksAsArray().reduce((contentState, block) => {
    const blockKey = block.getKey();
    const blockText = block.getText();
    const selection = new SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: blockText.length
    });
    // Remove block types
    if (!options.allowBlock) {
      const blockType = block.getType();
      BlockTypes.forEach(({ style }) => {
        if (style === blockType) {
          contentState = Modifier.setBlockType(contentState, selection, 'unstyled');
        }
      });
    }
    // Remove inline styles
    if (!options.allowInline) {
      InlineStyles.forEach(({ style }) => {
        contentState = Modifier.removeInlineStyle(contentState, selection, style);
      });
    }
    // Remove entities
    if (!options.allowEntities) {
      contentState = Modifier.applyEntity(contentState, selection, null);
    }
    // Return new content state
    return contentState;
  }, currentContent);

  // Set new editor content
  editorState = EditorState.push(editorState, contentWithoutStyles, 'convert-styles');
  // Reset selection to original state
  editorState = EditorState.acceptSelection(editorState, selectionState);

  return editorState;
}
