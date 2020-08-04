/**
 * Used to render a mention suggestion
 */

import React from 'react';

export default function MentionSuggestion(props) {
  // get props
  const {
    className,
    title,
    children
  } = props;

  // get suggestion props
  const suggestionProps = {
    className,
    title
  };

  return (
    <span {...suggestionProps}>{children}</span>
  );
}

MentionSuggestion.defaultProps = {
  className: undefined,
  title: ''
};
