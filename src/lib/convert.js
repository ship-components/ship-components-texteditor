import React from 'react';
import { ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { convertFromHTML, convertToHTML } from 'draft-convert';
import convertToText from './convertToText';
import Entities from './Entities';

/**
 * Get the content depending on the type of data we're passing around
 *
 * @param     {string}    value
 * @param     {string}    type
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
 * @param     {string}          type
 * @return    {string}
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
    return convertToText({
      entityToText: (entity, text) => {
        if (entity.type === Entities.Mention) {
          return entity.data.text;
        }
        if (entity.type === Entities.Hashtag) {
          return entity.data.text;
        }
        return text;
      }
    }, content);
  } else {
    return content;
  }
}
