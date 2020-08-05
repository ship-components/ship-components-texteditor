import { EditorState, RichUtils, SelectionState, EntityInstance, ContentBlock, Modifier } from 'draft-js';
import linkifyIt from 'linkify-it';
import tlds from 'tlds';
import EntityState from '../EntityState';

// Setup Linkify
const linkify = linkifyIt();
linkify.tlds(tlds);

/**
 * Converts inline links, returns the new editor state
 *
 * @param {EditorState} editorState
 * @return {EditorState}
 */
export function convertLinks(editorState) {
  // Get the current content
  const currentContent = editorState.getCurrentContent();
  // Get the current selection
  const selectionState = editorState.getSelection();

  // Loop through all blocks to find links
  const convertedContent = currentContent.getBlocksAsArray().reduce((contentState, block) => {
    // Get the current block text, so we can see if there are matches for links
    const blockKey = block.getKey();
    const blockText = block.getText();

    // Find and update all existing links that were automatically matched
    block.findEntityRanges((character) => {
      // Find all existing match links
      if (character.getEntity() !== null) {
        const entity = contentState.getEntity(character.getEntity());
        if (entity.getType() === 'LINK' && entity.getData().created === 'match') {
          return true;
        }
      }
      return false;
    }, (start, end) => {
      // Check if link is invalid or changed
      const entityText = blockText.slice(start, end);
      const matchLink = linkify.match(entityText);
      if (matchLink === null) {
        // Remove previously matched link entity
        const linkSelectionState = new SelectionState({
          anchorKey: blockKey,
          anchorOffset: start,
          focusKey: blockKey,
          focusOffset: end
        });
        contentState = Modifier.applyEntity(contentState, linkSelectionState, null);
      }
    });

    // Find links based on the current block
    const matchLinks = linkify.match(blockText);
    if (matchLinks !== null) {
      // Loop through each matched link
      for (let i = 0; i < matchLinks.length; i += 1) {
        // Create selection from matched link
        const matchSelectionState = new SelectionState({
          anchorKey: blockKey,
          anchorOffset: matchLinks[i].index,
          focusKey: blockKey,
          focusOffset: matchLinks[i].lastIndex
        });
        // Check if there are any existing links
        const entityState = EntityState.create(contentState, matchSelectionState);
        const previousLink = entityState.isEntityType('LINK') ? entityState.getEntity() : null;
        const previousLinkData = previousLink ? previousLink.getData() : null;
        if (!previousLink) {
          // Create link entity
          contentState = contentState.createEntity('LINK', 'MUTABLE', {
            href: matchLinks[i].url,
            created: 'match'
          });
          // Convert text to a link
          const entityKey = contentState.getLastCreatedEntityKey();
          contentState = Modifier.applyEntity(contentState, matchSelectionState, entityKey);
        } else if (previousLink && previousLinkData.created === 'match') {
          // Check if existing entity has changed
          const previousEntityKey = entityState.getEntityKey();
          if (matchLinks[i].url !== previousLinkData.href) {
            // Modify link entity if matched url has changed
            contentState = contentState.mergeEntityData(previousEntityKey, {
              href: matchLinks[i].url
            });
            contentState = Modifier.applyEntity(contentState, matchSelectionState, previousEntityKey);
          }
        }
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
