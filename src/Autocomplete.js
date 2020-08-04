/**
 * Used to render a mention suggestions
 */

import React from 'react';
import PropTypes from 'prop-types';
import Immutable from 'immutable';
import classNames from 'classnames';

// CSS Module
import css from './Autocomplete.css';

export default function Autocomplete(props) {
  // get props
  const {
    className,
    suggestions,
    onClick
  } = props;

  // get suggestion props
  const suggestionsProps = {
    className: classNames(css.wrap, className)
  };

  // hide if rows are not a list
  if (!suggestions) {
    return null;
  }

  return (
    <div {...suggestionsProps}>
      {suggestions.size === 0 ? (
        <div className={css.empty}>
          No suggestions available.
        </div>
      ) : (
        <div className={css.list}>
          {suggestions.entrySeq().map(([value, label]) => (
            <div
              key={value}
              className={css.listItem}
              onClick={() => typeof onClick === 'function' && onClick(value)}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


Autocomplete.propTypes = {
  className: PropTypes.string,
  suggestions: PropTypes.instanceOf(Immutable.OrderedMap),
  onClick: PropTypes.func
};

Autocomplete.defaultProps = {
  className: undefined,
  suggestions: null,
  onClick: null
};
