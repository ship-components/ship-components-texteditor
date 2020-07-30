import {ContentState, convertToRaw, convertFromRaw} from 'draft-js';
import {convertFromHTML, convertToHTML} from 'draft-convert';

/**
 * Removes the HTML tags from Strings
 *
 * @param     {String}    str
 * @return    {String}
 */
function convertHTMLToString(str) {
  if (typeof str !== 'string') {
    return str;
  }
  return str.replace(/<\/?[^>]+(>|$)/g, '');
}

/**
 * Get the content depending on the type of data we're passing around
 *
 * @param     {String}    value
 * @param     {String}    type
 * @return    {ContentState}
 */
export function convertContentFrom(value, type) {
  if (!value) {
    return ContentState.createFromText('');
  } else if (type === 'text') {
    return ContentState.createFromText(value);
  } else if (type === 'json') {
    return convertFromRaw(value);
  } else if (type === 'html') {
    return convertFromHTML({
      htmlToEntity: (nodeName, node, createEntity) => {
        if (nodeName === 'a') {
          return createEntity('LINK', 'MUTABLE', { href: node.href })
        }
      },
    })(value);
  } else {
    return value;
  }
}

/**
 * Convert the content depending on what the parent wants
 *
 * @param     {ContentState}    content
 * @param     {String}          type
 * @return    {String}
 */
export function convertContentTo(content, type) {
  if (type === 'json') {
    return convertToRaw(content);
  } else if (type === 'html') {
    return convertToHTML({
      entityToHTML: (entity, text) => {
        if (entity.type === 'LINK') {
          return <a href={entity.data.href}>{text}</a>;
        }
        return text;
      }
    })(content);
  } else if (type === 'text') {
    return convertHTMLToString(convertToHTML(content));
  } else {
    return content;
  }
}
