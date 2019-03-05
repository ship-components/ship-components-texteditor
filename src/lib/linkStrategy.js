/**
 * Parse text to find link entities and return them in the callback.
 * If found, the Link component is used
 * @param    {Immutable}      contentBlock    [description]
 * @param    {Function}       callback        [description]
 * @param    {Immutable}      contentState    [description]
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
