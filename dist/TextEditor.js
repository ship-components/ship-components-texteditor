/*******************************************************************************
 * TextEditor
 *
 * @author       Isaac Suttell <isaac_suttell@playstation.sony.com>
 * @file         Rich Text Editor for React
 ******************************************************************************/

'use strict';

var React = require('react');
var classNames = require('classnames');
var _ = require('lodash');

var TextEditor = React.createClass({
  displayName: 'TextEditor',

  /**
   * Defaults
   *
   * @return    {Object}
   */
  getDefaultProps: function getDefaultProps() {
    return {
      className: '',
      editable: false,
      value: '',
      tabIndex: void 0,
      pasteAsPlain: true,
      buttons: {
        bold: {
          enabled: true,
          command: 'bold',
          iconClass: 'icon-bold'
        },
        italic: {
          enabled: true,
          command: 'italic',
          iconClass: 'icon-italic'
        },
        underline: {
          enabled: true,
          command: 'underline',
          iconClass: 'icon-underline'
        }
      }
    };
  },

  /**
   * Loose type checking. Removed during production minification
   *
   * @type    {Object}
   */
  propTypes: {
    className: React.PropTypes.string,
    editable: React.PropTypes.bool,
    value: React.PropTypes.string,
    tabIndex: React.PropTypes.number,
    buttons: React.PropTypes.object
  },

  /**
   * I am not focused
   *
   * @return    {Object}
   */
  getInitialState: function getInitialState() {
    return {
      focus: false
    };
  },

  /**
   * On input and blur emit a change to our parent
   *
   * @param     {SyntheticEvent}    event
   */
  emitChange: function emitChange(event) {
    var html = this.refs.content.getDOMNode().innerHTML;

    var ev = _.extend(event, {
      target: { value: html }
    });

    if (html !== this.lastHtml && _.isFunction(this.props.onChange)) {
      this.props.onChange(ev);
    }

    this.lastHtml = html;

    if (event.type === 'blur' && _.isFunction(this.props.onBlur)) {
      this.props.onBlur(ev);
    }
  },

  /**
   * Onlu update if it chagned
   *
   * @param     {Object}    nextProps
   * @return    {Boolean}
   */
  shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
    return this.refs.content && nextProps.value !== this.refs.content.getDOMNode().innerHTML || this.state.focus !== nextState.focus;
  },

  /**
   * Execute a command: bold, underline, italic
   *
   * @param     {String}        command
   * @param     {MouseEvent}    event
   */
  handleCommand: function handleCommand(command, event) {
    event.preventDefault();
    document.execCommand(command, null, '');
  },

  /**
   * Remove text styles from paste
   *
   * @param     {ClipboardEvent}    event
   */
  handlePaste: function handlePaste(event) {
    if (this.props.pasteAsPlain !== true) {
      return;
    }

    // Prevent paste
    event.preventDefault();

    // Get text without styles
    var text = event.clipboardData.getData('text/plain');

    // Paste the unformatted text
    document.execCommand('insertHTML', false, text);
  },

  /**
   * Bind to the body so we can check for clicks outside of the TextEditor
   * and hide the controls
   */
  componentDidMount: function componentDidMount() {
    document.body.addEventListener('click', this.handleBodyClick);
  },

  /**
   * Clean up
   */
  componentWillUnmount: function componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBodyClick);
  },

  /**
   * We have clarity
   */
  handleFocus: function handleFocus() {
    this.setState({
      focus: true
    });
  },

  /**
   * Handle clicks outside of the Selector
   *
   * @param     {Event}    event
   */
  handleBodyClick: function handleBodyClick(event) {
    if (this.state.focus) {
      // Only search if the select box is open
      var source = event.target;
      var found = false;
      // Search up the tree for the component node
      while (source.parentNode) {
        found = source === this.getDOMNode();
        if (found) {
          return;
        }
        source = source.parentNode;
      }

      // If we couldn't find this components node then close it
      this.setState({
        focus: false
      });
    }
  },

  /**
   * Reader a single button and bind it's command
   *
   * @param     {String}    btn
   * @return    {React}
   */
  renderButton: function renderButton(btn) {
    var options = this.props.buttons[btn];
    if (options && options.enabled) {
      return React.createElement('button', {
        onClick: this.handleCommand.bind(this, options.command),
        className: classNames('btn', 'btn-icon', options.iconClass), type: 'button' });
    } else {
      return null;
    }
  },

  /**
   * Render buttons specified in props
   *
   * @return    {React}
   */
  renderButtons: function renderButtons() {
    if (!this.props.editable) {
      return null;
    }

    var controls = [];
    for (var key in this.props.buttons) {
      if (this.props.buttons.hasOwnProperty(key)) {
        controls.push(this.renderButton(key));
      }
    }

    return React.createElement(
      'div',
      { className: 'text-editor--controls btn-group' },
      controls
    );
  },

  /**
   * Render
   *
   * @return    {React}
   */
  render: function render() {
    // Ensure value is not null
    var value = this.props.value ? this.props.value : '';

    if (this.props.editable) {
      var componentStyles = classNames(this.props.className, 'text-editor', {
        'focus': this.state.focus
      });

      return React.createElement(
        'div',
        { className: componentStyles, onClick: this.handleFocus },
        this.renderButtons(),
        React.createElement('div', {
          className: 'text-editor--field',
          onInput: this.emitChange,
          onBlur: this.emitChange,
          onPaste: this.handlePaste,
          onKeyDown: this.props.onKeyDown,
          ref: 'content',
          tabIndex: this.props.tabIndex,
          contentEditable: true,
          dangerouslySetInnerHTML: { __html: value } })
      );
    } else {
      return React.createElement('div', {
        className: classNames(this.props.className, 'text-editor'),
        dangerouslySetInnerHTML: { __html: value } });
    }
  }
});

module.exports = TextEditor;
//# sourceMappingURL=TextEditor.js.map
