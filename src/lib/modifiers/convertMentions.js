import { EditorState, SelectionState, Modifier } from 'draft-js';
import EntityState from '../EntityState';

/**
 * Converts mentions, returns the new editor state
 * @param {EditorState} editorState
 * @return {EditorState}
 */
export function convertMentions(editorState) {
  // Get the current content
  const currentContent = editorState.getCurrentContent();
  // Get the current selection
  const selectionState = editorState.getSelection();
  // Get all blocks
  const blocks = currentContent.getBlocksAsArray();

  // Loop through all blocks to find mentions
  const convertedContent = blocks.reduce((contentState, block) => {
    // Get the current block
    const blockKey = block.getKey();
    const blockText = block.getText();

    // Find mention patterns
    const mentionRegex = /\B@([a-z0-9-_.]+\b)?/gi;
    let match;
    while (match = mentionRegex.exec(blockText)) {
      const matchedUsername = match[1];
      const matchedSelectionState = new SelectionState({
        anchorKey: blockKey,
        anchorOffset: match.index,
        focusKey: blockKey,
        focusOffset: match.index + match[0].length
      });
      const entityState = EntityState.create(contentState, matchedSelectionState);
      const previousMention = entityState.isEntityType('MENTION') ? entityState.getEntity() : null;
      if (!previousMention) {
        const isSelectionInside = selectionState.isCollapsed() && selectionState.hasEdgeWithin(
          matchedSelectionState.getAnchorKey(),
          matchedSelectionState.getAnchorOffset(),
          matchedSelectionState.getEndOffset()
        );
        if (!isSelectionInside && matchedUsername) {
          // Create mention entity
          contentState = contentState.createEntity('MENTION', 'IMMUTABLE', {
            username: matchedUsername
          });
          // Add new mention entity
          const entityKey = contentState.getLastCreatedEntityKey();
          contentState = Modifier.applyEntity(contentState, matchedSelectionState, entityKey);
        }
      } else if (previousMention.getData().username !== matchedUsername) {
        const previousEntityKey = entityState.getEntityKey();
        // Modify existing entity
        contentState = contentState.mergeEntityData(previousEntityKey, {
          username: matchedUsername
        });
        contentState = Modifier.applyEntity(contentState, matchedSelectionState, previousEntityKey);
      }
    }
    return contentState;
  }, currentContent);

  // Apply content changes
  editorState = EditorState.push(editorState, convertedContent, 'create-entity');
  // Reset selection to original state
  editorState = EditorState.acceptSelection(editorState, selectionState);

  return editorState;
}
