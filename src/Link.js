/**
 * Used to render a link
 */

import React from 'react';
import linkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = linkifyIt();
linkify.tlds(tlds);

export default function Link(props) {
  // get props
  const {
    contentState,
    decoratedText,
    entityKey,

    href,
    target,
    className,
    title,
    alt,
    children
  } = props;

  // get anchor props
  const anchorProps = {
    href,
    target,
    className,
    title,
    alt
  };

  // generate href prop
  if (entityKey) {
    // extract entity
    anchorProps.href = contentState.getEntity(entityKey).getData().href;
  } else {
    // parse text
    const links = linkify.match(decoratedText);
    // extract text
    anchorProps.href = links && links[0] ? links[0].url : '';
  }

  return (
    <a {...anchorProps}>{children}</a>
  );
}

Link.defaultProps = {
  target: '_blank',
  className: '',
  title: '',
  alt: ''
};
