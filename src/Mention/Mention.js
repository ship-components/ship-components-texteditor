/**
 * Used to render a mention
 */

import React from 'react';
import classNames from 'classnames';

// CSS Module
import css from './Mention.css';

export default function Mention(props) {
  // get props
  const {
    className,
    title,
    children
  } = props;

  // get span props
  const spanProps = {
    className: classNames(css.mention, className),
    title
  };

  return (
    <span {...spanProps}>{children}</span>
  );
}

Mention.defaultProps = {
  className: undefined,
  title: ''
};
