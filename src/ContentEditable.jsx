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
    return nextProps.html !== this.refs.editor.innerHTML;
  }

  /**
   * Ensure the html matches
   */
  componentDidUpdate() {
    if (this.props.html !== this.refs.editor.innerHTML) {
      this.refs.editor.innerHTML = this.props.html;
    }
  }

  /**
   * Called on input and blur. We extend the event with the value and pass up our chain the appropriate event
   * @param     {String}   type     blur|change
   * @param     {Event}    event
   */
  emitChange(type, event) {
    var html = this.refs.editor.innerHTML;

    event.target = {
      value: html
    };

    console.log(html !== this.lastHtml , html, this.lastHtml )

    if (html !== this.lastHtml && typeof this.props.onChange === 'function') {
      this.props.onChange(event);
    }

    // if (type === 'blur' && typeof this.props.onBlur === 'function') {
    //   this.props.onBlur(event);
    // }

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

  /**
   * Render
   *
   * @return    {React}
   */
  render() {
    return (
      <div
        ref='editor'
        className={classNames(this.props.className)}
        contentEditable
        tabIndex={this.props.tabIndex}
        onPaste={this.handlePaste.bind(this)}
        onInput={this.emitChange.bind(this, 'input')}
        // onBlur={this.emitChange.bind(this, 'blur')}
        onBlur={this.props.blur}
        onKeyDown={this.props.onKeyDown}
        /* eslint-disable */
        dangerouslySetInnerHTML={{__html: this.props.html}}
        /* eslint-enable */
      />
    );
  }
}

/**
 * Defaults
 * @type    {Object}
 */
ContentEditable.defaultProps = {
  tabIndex: void 0,
  pasteAsPlain: true
}
