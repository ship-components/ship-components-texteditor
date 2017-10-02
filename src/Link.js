/**
 * Used to render a link
 */

import React from 'react';
import linkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = linkifyIt();
linkify.tlds(tlds);

export default function Link(props) {
  const {
    decoratedText = '',
    target = '_blank',
    title = '',
    alt = '',
    className,
    children
  } = props;

  // parse
  const links = linkify.match(decoratedText);

  // extract
  const href = links && links[0] ? links[0].url : '';

  const anchorProps = {
    href,
    target,
    className,
    title,
    alt
  };

  return (
    <a {...anchorProps}>{children}</a>
  );
}
