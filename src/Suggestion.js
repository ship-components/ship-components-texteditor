/**
 * Used to render a mention suggestion
 */

import React from 'react';
import PropTypes from 'prop-types';

export default function Suggestion(props) {
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

Suggestion.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node
};

Suggestion.defaultProps = {
  className: undefined,
  title: '',
  children: undefined
};
