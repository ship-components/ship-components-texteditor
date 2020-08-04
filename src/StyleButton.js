/**
 * @file Text Editor StyleButton
 * @author Isaac Suttell <isaac@isaacsuttell.com>
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// CSS Module
import css from './StyleButton.css';

export default function StyleButton(props) {
  return (
    <div
      className={classNames(props.className, 'text-editor---btn', css.btn, props.iconClass, {
        [css.icon]: typeof props.iconClass === 'string',
        'text-editor--btn-active': props.active,
        [css.active]: props.active
      })}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      title={props.title}
    >
      {typeof props.iconClass !== 'string' ?
        props.label
      : null}
    </div>
  );
}

/**
 * Type checking
 * @type    {Object}
 */
StyleButton.propTypes = {
  iconClass: PropTypes.string,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  onMouseUp: PropTypes.func,
  onMouseDown: PropTypes.func
};
