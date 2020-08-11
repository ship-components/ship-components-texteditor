import { ContentBlock, ContentState } from 'draft-js';
import Entities from '../Entities';

/**
 * Parse text to find mention entities and return them in the callback.
 * If found, the Mention component is used
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
      contentState.getEntity(entityKey).getType() === Entities.Mention
    );
  }, callback);
}
