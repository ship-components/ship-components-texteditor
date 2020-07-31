import { EditorState, RichUtils, SelectionState, EntityInstance, ContentBlock } from 'draft-js';
import linkifyIt from 'linkify-it';
import tlds from 'tlds';

// Setup Linkify
const linkify = linkifyIt();
linkify.tlds(tlds);

/**
 * Converts inline links, returns the new editor state
 * @param {EditorState} editorState
 * @return {EditorState}
 */
export function convertLinks(editorState) {
  // Get the current content
  let currentContent = editorState.getCurrentContent();
  // Get the current selection
  const selectionState = editorState.getSelection();

  // Loop through all blocks to find links
  currentContent.getBlocksAsArray().forEach((block) => {
    // Get the current block text, so we can see if there are matches for links
    const blockText = block.getText();

    // Find and update all existing links that were automatically matched
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
      // Check if link is invalid or changed
      const entityText = blockText.slice(start, end);
      const matchLink = linkify.match(entityText);
      if (matchLink === null) {
        // Remove previously matched link entity
        const linkSelectionState = new SelectionState({
          anchorKey: block.getKey(),
          anchorOffset: start,
          focusKey: block.getKey(),
          focusOffset: end
        });
        editorState = RichUtils.toggleLink(editorState, linkSelectionState, null);
        // Reset selection to original state
        editorState = EditorState.acceptSelection(editorState, selectionState);
        // Reset immutable content state reference
        currentContent = editorState.getCurrentContent();
      }
    });

    // Find links based on the current block
    const matchLinks = linkify.match(blockText);
    if (matchLinks !== null) {
      // Loop through each matched link
      for (let i = 0; i < matchLinks.length; i += 1) {
        // Create selection from matched link
        const matchSelectionState = new SelectionState({
          anchorKey: block.getKey(),
          anchorOffset: matchLinks[i].index,
          focusKey: block.getKey(),
          focusOffset: matchLinks[i].lastIndex
        });
        // Check if there are any existing links
        const previousLink = getLink(editorState, matchSelectionState);
        const previousEntityData = previousLink && previousLink.entity.getData();
        if (!previousLink) {
          // Create link entity
          const contentWithEntity = currentContent.createEntity('LINK', 'MUTABLE', {
            href: matchLinks[i].url,
            created: 'match'
          });
          const entityKey = contentWithEntity.getLastCreatedEntityKey();
          // Convert text to a link
          editorState = EditorState.push(editorState, contentWithEntity, 'create-entity');
          editorState = RichUtils.toggleLink(editorState, matchSelectionState, entityKey);
          // Reset selection to original state
          editorState = EditorState.acceptSelection(editorState, selectionState);
        } else if (previousEntityData.created === 'match') {
          // Check if existing entity has changed
          const entityKey = previousLink.entityKey;
          if (matchLinks[i].url !== previousEntityData.href) {
            // Modify link entity if matched url has changed
            const contentWithEntity = currentContent.mergeEntityData(entityKey, {
              href: matchLinks[i].url
            });
            editorState = EditorState.push(editorState, contentWithEntity);
            editorState = RichUtils.toggleLink(editorState, matchSelectionState, entityKey);
            // Reset selection to original state
            editorState = EditorState.acceptSelection(editorState, selectionState);
          }
        }
      }
    }
  });

  return editorState;
}

/**
 * Determine if there are any links in the selection block
 * @param  {EditorState} editorState
 * @param  {SelectionState} selectionState
 * @return {{entity: EntityInstance, block: ContentBlock, blockKey: String, selection: SelectionState}|null}
 */
export function getLink(editorState, selectionState = editorState.getSelection()) {
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
