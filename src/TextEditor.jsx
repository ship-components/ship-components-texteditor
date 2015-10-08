/**
 * @file TextEditor React Component
 * @author Isaac Suttell <isaac@isaacsuttell.com>
 */

import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

import ContentEditable from './ContentEditable';

export default class TextEditor extends React.Component {
  constructor(props) {
    super(props);

    // Initial state
    this.state = {
      focus: false
    };

    this.handleBodyClick = this.handleBodyClick.bind(this);
  }

  /**
   * Bind to the body so we can check for clicks outside of the TextEditor
   * and hide the controls
   */
  componentDidMount() {
    document.body.addEventListener('click', this.handleBodyClick);
  }

  /**
   * Clean up
   */
  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBodyClick);
  }

  /**
   * Handle clicks outside of the Selector
   *
   * @param     {Event}    event
   */
  handleBodyClick(event){
    if (this.state.focus === true) {
      // Only search if the select box is open
      var source = event.target;
      var found = false;
      var el = ReactDOM.findDOMNode(this);
      // Search up the tree for the component node
      while (source.parentNode) {
        found = (source === el);
        if(found) {
          return;
        }
        source = source.parentNode;
      }

      // If we couldn't find this components node then close it
      this.handleBlur(event);
    }
  }

  /**
   * Execute a command: bold, underline, italic
   *
   * @param     {String}        command
   * @param     {MouseEvent}    event
   */
  handleCommand(command, event) {
    // Prevent the cursor from moving
    event.preventDefault();
    document.execCommand(command, null, '');

    return false;
  }

  /**
   * Pass the change event
   * @param     {Event}    event
   */
  handleChange(event) {
    this.props.onChange(event);
  }

  /**
   * Reset Focus
   * @param     {MouseEvent}    event
   */
  handleBlur(event) {
    this.setState({
      focus: false
    });
    this.props.onBlur(event);
  }

  /**
   * Set focus
   */
  handleClick() {
    this.setState({
      focus: true
    });
    this.props.onFocus();
  }

  handleKeyDown(event) {
    switch(event.keyCode) {
      case 13:
        this.props.onEnterKeyDown(event);
    }
    this.props.onKeyDown(event);
  }

  /**
   * Either show a plan div or a ContentEditable component
   * @return    {[type]}    [description]
   */
  renderContent() {
    if (this.props.editable) {
      return (
        <ContentEditable
          className='text-editor--field'
          pasteAsPlain={this.props.pasteAsPlain}
          onChange={this.handleChange.bind(this)}
          onBlur={this.handleBlur.bind(this)}
          onKeyDown={this.handleKeyDown.bind(this)}
          tabIndex={this.props.tabIndex}
          html={this.props.html}
        />
      );
    } else {
      return (
        <div
          className='text-editor--field'
          /* eslint-disable */
          dangerouslySetInnerHTML={{__html:this.props.html ? this.props.html : ''}}
          /* eslint-enable */
          />
      );
    }
  }


  /**
   * Reader a single button and bind it's command
   *
   * @param     {String}    btn
   * @return    {React}
   */
  renderButton(btn) {
    var options = this.props.buttons[btn];
    if(options && options.enabled) {
      return (
        <button
          key={options.command}
          onClick={this.handleCommand.bind(this, options.command)}
          className={classNames('btn', 'btn-icon', options.iconClass)}
          type='button' />
      );
    } else {
      return null;
    }
  }

  /**
   * Render buttons specified in props
   *
   * @return    {React}
   */
  renderButtons() {
    if (!this.props.editable || !this.props.buttons) {
      return null;
    }

    var controls = [];
    for(var key in this.props.buttons) {
      if(this.props.buttons.hasOwnProperty(key)) {
        controls.push(this.renderButton(key));
      }
    }

    return (
      <div className='text-editor--controls btn-group'>
        {controls}
      </div>
    );
  }
  /**
   * Throw up a placeholder when we're empty
   * @return    {React}
   */
  renderPlaceholder() {
    if (window.navigator.userAgent.match(/MSIE/i)) {
      return null;
    } else if (!this.props.editable) {
      return null;
    } else if (!this.props.placeholder) {
      return null;
    } else if (typeof this.props.html !== 'string' || this.props.html.length > 0) {
      return null;
    }
    return (
      <span className='text-editor--placeholder'>
        {this.props.placeholder}
      </span>
    );
  }

  /**
   * Make it all happen
   * @return    {React}
   */
  render() {
    var classes = classNames(this.props.className, 'text-editor', {
      'text-editor--editable': this.props.editable,
      'focus' : this.state.focus
    });

    return (
      <div
        className={classes}
        onClick={this.handleClick.bind(this)}
      >
        {this.renderButtons()}
        {this.renderPlaceholder()}
        {this.renderContent()}
      </div>
    )
  }
}

TextEditor.defaultProps = {
  className: '',
  editable: false,
  html: '',
  tabIndex: void 0,
  pasteAsPlain: true,
  onChange: function() {},
  onBlur: function() {},
  onFocus: function() {},
  onEnterKeyDown: function() {},
  onKeyDown: function() {},
  buttons: {
    bold: {
      enabled: true,
      command: 'bold',
      iconClass: 'icon-format_bold'
    },
    italic: {
      enabled: true,
      command: 'italic',
      iconClass: 'icon-format_italic'
    },
    underline: {
      enabled: true,
      command: 'underline',
      iconClass: 'icon-format_underlined'
    }
  }
}
