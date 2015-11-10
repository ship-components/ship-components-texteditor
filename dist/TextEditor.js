/*!
 *                               __              __                   __             .___.__  __                
 * _______   ____ _____    _____/  |_          _/  |_  ____ ___  ____/  |_  ____   __| _/|__|/  |_  ___________ 
 * \_  __ \_/ __ \\__  \ _/ ___\   __\  ______ \   __\/ __ \\  \/  /\   __\/ __ \ / __ | |  \   __\/  _ \_  __ \
 *  |  | \/\  ___/ / __ \\  \___|  |   /_____/  |  | \  ___/ >    <  |  | \  ___// /_/ | |  ||  | (  <_> )  | \/
 *  |__|    \___  >____  /\___  >__|            |__|  \___  >__/\_ \ |__|  \___  >____ | |__||__|  \____/|__|   
 *              \/     \/     \/                          \/      \/           \/     \/                        
 * react-texteditor 0.1.2
 * Description: Rich Text Editor for React
 * Author: Isaac Suttell <isaac@isaacsuttell.com>
 * Homepage: https://github.com/isuttell/react-texteditor
 * Bugs: https://github.com/isuttell/react-texteditor/issues
 * License: MIT
 */
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @file TextEditor React Component
	 * @author Isaac Suttell <isaac@isaacsuttell.com>
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames = __webpack_require__(1);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _ContentEditable = __webpack_require__(4);

	var _ContentEditable2 = _interopRequireDefault(_ContentEditable);

	var TextEditor = (function (_React$Component) {
	  _inherits(TextEditor, _React$Component);

	  function TextEditor(props) {
	    _classCallCheck(this, TextEditor);

	    _get(Object.getPrototypeOf(TextEditor.prototype), 'constructor', this).call(this, props);

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

	  _createClass(TextEditor, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      document.body.addEventListener('click', this.handleBodyClick);
	    }

	    /**
	     * Clean up
	     */
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      document.body.removeEventListener('click', this.handleBodyClick);
	    }

	    /**
	     * Handle clicks outside of the Selector
	     *
	     * @param     {Event}    event
	     */
	  }, {
	    key: 'handleBodyClick',
	    value: function handleBodyClick(event) {
	      if (this.state.focus === true) {
	        // Only search if the select box is open
	        var source = event.target;
	        var found = false;
	        var el = _reactDom2['default'].findDOMNode(this);
	        // Search up the tree for the component node
	        while (source.parentNode) {
	          found = source === el;
	          if (found) {
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
	  }, {
	    key: 'handleCommand',
	    value: function handleCommand(command, event) {
	      // Prevent the cursor from moving
	      event.preventDefault();
	      document.execCommand(command, null, '');

	      return false;
	    }

	    /**
	     * Pass the change event
	     * @param     {Event}    event
	     */
	  }, {
	    key: 'handleChange',
	    value: function handleChange(event) {
	      this.props.onChange(event);
	    }

	    /**
	     * Reset Focus
	     * @param     {MouseEvent}    event
	     */
	  }, {
	    key: 'handleBlur',
	    value: function handleBlur(event) {
	      this.setState({
	        focus: false
	      });
	      this.props.onBlur(event);
	    }

	    /**
	     * Set focus
	     */
	  }, {
	    key: 'handleClick',
	    value: function handleClick() {
	      this.setState({
	        focus: true
	      });
	      this.props.onFocus();
	    }
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(event) {
	      switch (event.keyCode) {
	        case 13:
	          this.props.onEnterKeyDown(event);
	      }
	      this.props.onKeyDown(event);
	    }

	    /**
	     * Either show a plan div or a ContentEditable component
	     * @return    {[type]}    [description]
	     */
	  }, {
	    key: 'renderContent',
	    value: function renderContent() {
	      if (this.props.editable) {
	        return _react2['default'].createElement(_ContentEditable2['default'], {
	          className: 'text-editor--field',
	          pasteAsPlain: this.props.pasteAsPlain,
	          onChange: this.handleChange.bind(this),
	          onBlur: this.handleBlur.bind(this),
	          onKeyDown: this.handleKeyDown.bind(this),
	          tabIndex: this.props.tabIndex,
	          html: this.props.html
	        });
	      } else {
	        return _react2['default'].createElement('div', {
	          className: 'text-editor--field',
	          /* eslint-disable */
	          dangerouslySetInnerHTML: { __html: this.props.html ? this.props.html : '' }
	          /* eslint-enable */
	        });
	      }
	    }

	    /**
	     * Reader a single button and bind it's command
	     *
	     * @param     {String}    btn
	     * @return    {React}
	     */
	  }, {
	    key: 'renderButton',
	    value: function renderButton(btn) {
	      var options = this.props.buttons[btn];
	      if (options && options.enabled) {
	        return _react2['default'].cloneElement(options.comp, {
	          key: options.command,
	          className: (0, _classnames2['default'])('btn', 'btn-icon', options.comp.props.className),
	          onClick: this.handleCommand.bind(this, options.command)
	        });
	      }if (options && options.enabled) {
	        return _react2['default'].createElement('button', {
	          key: options.command,
	          onClick: this.handleCommand.bind(this, options.command),
	          className: (0, _classnames2['default'])('btn', 'btn-icon', options.iconClass),
	          type: 'button' });
	      } else {
	        return null;
	      }
	    }

	    /**
	     * Render buttons specified in props
	     *
	     * @return    {React}
	     */
	  }, {
	    key: 'renderButtons',
	    value: function renderButtons() {
	      if (!this.props.editable || !this.props.buttons) {
	        return null;
	      }

	      var controls = [];
	      for (var key in this.props.buttons) {
	        if (this.props.buttons.hasOwnProperty(key)) {
	          controls.push(this.renderButton(key));
	        }
	      }

	      return _react2['default'].createElement(
	        'div',
	        { className: 'text-editor--controls btn-group' },
	        controls
	      );
	    }

	    /**
	     * Throw up a placeholder when we're empty
	     * @return    {React}
	     */
	  }, {
	    key: 'renderPlaceholder',
	    value: function renderPlaceholder() {
	      if (window.navigator.userAgent.match(/MSIE/i)) {
	        return null;
	      } else if (!this.props.editable) {
	        return null;
	      } else if (!this.props.placeholder) {
	        return null;
	      } else if (typeof this.props.html !== 'string' || this.props.html.length > 0) {
	        return null;
	      }
	      return _react2['default'].createElement(
	        'span',
	        { className: 'text-editor--placeholder' },
	        this.props.placeholder
	      );
	    }

	    /**
	     * Make it all happen
	     * @return    {React}
	     */
	  }, {
	    key: 'render',
	    value: function render() {
	      var classes = (0, _classnames2['default'])(this.props.className, 'text-editor', {
	        'text-editor--editable': this.props.editable,
	        'focus': this.state.focus
	      });

	      return _react2['default'].createElement(
	        'div',
	        {
	          className: classes,
	          onClick: this.handleClick.bind(this)
	        },
	        this.renderButtons(),
	        this.renderPlaceholder(),
	        this.renderContent()
	      );
	    }
	  }]);

	  return TextEditor;
	})(_react2['default'].Component);

	exports['default'] = TextEditor;

	TextEditor.defaultProps = {
	  className: '',
	  editable: false,
	  html: '',
	  tabIndex: void 0,
	  pasteAsPlain: true,
	  onChange: function onChange() {},
	  onBlur: function onBlur() {},
	  onFocus: function onFocus() {},
	  onEnterKeyDown: function onEnterKeyDown() {},
	  onKeyDown: function onKeyDown() {},
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
	};
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @file ContentEditable React Component
	 * @author Isaac Suttell <isaac@isaacsuttell.com>
	 */

	'use strict';

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames = __webpack_require__(1);

	var _classnames2 = _interopRequireDefault(_classnames);

	var ContentEditable = (function (_React$Component) {
	  _inherits(ContentEditable, _React$Component);

	  function ContentEditable() {
	    _classCallCheck(this, ContentEditable);

	    _get(Object.getPrototypeOf(ContentEditable.prototype), 'constructor', this).apply(this, arguments);
	  }

	  /**
	   * Defaults
	   * @type    {Object}
	   */

	  _createClass(ContentEditable, [{
	    key: 'shouldComponentUpdate',

	    /**
	     * Only update if the html doesn't match the props
	     * @param     {Object}    nextProps
	     * @return    {Boolean}
	     */
	    value: function shouldComponentUpdate(nextProps) {
	      return nextProps.html !== _reactDom2['default'].findDOMNode(this).innerHTML;
	    }

	    /**
	     * Ensure the html matches
	     */
	  }, {
	    key: 'componentDidUpdate',
	    value: function componentDidUpdate() {
	      var el = _reactDom2['default'].findDOMNode(this);
	      if (this.props.html !== el.innerHTML) {
	        el.innerHTML = this.props.html;
	      }
	    }

	    /**
	     * Called on input and blur. We extend the event with the value and pass up our chain the appropriate event
	     * @param     {String}   type     blur|change
	     * @param     {Event}    event
	     */
	  }, {
	    key: 'emitChange',
	    value: function emitChange(type, event) {
	      var html = _reactDom2['default'].findDOMNode(this).innerHTML;

	      event.target = {
	        value: html
	      };

	      if (html !== this.lastHtml) {
	        this.props.onChange(event);
	      }

	      if (type === 'blur') {
	        this.props.onBlur(event);
	      }

	      this.lastHtml = html;
	    }
	  }, {
	    key: 'stripTags',
	    value: function stripTags(str) {
	      return str ? str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '') : '';
	    }
	  }, {
	    key: 'escapeHTML',
	    value: function escapeHTML(str) {
	      return str ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
	    }

	    /**
	     * Remove text styles from paste
	     *
	     * @param     {ClipboardEvent}    event
	     */
	  }, {
	    key: 'handlePaste',
	    value: function handlePaste(event) {
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
	  }, {
	    key: 'handleKeyDown',
	    value: function handleKeyDown(event) {
	      this.props.onKeyDown(event);
	    }

	    /**
	     * Render
	     *
	     * @return    {React}
	     */
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2['default'].createElement('div', {
	        className: (0, _classnames2['default'])(this.props.className),
	        contentEditable: true,
	        tabIndex: this.props.tabIndex,
	        onPaste: this.handlePaste.bind(this),
	        onInput: this.emitChange.bind(this, 'input'),
	        onKeyUp: this.emitChange.bind(this, 'keyUp'),
	        onBlur: this.emitChange.bind(this, 'blur'),
	        onKeyDown: this.handleKeyDown.bind(this),
	        /* eslint-disable */
	        dangerouslySetInnerHTML: { __html: this.props.html }
	        /* eslint-enable */
	      });
	    }
	  }]);

	  return ContentEditable;
	})(_react2['default'].Component);

	exports['default'] = ContentEditable;
	ContentEditable.defaultProps = {
	  tabIndex: void 0,
	  pasteAsPlain: true,
	  onKeyDown: function onKeyDown() {},
	  onChange: function onChange() {},
	  onBlur: function onBlur() {}
	};
	module.exports = exports['default'];

/***/ }
/******/ ]);