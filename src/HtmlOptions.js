/**
 * Options for convert to HTML
 * @see https://www.npmjs.com/package/draft-js-export-html
 * @type    {Object}
 */
const TO_HTML_OPTIONS = {
  inlineStyles: {
    BOLD: {
      element: 'b'
    },
    UNDERLINE: {
      // When converting back to the right format this needs to be `u` otherwise
      // wise draft-fs doesn't recognize it>
      element: 'u'
    },
    ITALIC: {
      element: 'i'
    }
  }
};

export default TO_HTML_OPTIONS;
