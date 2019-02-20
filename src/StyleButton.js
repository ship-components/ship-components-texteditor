/**
 * @file Text Editor StyleButton
 * @author Isaac Suttell <isaac@isaacsuttell.com>
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

// CSS Module
import css from './StyleButton.css';

export default class StyleButton extends Component {
  /**
   * Make Render
   * @return    {React}
   */
  render() {
    return (
      <div
        className={classNames(this.props.className, 'text-editor---btn', css.btn, this.props.iconClass, {
          [css.icon]: typeof this.props.iconClass === 'string',
          'text-editor--btn-active': this.props.active,
          [css.active]: this.props.active
        })}
        onClick={this.props.onClick}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        title={this.props.title}
      >
        {typeof this.props.iconClass !== 'string' ?
          this.props.label
        : null}
      </div>
    );
  }
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
