/**
 * Used to render a link
 */

import React from 'react';

export default function Link(props) {
  // get props
  const {
    contentState,
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

  // find entity
  if (entityKey) {
    // extract entity href
    anchorProps.href = contentState.getEntity(entityKey).getData().href;
  }

  return (
    <a {...anchorProps}>{children}</a>
  );
}

Link.defaultProps = {
  target: '_blank',
  className: undefined,
  title: undefined,
  alt: ''
};
