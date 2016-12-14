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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _ContentEditable = __webpack_require__(4);

	var _ContentEditable2 = _interopRequireDefault(_ContentEditable);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file TextEditor React Component
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Isaac Suttell <isaac@isaacsuttell.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var TextEditor = function (_React$Component) {
	  _inherits(TextEditor, _React$Component);

	  function TextEditor(props) {
	    _classCallCheck(this, TextEditor);

	    // Initial state

	    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

	    _this.state = {
	      focus: false
	    };

	    _this.handleBodyClick = _this.handleBodyClick.bind(_this);
	    return _this;
	  }

	  /**
	   * Bind to the body so we can check for clicks outside of the TextEditor
	   * and hide the controls
	   */


	  TextEditor.prototype.componentDidMount = function componentDidMount() {
	    document.body.addEventListener('click', this.handleBodyClick);
	  };

	  /**
	   * Clean up
	   */


	  TextEditor.prototype.componentWillUnmount = function componentWillUnmount() {
	    document.body.removeEventListener('click', this.handleBodyClick);
	  };

	  /**
	   * Handle clicks outside of the Selector
	   *
	   * @param     {Event}    event
	   */


	  TextEditor.prototype.handleBodyClick = function handleBodyClick(event) {
	    if (this.state.focus === true) {
	      // Only search if the select box is open
	      var source = event.target;
	      var found = false;
	      var el = _reactDom2.default.findDOMNode(this);
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
	  };

	  /**
	   * Execute a command: bold, underline, italic
	   *
	   * @param     {String}        command
	   * @param     {MouseEvent}    event
	   */


	  TextEditor.prototype.handleCommand = function handleCommand(command, event) {
	    // Prevent the cursor from moving
	    event.preventDefault();
	    event.stopPropagation();
	    document.execCommand(command, null, '');

	    return false;
	  };

	  /**
	   * Pass the change event
	   * @param     {Event}    event
	   */


	  TextEditor.prototype.handleChange = function handleChange(event) {
	    this.props.onChange(event);
	  };

	  /**
	   * Reset Focus
	   * @param     {MouseEvent}    event
	   */


	  TextEditor.prototype.handleBlur = function handleBlur(event) {
	    this.setState({
	      focus: false
	    });
	    this.props.onBlur(event);
	  };

	  /**
	   * Set focus
	   */


	  TextEditor.prototype.handleClick = function handleClick() {
	    this.setState({
	      focus: true
	    });
	    this.props.onFocus();
	  };

	  TextEditor.prototype.handleKeyDown = function handleKeyDown(event) {
	    switch (event.keyCode) {
	      case 13:
	        this.props.onEnterKeyDown(event);
	    }
	    this.props.onKeyDown(event);
	  };

	  /**
	   * Either show a plan div or a ContentEditable component
	   * @return    {[type]}    [description]
	   */


	  TextEditor.prototype.renderContent = function renderContent() {
	    if (this.props.editable) {
	      return _react2.default.createElement(_ContentEditable2.default, {
	        className: 'text-editor--field',
	        pasteAsPlain: this.props.pasteAsPlain,
	        onChange: this.handleChange.bind(this),
	        onBlur: this.handleBlur.bind(this),
	        onKeyDown: this.handleKeyDown.bind(this),
	        tabIndex: this.props.tabIndex,
	        html: this.props.html
	      });
	    } else {
	      return _react2.default.createElement('div', {
	        className: 'text-editor--field'
	        /* eslint-disable */
	        , dangerouslySetInnerHTML: { __html: this.props.html ? this.props.html : '' }
	        /* eslint-enable */
	      });
	    }
	  };

	  /**
	   * Reader a single button and bind it's command
	   *
	   * @param     {String}    btn
	   * @return    {React}
	   */


	  TextEditor.prototype.renderButton = function renderButton(btn) {
	    var options = this.props.buttons[btn];
	    if (options && options.enabled && options.comp) {
	      return _react2.default.cloneElement(options.comp, {
	        key: options.command,
	        className: (0, _classnames2.default)('btn', 'btn-icon', options.comp.props.className),
	        onClick: this.handleCommand.bind(this, options.command)
	      });
	    }if (options && options.enabled) {
	      return _react2.default.createElement('button', {
	        key: options.command,
	        onClick: this.handleCommand.bind(this, options.command),
	        className: (0, _classnames2.default)('btn', 'btn-icon', options.iconClass),
	        type: 'button' });
	    } else {
	      return null;
	    }
	  };

	  /**
	   * Render buttons specified in props
	   *
	   * @return    {React}
	   */


	  TextEditor.prototype.renderButtons = function renderButtons() {
	    if (!this.props.editable || !this.props.buttons) {
	      return null;
	    }

	    var controls = [];
	    for (var key in this.props.buttons) {
	      if (this.props.buttons.hasOwnProperty(key)) {
	        controls.push(this.renderButton(key));
	      }
	    }

	    return _react2.default.createElement(
	      'div',
	      { className: 'text-editor--controls btn-group' },
	      controls
	    );
	  };
	  /**
	   * Throw up a placeholder when we're empty
	   * @return    {React}
	   */


	  TextEditor.prototype.renderPlaceholder = function renderPlaceholder() {
	    if (window.navigator.userAgent.match(/MSIE/i)) {
	      return null;
	    } else if (!this.props.editable) {
	      return null;
	    } else if (!this.props.placeholder) {
	      return null;
	    } else if (typeof this.props.html !== 'string' || this.props.html.length > 0) {
	      return null;
	    }
	    return _react2.default.createElement(
	      'span',
	      { className: 'text-editor--placeholder' },
	      this.props.placeholder
	    );
	  };

	  /**
	   * Make it all happen
	   * @return    {React}
	   */


	  TextEditor.prototype.render = function render() {
	    var classes = (0, _classnames2.default)(this.props.className, 'text-editor', {
	      'text-editor--editable': this.props.editable,
	      'focus': this.state.focus
	    });
	    return _react2.default.createElement(
	      'div',
	      {
	        className: classes,
	        onClick: this.handleClick.bind(this),
	        onMouseEnter: this.props.onMouseEnter,
	        onMouseLeave: this.props.onMouseLeave
	      },
	      this.renderButtons(),
	      this.renderPlaceholder(),
	      this.renderContent()
	    );
	  };

	  return TextEditor;
	}(_react2.default.Component);

	exports.default = TextEditor;


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
	  onMouseEnter: function onMouseEnter() {},
	  onMouseLeave: function onMouseLeave() {},
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

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("react-dom");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file ContentEditable React Component
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Isaac Suttell <isaac@isaacsuttell.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	var ContentEditable = function (_React$Component) {
	  _inherits(ContentEditable, _React$Component);

	  function ContentEditable() {
	    _classCallCheck(this, ContentEditable);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  /**
	   * Only update if the html doesn't match the props
	   * @param     {Object}    nextProps
	   * @return    {Boolean}
	   */

	  ContentEditable.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps) {
	    return nextProps.html !== _reactDom2.default.findDOMNode(this).innerHTML;
	  };

	  /**
	   * Ensure the html matches
	   */


	  ContentEditable.prototype.componentDidUpdate = function componentDidUpdate() {
	    var el = _reactDom2.default.findDOMNode(this);
	    if (this.props.html !== el.innerHTML) {
	      el.innerHTML = this.props.html;
	    }
	  };

	  /**
	   * Called on input and blur. We extend the event with the value and pass up our chain the appropriate event
	   * @param     {String}   type     blur|change
	   * @param     {Event}    event
	   */


	  ContentEditable.prototype.emitChange = function emitChange(type, event) {
	    var html = _reactDom2.default.findDOMNode(this).innerHTML;

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
	  };

	  ContentEditable.prototype.stripTags = function stripTags(str) {
	    return str ? str.replace(/<\w+(\s+("[^"]*"|'[^']*'|[^>])+)?>|<\/\w+>/gi, '') : '';
	  };

	  ContentEditable.prototype.escapeHTML = function escapeHTML(str) {
	    return str ? str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;') : '';
	  };

	  /**
	   * Remove text styles from paste
	   *
	   * @param     {ClipboardEvent}    event
	   */


	  ContentEditable.prototype.handlePaste = function handlePaste(event) {
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
	  };

	  ContentEditable.prototype.handleKeyDown = function handleKeyDown(event) {
	    this.props.onKeyDown(event);
	  };

	  /**
	   * Render
	   *
	   * @return    {React}
	   */


	  ContentEditable.prototype.render = function render() {
	    return _react2.default.createElement('div', {
	      className: (0, _classnames2.default)(this.props.className),
	      contentEditable: true,
	      tabIndex: this.props.tabIndex,
	      onPaste: this.handlePaste.bind(this),
	      onInput: this.emitChange.bind(this, 'input'),
	      onKeyUp: this.emitChange.bind(this, 'keyUp'),
	      onBlur: this.emitChange.bind(this, 'blur'),
	      onKeyDown: this.handleKeyDown.bind(this)
	      /* eslint-disable */
	      , dangerouslySetInnerHTML: { __html: this.props.html }
	      /* eslint-enable */
	    });
	  };

	  return ContentEditable;
	}(_react2.default.Component);

	/**
	 * Defaults
	 * @type    {Object}
	 */


	exports.default = ContentEditable;
	ContentEditable.defaultProps = {
	  tabIndex: void 0,
	  pasteAsPlain: true,
	  onKeyDown: function onKeyDown() {},
	  onChange: function onChange() {},
	  onBlur: function onBlur() {}
	};

/***/ }
/******/ ]);