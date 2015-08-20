/**
 * @file ContentEditable React Component
 * @author Isaac Suttell <isaac@isaacsuttell.com>
 */

import React from 'react';
import classNames from 'classnames';

export default class ContentEditable extends React.Component {

  /**
   * Only update if the html doesn't match the props
   * @param     {Object}    nextProps
   * @return    {Boolean}
   */
  shouldComponentUpdate(nextProps) {
    return nextProps.html !== React.findDOMNode(this).innerHTML;
  }

  /**
   * Ensure the html matches
   */
  componentDidUpdate() {
    let el = React.findDOMNode(this);
    if(this.props.html !== el.innerHTML) {
      el.innerHTML = this.props.html;
    }
  }

  /**
   * Called on input and blur. We extend the event with the value and pass up our chain the appropriate event
   * @param     {String}   type     blur|change
   * @param     {Event}    event
   */
  emitChange(type, event) {
    var html = React.findDOMNode(this).innerHTML;

    event.target = {
      value: html
    };

    if(html !== this.lastHtml) {
      this.props.onChange(event);
    }

    if(type === 'blur') {
      this.props.onBlur(event);
    }

    this.lastHtml = html;
  }

  /**
   * Remove text styles from paste
   *
   * @param     {ClipboardEvent}    event
   */
  handlePaste(event) {
    if (this.props.pasteAsPlain !== true) {
      return;
    }

    // Prevent paste
    event.preventDefault();

    // Get text without styles
    var text = event.clipboardData.getData('text/plain');

    // Paste the unformatted text
    document.execCommand('insertHTML', false, text);
  }

  /**
   * Render
   *
   * @return    {React}
   */
  render() {
    return (
      <div
        className={classNames(this.props.className)}
        contentEditable={true}
        onPaste={this.handlePaste.bind(this)}
        onInput={this.emitChange.bind(this, 'input')}
        onBlur={this.emitChange.bind(this, 'blur')}
        /* eslint-disable */
        dangerouslySetInnerHTML={{__html: this.props.html}}
        /* eslint-enable */
      />
    )
  }
}

/**
 * Defaults
 * @type    {Object}
 */
ContentEditable.defaultProps = {
  pasteAsPlain: true,
  onChange: function() {},
  onBlur: function() {}
}
