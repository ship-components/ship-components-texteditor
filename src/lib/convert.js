import {ContentState, convertToRaw, convertFromRaw} from 'draft-js';
import { convertFromHTML, convertToHTML } from 'draft-convert';
import Entities from './Entities';
import { createElement } from 'react';

/**
 * Removes the HTML tags from Strings
 *
 * @param     {String}    str
 * @return    {String}
 */
export function convertHTMLToString(str) {
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
          return createEntity(Entities.Link, 'MUTABLE', { href: node.href })
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
        if (entity.type === Entities.Link) {
          return <a href={entity.data.href}>{text}</a>;
        }
        if (entity.type === Entities.Mention) {
          return entity.data.text;
        }
        if (entity.type === Entities.Hashtag) {
          return entity.data.text;
        }
        return text;
      },
      blockToHTML: (block) => {
        if (block.type === 'code-block') {
          return <blockquote />
        }
      }
    })(content);
  } else if (type === 'text') {
    return convertHTMLToString(convertContentTo(content, 'html'));
  } else {
    return content;
  }
}
