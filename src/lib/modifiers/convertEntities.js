import { EditorState, SelectionState, Modifier } from 'draft-js';
import Immutable from 'immutable';

/**
 * Converts mentions, returns the new editor state
 * @param {EditorState} editorState
 * @param {Immutable.List<import('../Entities').EntityDecorator>} entityDecorators
 * @return {EditorState}
 */
export function convertEntities(editorState, entityDecorators = Immutable.List()) {
  // Get the current content
  let currentContent = editorState.getCurrentContent();
  // Get the current selection
  let selectionState = editorState.getSelection();
  // Get all blocks
  const blocks = currentContent.getBlocksAsArray();

  // Apply entity decorators
  entityDecorators.forEach(entityDecorator => {
    // Loop through all blocks to find entities
    currentContent = blocks.reduce((contentState, block) => {
      // Get the current block
      const blockKey = block.getKey();
      let blockText = block.getText();
  
      // Find entity patterns
      const mentionRegex = entityDecorator.regex;
      let match;
      while (match = mentionRegex.exec(blockText)) {
        const matchedSelectionState = new SelectionState({
          anchorKey: blockKey,
          anchorOffset: match.index,
          focusKey: blockKey,
          focusOffset: match.index + match[0].length
        });
        const isSelected = selectionState.hasEdgeWithin(
          matchedSelectionState.getStartKey(),
          matchedSelectionState.getStartOffset(),
          matchedSelectionState.getEndOffset()
        );
        const result = entityDecorator.convert
          ? entityDecorator.convert(match[0], isSelected)
          : undefined;
        if (result) {
          // Create entity
          contentState = contentState.createEntity(result.type, result.mutability, {
            text: match[0],
            title: result.title
          });
          // Add entity
          const entityKey = contentState.getLastCreatedEntityKey();
          contentState = Modifier.replaceText(contentState, matchedSelectionState, result.text, null, entityKey);
          // Reset block text with replaced text block
          blockText = currentContent.getBlockForKey(blockKey).getText();
          // Reset selection to after the entity, if selection is inside
          // const isSelected = selectionState.hasEdgeWithin(
          //   matchedSelectionState.getStartKey(),
          //   matchedSelectionState.getStartOffset(),
          //   matchedSelectionState.getStartOffset() + result.label.length
          // );
          // if (isSelected) {
          //   selectionState = selectionState.merge({
          //     anchorOffset: matchedSelectionState.getStartOffset() + result.label.length + 1,
          //     focusOffset: matchedSelectionState.getStartOffset() + result.label.length + 1
          //   });
          // }
        }
      }
      return contentState;
    }, currentContent);

    // Apply content changes
    editorState = EditorState.push(editorState, currentContent, 'create-entity');
    // Reset selection to original state
    editorState = EditorState.acceptSelection(editorState, selectionState);
  });

  return editorState;
}
