/**
 * Used to render a link
 */

import React, { Component } from 'react';
import linkifyIt from 'linkify-it';
import tlds from 'tlds';

const linkify = linkifyIt();
linkify.tlds(tlds);

export default class Link extends Component {

  render() {
    // Get from props
    const {
      decoratedText = '',
      target = '_blank',
      title = '',
      alt = '',
      className,
      children
    } = this.props;

    // Parse
    const links = linkify.match(decoratedText);

    // Extract
    const href = links && links[0] ? links[0].url : '';

    // Anchor props
    const props = {
      href,
      target,
      className,
      title,
      alt
    };

    return (
      <a {...props}>{children}</a>
    );
  }
}
