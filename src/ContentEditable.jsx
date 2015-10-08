/**
 * @file ContentEditable React Component
 * @author Isaac Suttell <isaac@isaacsuttell.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export default class ContentEditable extends React.Component {

  /**
   * Only update if the html doesn't match the props
   * @param     {Object}    nextProps
   * @return    {Boolean}
   */
  shouldComponentUpdate(nextProps) {
    return nextProps.html !== ReactDOM.findDOMNode(this).innerHTML;
  }

  /**
   * Ensure the html matches
   */
  componentDidUpdate() {
    let el = ReactDOM.findDOMNode(this);
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
    var html = ReactDOM.findDOMNode(this).innerHTML;

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

  stripTags(str) {
    return str ? str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '') : '';
  }

  escapeHTML(str) {
    return str ? str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') : '';
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

    // Remove HTML Tags;
    text = this.escapeHTML(text);

    // Paste the unformatted text
    document.execCommand('insertHTML', false, text);
  }

  handleKeyDown(event) {
    this.props.onKeyDown(event);
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
        tabIndex={this.props.tabIndex}
        onPaste={this.handlePaste.bind(this)}
        onInput={this.emitChange.bind(this, 'input')}
        onKeyUp={this.emitChange.bind(this, 'keyUp')}
        onBlur={this.emitChange.bind(this, 'blur')}
        onKeyDown={this.handleKeyDown.bind(this)}
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
  tabIndex: void 0,
  pasteAsPlain: true,
  onKeyDown: function() {},
  onChange: function() {},
  onBlur: function() {}
}
