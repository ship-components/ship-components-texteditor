import {ContentState, convertToRaw, convertFromRaw} from 'draft-js';
import {convertFromHTML, convertToHTML} from 'draft-convert';

/**
 * Removes the HTML tags from Strings
 *
 * @param     {String}    str
 * @return    {String}    str
 */
function convertHTMLToString(str) {
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(/<\/?[^>]+(>|$)/g, '');
}

/**
 * Get the content depending on the type of data we're passing around
 */
export function convertContentFrom(value, type) {
  if (!value) {
    return ContentState.createFromText('');
  } else if (type === 'json') {
    return convertFromRaw(value);
  } else if (type === 'html') {
    return convertFromHTML(value);
  } else {
    return value;
  }
}

/**
 * Convert the content depending on what the parent wants
 */
export function convertContentTo(content, type) {
  if (type === 'json') {
    return convertToRaw(content);
  } else if (type === 'html') {
    return convertToHTML(content);
  } else if (type === 'text') {
    return convertHTMLToString(content);
  } else {
    return content;
  }
}
