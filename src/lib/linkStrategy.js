import linkifyIt from 'linkify-it';
import tlds from 'tlds';

// Setup
const linkify = linkifyIt();
linkify.tlds(tlds);

/**
 * Parse text to find valid links and return them in the callback. If found the
 * Link component is used
 * @param    {Immutable}      contentBlock    [description]
 * @param    {Function}       callback        [description]
 * @param    {Immutable}      contentState    [description]
 */
export default function(contentBlock, callback, contentState) {
  // Find Text
  const links = linkify.match(contentBlock.get('text'));

  // Apply Text
  if (typeof links !== 'undefined' && links !== null) {
    for (let i = 0; i < links.length; i += 1) {
      callback(links[i].index, links[i].lastIndex);
    }
  }

  // Find & Apply Entities
  contentBlock.findEntityRanges(character => {
		const entityKey = character.getEntity();
		return (
			entityKey !== null &&
			contentState.getEntity(entityKey).getType() === "LINK"
		);
	}, callback);
}
