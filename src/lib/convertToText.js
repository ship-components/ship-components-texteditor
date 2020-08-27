/**
 * This callback is displayed as part of the Requester class.
 * @callback EntityConvert
 * @param {import('draft-js').RawDraftEntity} entity
 * @param {string} text
 * @return {string}
 */

/**
 * Convert a content state to plain text
 * @param {Object} options
 * @param {EntityConvert} options.entityToText
 * @param {import('draft-js').ContentState} content
 * @return {string}
 */
export default function convertToText(options, content) {
  // Options
  options = Object.assign({
    entityToText: (entity, text) => text
  }, options);

  // The resulting text
  let result = '';

  // Loop through each block
  content.getBlocksAsArray().forEach((block, b) => {
    // Add newline if not the first block
    if (b > 0) {
      result += '\n';
    }

    // Find and convert entities
    block.findEntityRanges(
      () => true,
      (start, end) => {
        const text = block.getText().slice(start, end);
        const entityKey = block.getEntityAt(start);
        if (entityKey !== null) {
          const entity = content.getEntity(entityKey);
          result += options.entityToText(entity, text);
        } else {
          result += text;
        }
      }
    );
  });

  return result;
}