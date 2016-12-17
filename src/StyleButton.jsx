/**
 * @file Text Editor StyleButton
 * @author Isaac Suttell <isaac@isaacsuttell.com>
 */

import React, {Component, PropTypes} from 'react';
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
          [css.icon] : typeof this.props.iconClass === 'string',
          'text-editor--btn-active': this.props.active,
          [css.active]: this.props.active
        })}
        onMouseDown={this.props.onMouseDown}
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
  iconClass: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  className: PropTypes.string
};
