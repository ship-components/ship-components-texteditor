import { ContentBlock, ContentState } from "draft-js";

/**
 * Parse text to find link entities and return them in the callback.
 * If found, the Link component is used
 *
 * @param    {ContentBlock}      contentBlock
 * @param    {Function}          callback
 * @param    {ContentState}      contentState
 */
export default function(contentBlock, callback, contentState) {
  // Find & Apply Entities
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === 'LINK'
    );
  }, callback);
}
