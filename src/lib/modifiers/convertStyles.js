import { EditorState, Modifier, SelectionState } from 'draft-js';
import BlockTypes from '../BlockTypes';
import InlineStyles from '../InlineStyles';

/**
 * Converts text styles based on editor settings, returns the new editor state
 *
 * @param {EditorState} editorState
 * @param {Object} options
 * @param {boolean} options.allowBlock
 * @param {boolean} options.allowInline
 * @param {boolean} options.allowEntities
 * @return {EditorState}
 */
export function convertStyles(editorState, options) {
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
  // Get all blocks
  const blocks = currentContent.getBlocksAsArray();

  // Loop through all blocks to find styles
  const convertedContent = blocks.reduce((contentState, block) => {
    // Get the current block and select it
    const blockKey = block.getKey();
    const blockText = block.getText();
    const blockSelection = new SelectionState({
      anchorKey: blockKey,
      anchorOffset: 0,
      focusKey: blockKey,
      focusOffset: blockText.length
    });

    // Remove block styles
    if (!options.allowBlock) {
      const blockType = block.getType();
      BlockTypes.forEach(({ style }) => {
        if (style === blockType) {
          contentState = Modifier.setBlockType(contentState, blockSelection, 'unstyled');
        }
      });
    }
    // Remove inline styles
    if (!options.allowInline) {
      InlineStyles.forEach(({ style }) => {
        contentState = Modifier.removeInlineStyle(contentState, blockSelection, style);
      });
    }
    // Remove entities
    if (!options.allowEntities) {
      contentState = Modifier.applyEntity(contentState, blockSelection, null);
    }
    return contentState;
  }, currentContent);

  // Apply content changes
  editorState = EditorState.push(editorState, convertedContent, 'create-entity');

  return editorState;
}
