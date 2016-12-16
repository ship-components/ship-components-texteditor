/*!
 *        .__    .__                                                                          __                     __                   __             .___.__  __                
 *   _____|  |__ |__|_____             ____  ____   _____ ______   ____   ____   ____   _____/  |_  ______         _/  |_  ____ ___  ____/  |_  ____   __| _/|__|/  |_  ___________ 
 *  /  ___/  |  \|  \____ \   ______ _/ ___\/  _ \ /     \\____ \ /  _ \ /    \_/ __ \ /    \   __\/  ___/  ______ \   __\/ __ \\  \/  /\   __\/ __ \ / __ | |  \   __\/  _ \_  __ \
 *  \___ \|   Y  \  |  |_> > /_____/ \  \__(  <_> )  Y Y  \  |_> >  <_> )   |  \  ___/|   |  \  |  \___ \  /_____/  |  | \  ___/ >    <  |  | \  ___// /_/ | |  ||  | (  <_> )  | \/
 * /____  >___|  /__|   __/           \___  >____/|__|_|  /   __/ \____/|___|  /\___  >___|  /__| /____  >          |__|  \___  >__/\_ \ |__|  \___  >____ | |__||__|  \____/|__|   
 *      \/     \/   |__|                  \/            \/|__|               \/     \/     \/          \/                     \/      \/           \/     \/                        
 * ship-components-texteditor 0.2.0
 * Description: Rich Text Editor for React
 * Author: Isaac Suttell <isaac@isaacsuttell.com>
 * Homepage: https://github.com/ship-components/ship-components-texteditor
 * Bugs: https://github.com/ship-components/ship-components-texteditor/issues
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

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _immutable = __webpack_require__(4);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _draftJs = __webpack_require__(2);

	var _draftJsExportHtml = __webpack_require__(10);

	var _shipComponentsIcon = __webpack_require__(20);

	var _shipComponentsIcon2 = _interopRequireDefault(_shipComponentsIcon);

	var _StyleButton = __webpack_require__(6);

	var _StyleButton2 = _interopRequireDefault(_StyleButton);

	var _TextEditor = __webpack_require__(18);

	var _TextEditor2 = _interopRequireDefault(_TextEditor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file TextEditor React Component based on Draft
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Isaac Suttell <isaac@isaacsuttell.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @see https://facebook.github.io/draft-js/docs/overview.html
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	// CSS Module


	/**
	 * Avaiable inline styles to be used with draft-js
	 * @type    {Array}
	 */
	var INLINE_STYLES = [{
	  label: 'Bold',
	  style: 'BOLD',
	  iconClass: _shipComponentsIcon2.default.format_bold
	}, {
	  label: 'Italic',
	  style: 'ITALIC',
	  iconClass: _shipComponentsIcon2.default.format_italic
	}, {
	  label: 'Underline',
	  style: 'UNDERLINE',
	  iconClass: _shipComponentsIcon2.default.format_underlined
	}, {
	  label: 'Link',
	  style: 'LINK',
	  iconClass: _shipComponentsIcon2.default.insert_link
	}];

	/**
	 * Options for convert to HTML
	 * @see https://www.npmjs.com/package/draft-js-export-html
	 * @type    {Object}
	 */
	var TO_HTML_OPTIONS = {
	  inlineStyles: {
	    BOLD: {
	      element: 'b'
	    },
	    UNDERLINE: {
	      // When converting back to the right format this needs to be `u` otherwise
	      // wise draft-fs doesn't recognize it>
	      element: 'u'
	    },
	    ITALIC: {
	      element: 'i'
	    }
	  }
	};

	var TextEditor = function (_Component) {
	  _inherits(TextEditor, _Component);

	  function TextEditor(props) {
	    _classCallCheck(this, TextEditor);

	    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

	    var content = _this.convertContentFrom(props);

	    _this.state = {
	      focus: false,
	      editorState: _draftJs.EditorState.createWithContent(content)
	    };

	    _this.handleEditorChange = _this.handleEditorChange.bind(_this);
	    _this.handleKeyCommand = _this.handleKeyCommand.bind(_this);
	    _this.focus = _this.focus.bind(_this);
	    _this.handleInlineStyleClick = _this.handleInlineStyleClick.bind(_this);
	    return _this;
	  }

	  /**
	   * Performance catch
	   */


	  TextEditor.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	    return nextProps.editable !== this.props.editable || nextState.focus !== this.state.focus || nextState.editorState !== this.state.editorState;
	  };

	  /**
	   * Clean up
	   */


	  TextEditor.prototype.componentWillUnmount = function componentWillUnmount() {
	    clearTimeout(this.blueTimeoutId);
	  };

	  /**
	   * Get the content depending on the type of data we're passing around
	   */


	  TextEditor.prototype.convertContentFrom = function convertContentFrom() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

	    if (!props.value) {
	      return _draftJs.ContentState.createFromText('');
	    } else if (props.type === 'json') {
	      return (0, _draftJs.convertFromRaw)(props.value);
	    } else if (props.type === 'html') {
	      return _draftJs.ContentState.createFromBlockArray((0, _draftJs.convertFromHTML)(props.value));
	    } else {
	      return props.value;
	    }
	  };

	  /**
	   * Convert the content depending on what the parent wants
	   */


	  TextEditor.prototype.convertContentTo = function convertContentTo() {
	    var content = this.state.editorState.getCurrentContent();
	    if (this.props.type === 'json') {
	      return (0, _draftJs.convertToRaw)(content);
	    } else if (this.props.type === 'html') {
	      return (0, _draftJsExportHtml.stateToHTML)(content, TO_HTML_OPTIONS);
	    } else {
	      return content;
	    }
	  };

	  /**
	   * Keyboard shortcuts
	   */


	  TextEditor.prototype.handleKeyCommand = function handleKeyCommand(command) {
	    var newEditorStatue = _draftJs.RichUtils.handleKeyCommand(this.state.editorState, command);
	    if (newEditorStatue) {
	      this.handleEditorChange(newEditorStatue);
	      return 'handled';
	    }
	    return 'not-handled';
	  };

	  /**
	   * Text editor change
	   */


	  TextEditor.prototype.handleEditorChange = function handleEditorChange(editorState) {
	    var _this2 = this;

	    // Get the current selection so we can see if we have active focus
	    var focus = editorState.getSelection().getHasFocus();

	    this.setState({
	      editorState: editorState,
	      focus: focus
	    }, function () {
	      if (typeof _this2.props.onChange !== 'function') {
	        return;
	      }

	      // Convert from draft-fs format to html so its seamless with the rest of
	      // the application. Should remove this eventually
	      var value = _this2.convertContentTo();

	      // limit change events to only times it changed
	      _this2.props.onChange({
	        target: {
	          value: value
	        }
	      });
	    });
	  };

	  /**
	   * Refocus the cursor on the editor
	   * @public
	   */


	  TextEditor.prototype.focus = function focus() {
	    this.refs.editor.focus();
	  };

	  /**
	   * Toggle an inline style
	   */


	  TextEditor.prototype.handleInlineStyleClick = function handleInlineStyleClick(inlineStyle, event) {
	    if (!this.props.editable) {
	      return;
	    }
	    if (event) {
	      event.preventDefault();
	    }

	    // Generate new state with inline style applied
	    var editorState = _draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle);

	    // Update
	    this.handleEditorChange(editorState);
	  };

	  /**
	   * Make it all happen
	   * @return    {React}
	   */


	  TextEditor.prototype.render = function render() {
	    var _classNames,
	        _this3 = this;

	    // Grab the state of the editor, part of draft-fs
	    var editorState = this.state.editorState;

	    // Get the current selection so we can see if we have active focus

	    var selectionState = editorState.getSelection();

	    // Get the current style of the selection so we can change the look of the
	    // buttons
	    var currentStyle = editorState.getCurrentInlineStyle();

	    return _react2.default.createElement(
	      'div',
	      { className: (0, _classnames2.default)(_TextEditor2.default.container, this.props.className, 'text-editor', (_classNames = {
	          'text-editor--editable': this.props.editable,
	          'text-editor--focus': this.state.focus
	        }, _defineProperty(_classNames, _TextEditor2.default.editable, this.props.editable), _defineProperty(_classNames, _TextEditor2.default.focus, this.state.focus), _classNames)) },
	      this.props.editable ? _react2.default.createElement(
	        'div',
	        { className: _TextEditor2.default.controls },
	        INLINE_STYLES
	        // Allow user to select styles to show
	        .filter(function (type) {
	          return _this3.props.inlineStyles.has(type.style);
	        }).map(function (type) {
	          return _react2.default.createElement(_StyleButton2.default, _extends({
	            key: type.style,
	            editorState: editorState
	            // Determine if the style is active or not
	            , active: selectionState.getHasFocus() && currentStyle.has(type.style),
	            onMouseDown: _this3.handleInlineStyleClick.bind(_this3, type.style)
	          }, type));
	        })
	      ) : null,
	      _react2.default.createElement(
	        'div',
	        {
	          onClick: this.focus,
	          className: _TextEditor2.default.editor
	        },
	        _react2.default.createElement(_draftJs.Editor, {
	          ref: 'editor',
	          editorState: editorState,
	          onChange: this.handleEditorChange,
	          handleKeyCommand: this.handleKeyCommand,
	          placeholder: this.props.placeholder,
	          readOnly: !this.props.editable,
	          onFocus: this.props.onFocus,
	          onBlur: this.props.onBlur,
	          stripPastedStyles: this.props.stripPastedStyles,
	          spellCheck: this.props.spellCheck,
	          tabIndex: this.props.tabIndex
	        })
	      )
	    );
	  };

	  return TextEditor;
	}(_react.Component);

	/**
	 * Type checking
	 * @type    {Object}
	 */


	exports.default = TextEditor;
	TextEditor.propTypes = {
	  inlineStyles: _react.PropTypes.instanceOf(_immutable2.default.Set),
	  focusTimeout: _react.PropTypes.number,
	  tabIndex: _react.PropTypes.number,
	  className: _react.PropTypes.string,
	  editable: _react.PropTypes.bool,
	  value: _react.PropTypes.any.isRequired,
	  type: _react.PropTypes.oneOf(['html', 'json', 'Immutable']),
	  spellCheck: _react.PropTypes.bool,
	  stripPastedStyles: _react.PropTypes.bool
	};

	/**
	 * Defaults
	 * @type    {Object}
	 */
	TextEditor.defaultProps = {
	  inlineStyles: new _immutable2.default.Set(['BOLD', 'ITALIC', 'UNDERLINE']),
	  focusTimeout: 500,
	  editable: true,
	  type: 'html',
	  spellCheck: true,
	  stripPastedStyles: true
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	/**
	 * Returns an array of all `ContentBlock` instances within two block keys
	 *
	 * @param  {object} contentState A draft.js `ContentState` instance
	 * @param  {string} anchorKey    The block key to start searching from
	 * @param  {string} focusKey     The block key until which to search
	 *
	 * @return {array} An array containing the found content blocks
	 */
	exports.default = function (contentState, anchorKey, focusKey) {
	  var isSameBlock = anchorKey === focusKey;
	  var startingBlock = contentState.getBlockForKey(anchorKey);

	  if (!startingBlock) {
	    return [];
	  }

	  var selectedBlocks = [startingBlock];

	  if (!isSameBlock) {
	    var blockKey = anchorKey;

	    while (blockKey !== focusKey) {
	      var nextBlock = contentState.getBlockAfter(blockKey);

	      if (!nextBlock) {
	        selectedBlocks = [];
	        break;
	      }

	      selectedBlocks.push(nextBlock);
	      blockKey = nextBlock.getKey();
	    }
	  }

	  return selectedBlocks;
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("draft-js");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _react = __webpack_require__(5);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(3);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _StyleButton = __webpack_require__(17);

	var _StyleButton2 = _interopRequireDefault(_StyleButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file Text Editor StyleButton
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Isaac Suttell <isaac@isaacsuttell.com>
	                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

	// CSS Module


	var StyleButton = function (_Component) {
	  _inherits(StyleButton, _Component);

	  function StyleButton() {
	    _classCallCheck(this, StyleButton);

	    return _possibleConstructorReturn(this, _Component.apply(this, arguments));
	  }

	  /**
	   * Make Render
	   * @return    {React}
	   */

	  StyleButton.prototype.render = function render() {
	    return _react2.default.createElement('div', {
	      className: (0, _classnames2.default)(this.props.className, _StyleButton2.default.btn, _StyleButton2.default.iconBtn, this.props.iconClass, _defineProperty({}, _StyleButton2.default.active, this.props.active)),
	      onMouseDown: this.props.onMouseDown
	    });
	  };

	  return StyleButton;
	}(_react.Component);

	/**
	 * Type checking
	 * @type    {Object}
	 */


	exports.default = StyleButton;
	StyleButton.propTypes = {
	  iconClass: _react.PropTypes.string.isRequired,
	  style: _react.PropTypes.string.isRequired,
	  label: _react.PropTypes.string.isRequired,
	  active: _react.PropTypes.bool.isRequired,
	  className: _react.PropTypes.string
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function combineOrderedStyles(customMap, defaults) {
	  if (customMap == null) {
	    return defaults;
	  }

	  var _defaults = _slicedToArray(defaults, 2);

	  var defaultStyleMap = _defaults[0];
	  var defaultStyleOrder = _defaults[1];

	  var styleMap = _extends({}, defaultStyleMap);
	  var styleOrder = [].concat(_toConsumableArray(defaultStyleOrder));
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = Object.keys(customMap)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var _styleName = _step.value;

	      if (defaultStyleMap.hasOwnProperty(_styleName)) {
	        var defaultStyles = defaultStyleMap[_styleName];
	        styleMap[_styleName] = _extends({}, defaultStyles, customMap[_styleName]);
	      } else {
	        styleMap[_styleName] = customMap[_styleName];
	        styleOrder.push(_styleName);
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return [styleMap, styleOrder];
	}

	exports.default = combineOrderedStyles;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});


	// Lifted from: https://github.com/facebook/react/blob/master/src/renderers/dom/shared/HTMLDOMPropertyConfig.js
	var ATTR_NAME_MAP = {
	  acceptCharset: 'accept-charset',
	  className: 'class',
	  htmlFor: 'for',
	  httpEquiv: 'http-equiv'
	};

	function normalizeAttributes(attributes) {
	  if (attributes == null) {
	    return attributes;
	  }
	  var normalized = {};
	  var didNormalize = false;
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = Object.keys(attributes)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var name = _step.value;

	      var newName = name;
	      if (ATTR_NAME_MAP.hasOwnProperty(name)) {
	        newName = ATTR_NAME_MAP[name];
	        didNormalize = true;
	      }
	      normalized[newName] = attributes[name];
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return didNormalize ? normalized : attributes;
	}

	exports.default = normalizeAttributes;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _CSSProperty = __webpack_require__(19);

	var VENDOR_PREFIX = /^(moz|ms|o|webkit)-/;

	var NUMERIC_STRING = /^\d+$/;
	var UPPERCASE_PATTERN = /([A-Z])/g;

	// Lifted from: https://github.com/facebook/react/blob/master/src/renderers/dom/shared/CSSPropertyOperations.js
	function processStyleName(name) {
	  return name.replace(UPPERCASE_PATTERN, '-$1').toLowerCase().replace(VENDOR_PREFIX, '-$1-');
	}

	// Lifted from: https://github.com/facebook/react/blob/master/src/renderers/dom/shared/dangerousStyleValue.js
	function processStyleValue(name, value) {
	  var isNumeric = void 0;
	  if (typeof value === 'string') {
	    isNumeric = NUMERIC_STRING.test(value);
	  } else {
	    isNumeric = true;
	    value = String(value);
	  }
	  if (!isNumeric || value === '0' || _CSSProperty.isUnitlessNumber[name] === true) {
	    return value;
	  } else {
	    return value + 'px';
	  }
	}

	function styleToCSS(styleDescr) {
	  return Object.keys(styleDescr).map(function (name) {
	    var styleValue = processStyleValue(name, styleDescr[name]);
	    var styleName = processStyleName(name);
	    return styleName + ': ' + styleValue;
	  }).join('; ');
	}

	exports.default = styleToCSS;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stateToHTML = __webpack_require__(11);

	Object.defineProperty(exports, 'stateToHTML', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_stateToHTML).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DEFAULT_STYLE_MAP, _ENTITY_ATTR_MAP, _DATA_TO_ATTR;

	exports.default = stateToHTML;

	var _combineOrderedStyles3 = __webpack_require__(7);

	var _combineOrderedStyles4 = _interopRequireDefault(_combineOrderedStyles3);

	var _normalizeAttributes = __webpack_require__(8);

	var _normalizeAttributes2 = _interopRequireDefault(_normalizeAttributes);

	var _styleToCSS = __webpack_require__(9);

	var _styleToCSS2 = _interopRequireDefault(_styleToCSS);

	var _draftJs = __webpack_require__(2);

	var _draftJsUtils = __webpack_require__(15);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var BOLD = _draftJsUtils.INLINE_STYLE.BOLD;
	var CODE = _draftJsUtils.INLINE_STYLE.CODE;
	var ITALIC = _draftJsUtils.INLINE_STYLE.ITALIC;
	var STRIKETHROUGH = _draftJsUtils.INLINE_STYLE.STRIKETHROUGH;
	var UNDERLINE = _draftJsUtils.INLINE_STYLE.UNDERLINE;


	var INDENT = '  ';
	var BREAK = '<br>';
	var DATA_ATTRIBUTE = /^data-([a-z0-9-]+)$/;

	var DEFAULT_STYLE_MAP = (_DEFAULT_STYLE_MAP = {}, _defineProperty(_DEFAULT_STYLE_MAP, BOLD, { element: 'strong' }), _defineProperty(_DEFAULT_STYLE_MAP, CODE, { element: 'code' }), _defineProperty(_DEFAULT_STYLE_MAP, ITALIC, { element: 'em' }), _defineProperty(_DEFAULT_STYLE_MAP, STRIKETHROUGH, { element: 'del' }), _defineProperty(_DEFAULT_STYLE_MAP, UNDERLINE, { element: 'ins' }), _DEFAULT_STYLE_MAP);

	// Order: inner-most style to outer-most.
	// Examle: <em><strong>foo</strong></em>
	var DEFAULT_STYLE_ORDER = [BOLD, ITALIC, UNDERLINE, STRIKETHROUGH, CODE];

	// Map entity data to element attributes.
	var ENTITY_ATTR_MAP = (_ENTITY_ATTR_MAP = {}, _defineProperty(_ENTITY_ATTR_MAP, _draftJsUtils.ENTITY_TYPE.LINK, { url: 'href', rel: 'rel', target: 'target', title: 'title', className: 'class' }), _defineProperty(_ENTITY_ATTR_MAP, _draftJsUtils.ENTITY_TYPE.IMAGE, { src: 'src', height: 'height', width: 'width', alt: 'alt', className: 'class' }), _ENTITY_ATTR_MAP);

	// Map entity data to element attributes.
	var DATA_TO_ATTR = (_DATA_TO_ATTR = {}, _defineProperty(_DATA_TO_ATTR, _draftJsUtils.ENTITY_TYPE.LINK, function (entityType, entity) {
	  var attrMap = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? ENTITY_ATTR_MAP[entityType] : {};
	  var data = entity.getData();
	  var attrs = {};
	  var _iteratorNormalCompletion = true;
	  var _didIteratorError = false;
	  var _iteratorError = undefined;

	  try {
	    for (var _iterator = Object.keys(data)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	      var dataKey = _step.value;

	      var dataValue = data[dataKey];
	      if (attrMap.hasOwnProperty(dataKey)) {
	        var attrKey = attrMap[dataKey];
	        attrs[attrKey] = dataValue;
	      } else if (DATA_ATTRIBUTE.test(dataKey)) {
	        attrs[dataKey] = dataValue;
	      }
	    }
	  } catch (err) {
	    _didIteratorError = true;
	    _iteratorError = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion && _iterator.return) {
	        _iterator.return();
	      }
	    } finally {
	      if (_didIteratorError) {
	        throw _iteratorError;
	      }
	    }
	  }

	  return attrs;
	}), _defineProperty(_DATA_TO_ATTR, _draftJsUtils.ENTITY_TYPE.IMAGE, function (entityType, entity) {
	  var attrMap = ENTITY_ATTR_MAP.hasOwnProperty(entityType) ? ENTITY_ATTR_MAP[entityType] : {};
	  var data = entity.getData();
	  var attrs = {};
	  var _iteratorNormalCompletion2 = true;
	  var _didIteratorError2 = false;
	  var _iteratorError2 = undefined;

	  try {
	    for (var _iterator2 = Object.keys(data)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	      var dataKey = _step2.value;

	      var dataValue = data[dataKey];
	      if (attrMap.hasOwnProperty(dataKey)) {
	        var attrKey = attrMap[dataKey];
	        attrs[attrKey] = dataValue;
	      } else if (DATA_ATTRIBUTE.test(dataKey)) {
	        attrs[dataKey] = dataValue;
	      }
	    }
	  } catch (err) {
	    _didIteratorError2 = true;
	    _iteratorError2 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion2 && _iterator2.return) {
	        _iterator2.return();
	      }
	    } finally {
	      if (_didIteratorError2) {
	        throw _iteratorError2;
	      }
	    }
	  }

	  return attrs;
	}), _DATA_TO_ATTR);

	// The reason this returns an array is because a single block might get wrapped
	// in two tags.
	function getTags(blockType) {
	  switch (blockType) {
	    case _draftJsUtils.BLOCK_TYPE.HEADER_ONE:
	      return ['h1'];
	    case _draftJsUtils.BLOCK_TYPE.HEADER_TWO:
	      return ['h2'];
	    case _draftJsUtils.BLOCK_TYPE.HEADER_THREE:
	      return ['h3'];
	    case _draftJsUtils.BLOCK_TYPE.HEADER_FOUR:
	      return ['h4'];
	    case _draftJsUtils.BLOCK_TYPE.HEADER_FIVE:
	      return ['h5'];
	    case _draftJsUtils.BLOCK_TYPE.HEADER_SIX:
	      return ['h6'];
	    case _draftJsUtils.BLOCK_TYPE.UNORDERED_LIST_ITEM:
	    case _draftJsUtils.BLOCK_TYPE.ORDERED_LIST_ITEM:
	      return ['li'];
	    case _draftJsUtils.BLOCK_TYPE.BLOCKQUOTE:
	      return ['blockquote'];
	    case _draftJsUtils.BLOCK_TYPE.CODE:
	      return ['pre', 'code'];
	    case _draftJsUtils.BLOCK_TYPE.ATOMIC:
	      return ['figure'];
	    default:
	      return ['p'];
	  }
	}

	function getWrapperTag(blockType) {
	  switch (blockType) {
	    case _draftJsUtils.BLOCK_TYPE.UNORDERED_LIST_ITEM:
	      return 'ul';
	    case _draftJsUtils.BLOCK_TYPE.ORDERED_LIST_ITEM:
	      return 'ol';
	    default:
	      return null;
	  }
	}

	var MarkupGenerator = function () {
	  // These are related to state.
	  function MarkupGenerator(contentState, options) {
	    _classCallCheck(this, MarkupGenerator);

	    if (options == null) {
	      options = {};
	    }
	    this.contentState = contentState;
	    this.options = options;

	    var _combineOrderedStyles = (0, _combineOrderedStyles4.default)(options.inlineStyles, [DEFAULT_STYLE_MAP, DEFAULT_STYLE_ORDER]);

	    var _combineOrderedStyles2 = _slicedToArray(_combineOrderedStyles, 2);

	    var inlineStyles = _combineOrderedStyles2[0];
	    var styleOrder = _combineOrderedStyles2[1];

	    this.inlineStyles = inlineStyles;
	    this.styleOrder = styleOrder;
	  }
	  // These are related to user-defined options.


	  _createClass(MarkupGenerator, [{
	    key: 'generate',
	    value: function generate() {
	      this.output = [];
	      this.blocks = this.contentState.getBlocksAsArray();
	      this.totalBlocks = this.blocks.length;
	      this.currentBlock = 0;
	      this.indentLevel = 0;
	      this.wrapperTag = null;
	      while (this.currentBlock < this.totalBlocks) {
	        this.processBlock();
	      }
	      this.closeWrapperTag();
	      return this.output.join('').trim();
	    }
	  }, {
	    key: 'processBlock',
	    value: function processBlock() {
	      var blockRenderers = this.options.blockRenderers;

	      var block = this.blocks[this.currentBlock];
	      var blockType = block.getType();
	      var newWrapperTag = getWrapperTag(blockType);
	      if (this.wrapperTag !== newWrapperTag) {
	        if (this.wrapperTag) {
	          this.closeWrapperTag();
	        }
	        if (newWrapperTag) {
	          this.openWrapperTag(newWrapperTag);
	        }
	      }
	      this.indent();
	      // Allow blocks to be rendered using a custom renderer.
	      var customRenderer = blockRenderers != null && blockRenderers.hasOwnProperty(blockType) ? blockRenderers[blockType] : null;
	      var customRendererOutput = customRenderer ? customRenderer(block) : null;
	      // Renderer can return null, which will cause processing to continue as normal.
	      if (customRendererOutput != null) {
	        this.output.push(customRendererOutput);
	        this.output.push('\n');
	        this.currentBlock += 1;
	        return;
	      }
	      this.writeStartTag(block);
	      this.output.push(this.renderBlockContent(block));
	      // Look ahead and see if we will nest list.
	      var nextBlock = this.getNextBlock();
	      if (canHaveDepth(blockType) && nextBlock && nextBlock.getDepth() === block.getDepth() + 1) {
	        this.output.push('\n');
	        // This is a litle hacky: temporarily stash our current wrapperTag and
	        // render child list(s).
	        var thisWrapperTag = this.wrapperTag;
	        this.wrapperTag = null;
	        this.indentLevel += 1;
	        this.currentBlock += 1;
	        this.processBlocksAtDepth(nextBlock.getDepth());
	        this.wrapperTag = thisWrapperTag;
	        this.indentLevel -= 1;
	        this.indent();
	      } else {
	        this.currentBlock += 1;
	      }
	      this.writeEndTag(block);
	    }
	  }, {
	    key: 'processBlocksAtDepth',
	    value: function processBlocksAtDepth(depth) {
	      var block = this.blocks[this.currentBlock];
	      while (block && block.getDepth() === depth) {
	        this.processBlock();
	        block = this.blocks[this.currentBlock];
	      }
	      this.closeWrapperTag();
	    }
	  }, {
	    key: 'getNextBlock',
	    value: function getNextBlock() {
	      return this.blocks[this.currentBlock + 1];
	    }
	  }, {
	    key: 'writeStartTag',
	    value: function writeStartTag(block) {
	      var tags = getTags(block.getType());

	      var attrString = void 0;
	      if (this.options.blockStyleFn) {
	        var _ref = this.options.blockStyleFn(block) || {};

	        var _attributes = _ref.attributes;
	        var _style = _ref.style;
	        // Normalize `className` -> `class`, etc.

	        _attributes = (0, _normalizeAttributes2.default)(_attributes);
	        if (_style != null) {
	          var styleAttr = (0, _styleToCSS2.default)(_style);
	          _attributes = _attributes == null ? { style: styleAttr } : _extends({}, _attributes, { style: styleAttr });
	        }
	        attrString = stringifyAttrs(_attributes);
	      } else {
	        attrString = '';
	      }

	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = tags[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var tag = _step3.value;

	          this.output.push('<' + tag + attrString + '>');
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'writeEndTag',
	    value: function writeEndTag(block) {
	      var tags = getTags(block.getType());
	      if (tags.length === 1) {
	        this.output.push('</' + tags[0] + '>\n');
	      } else {
	        var output = [];
	        var _iteratorNormalCompletion4 = true;
	        var _didIteratorError4 = false;
	        var _iteratorError4 = undefined;

	        try {
	          for (var _iterator4 = tags[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	            var tag = _step4.value;

	            output.unshift('</' + tag + '>');
	          }
	        } catch (err) {
	          _didIteratorError4 = true;
	          _iteratorError4 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion4 && _iterator4.return) {
	              _iterator4.return();
	            }
	          } finally {
	            if (_didIteratorError4) {
	              throw _iteratorError4;
	            }
	          }
	        }

	        this.output.push(output.join('') + '\n');
	      }
	    }
	  }, {
	    key: 'openWrapperTag',
	    value: function openWrapperTag(wrapperTag) {
	      this.wrapperTag = wrapperTag;
	      this.indent();
	      this.output.push('<' + wrapperTag + '>\n');
	      this.indentLevel += 1;
	    }
	  }, {
	    key: 'closeWrapperTag',
	    value: function closeWrapperTag() {
	      var wrapperTag = this.wrapperTag;

	      if (wrapperTag) {
	        this.indentLevel -= 1;
	        this.indent();
	        this.output.push('</' + wrapperTag + '>\n');
	        this.wrapperTag = null;
	      }
	    }
	  }, {
	    key: 'indent',
	    value: function indent() {
	      this.output.push(INDENT.repeat(this.indentLevel));
	    }
	  }, {
	    key: 'renderBlockContent',
	    value: function renderBlockContent(block) {
	      var _this = this;

	      var blockType = block.getType();
	      var text = block.getText();
	      if (text === '') {
	        // Prevent element collapse if completely empty.
	        return BREAK;
	      }
	      text = this.preserveWhitespace(text);
	      var charMetaList = block.getCharacterList();
	      var entityPieces = (0, _draftJsUtils.getEntityRanges)(text, charMetaList);
	      return entityPieces.map(function (_ref2) {
	        var _ref3 = _slicedToArray(_ref2, 2);

	        var entityKey = _ref3[0];
	        var stylePieces = _ref3[1];

	        var content = stylePieces.map(function (_ref4) {
	          var _ref5 = _slicedToArray(_ref4, 2);

	          var text = _ref5[0];
	          var styleSet = _ref5[1];

	          var content = encodeContent(text);
	          var _iteratorNormalCompletion5 = true;
	          var _didIteratorError5 = false;
	          var _iteratorError5 = undefined;

	          try {
	            for (var _iterator5 = _this.styleOrder[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	              var _styleName = _step5.value;

	              // If our block type is CODE then don't wrap inline code elements.
	              if (_styleName === CODE && blockType === _draftJsUtils.BLOCK_TYPE.CODE) {
	                continue;
	              }
	              if (styleSet.has(_styleName)) {
	                var _inlineStyles$_styleN = _this.inlineStyles[_styleName];
	                var _element = _inlineStyles$_styleN.element;
	                var _attributes2 = _inlineStyles$_styleN.attributes;
	                var _style2 = _inlineStyles$_styleN.style;

	                if (_element == null) {
	                  _element = 'span';
	                }
	                // Normalize `className` -> `class`, etc.
	                _attributes2 = (0, _normalizeAttributes2.default)(_attributes2);
	                if (_style2 != null) {
	                  var styleAttr = (0, _styleToCSS2.default)(_style2);
	                  _attributes2 = _attributes2 == null ? { style: styleAttr } : _extends({}, _attributes2, { style: styleAttr });
	                }
	                var attrString = stringifyAttrs(_attributes2);
	                content = '<' + _element + attrString + '>' + content + '</' + _element + '>';
	              }
	            }
	          } catch (err) {
	            _didIteratorError5 = true;
	            _iteratorError5 = err;
	          } finally {
	            try {
	              if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                _iterator5.return();
	              }
	            } finally {
	              if (_didIteratorError5) {
	                throw _iteratorError5;
	              }
	            }
	          }

	          return content;
	        }).join('');
	        var entity = entityKey ? _draftJs.Entity.get(entityKey) : null;
	        // Note: The `toUpperCase` below is for compatability with some libraries that use lower-case for image blocks.
	        var entityType = entity == null ? null : entity.getType().toUpperCase();
	        if (entityType != null && entityType === _draftJsUtils.ENTITY_TYPE.LINK) {
	          var attrs = DATA_TO_ATTR.hasOwnProperty(entityType) ? DATA_TO_ATTR[entityType](entityType, entity) : null;
	          var attrString = stringifyAttrs(attrs);
	          return '<a' + attrString + '>' + content + '</a>';
	        } else if (entityType != null && entityType === _draftJsUtils.ENTITY_TYPE.IMAGE) {
	          var _attrs = DATA_TO_ATTR.hasOwnProperty(entityType) ? DATA_TO_ATTR[entityType](entityType, entity) : null;
	          var _attrString = stringifyAttrs(_attrs);
	          return '<img' + _attrString + '/>';
	        } else {
	          return content;
	        }
	      }).join('');
	    }
	  }, {
	    key: 'preserveWhitespace',
	    value: function preserveWhitespace(text) {
	      var length = text.length;
	      // Prevent leading/trailing/consecutive whitespace collapse.
	      var newText = new Array(length);
	      for (var i = 0; i < length; i++) {
	        if (text[i] === ' ' && (i === 0 || i === length - 1 || text[i - 1] === ' ')) {
	          newText[i] = '\xA0';
	        } else {
	          newText[i] = text[i];
	        }
	      }
	      return newText.join('');
	    }
	  }]);

	  return MarkupGenerator;
	}();

	function stringifyAttrs(attrs) {
	  if (attrs == null) {
	    return '';
	  }
	  var parts = [];
	  var _iteratorNormalCompletion6 = true;
	  var _didIteratorError6 = false;
	  var _iteratorError6 = undefined;

	  try {
	    for (var _iterator6 = Object.keys(attrs)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	      var name = _step6.value;

	      var value = attrs[name];
	      if (value != null) {
	        parts.push(' ' + name + '="' + encodeAttr(value + '') + '"');
	      }
	    }
	  } catch (err) {
	    _didIteratorError6 = true;
	    _iteratorError6 = err;
	  } finally {
	    try {
	      if (!_iteratorNormalCompletion6 && _iterator6.return) {
	        _iterator6.return();
	      }
	    } finally {
	      if (_didIteratorError6) {
	        throw _iteratorError6;
	      }
	    }
	  }

	  return parts.join('');
	}

	function canHaveDepth(blockType) {
	  switch (blockType) {
	    case _draftJsUtils.BLOCK_TYPE.UNORDERED_LIST_ITEM:
	    case _draftJsUtils.BLOCK_TYPE.ORDERED_LIST_ITEM:
	      return true;
	    default:
	      return false;
	  }
	}

	function encodeContent(text) {
	  return text.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('\xA0').join('&nbsp;').split('\n').join(BREAK + '\n');
	}

	function encodeAttr(text) {
	  return text.split('&').join('&amp;').split('<').join('&lt;').split('>').join('&gt;').split('"').join('&quot;');
	}

	function stateToHTML(content, options) {
	  return new MarkupGenerator(content, options).generate();
	}

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var BLOCK_TYPE = exports.BLOCK_TYPE = {
	  // This is used to represent a normal text block (paragraph).
	  UNSTYLED: 'unstyled',
	  HEADER_ONE: 'header-one',
	  HEADER_TWO: 'header-two',
	  HEADER_THREE: 'header-three',
	  HEADER_FOUR: 'header-four',
	  HEADER_FIVE: 'header-five',
	  HEADER_SIX: 'header-six',
	  UNORDERED_LIST_ITEM: 'unordered-list-item',
	  ORDERED_LIST_ITEM: 'ordered-list-item',
	  BLOCKQUOTE: 'blockquote',
	  PULLQUOTE: 'pullquote',
	  CODE: 'code-block',
	  ATOMIC: 'atomic'
	};

	var ENTITY_TYPE = exports.ENTITY_TYPE = {
	  LINK: 'LINK',
	  IMAGE: 'IMAGE'
	};

	var INLINE_STYLE = exports.INLINE_STYLE = {
	  BOLD: 'BOLD',
	  CODE: 'CODE',
	  ITALIC: 'ITALIC',
	  STRIKETHROUGH: 'STRIKETHROUGH',
	  UNDERLINE: 'UNDERLINE'
	};

	exports.default = {
	  BLOCK_TYPE: BLOCK_TYPE,
	  ENTITY_TYPE: ENTITY_TYPE,
	  INLINE_STYLE: INLINE_STYLE
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _draftJs = __webpack_require__(2);

	var _getSelectedBlocks = __webpack_require__(1);

	var _getSelectedBlocks2 = _interopRequireDefault(_getSelectedBlocks);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Calls a provided `modifier` function with a selection for each
	 * selected block in the current editor selection. Passes through additional
	 * arguments to the modifier.
	 *
	 * Note: At the moment it will retain the original selection and override
	 * possible selection changes from modifiers
	 *
	 * @param  {object} editorState The current draft.js editor state object
	 *
	 * @param  {function} modifier  A modifier function to be executed.
	 *                              Must have the signature (editorState, selection, ...)
	 *
	 * @param  {mixed} ...args      Additional arguments to be passed through to the modifier
	 *
	 * @return {object} The new editor state
	 */
	exports.default = function (editorState, modifier) {
	  for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    args[_key - 2] = arguments[_key];
	  }

	  var contentState = editorState.getCurrentContent();
	  var currentSelection = editorState.getSelection();

	  var startKey = currentSelection.getStartKey();
	  var endKey = currentSelection.getEndKey();
	  var startOffset = currentSelection.getStartOffset();
	  var endOffset = currentSelection.getEndOffset();

	  var isSameBlock = startKey === endKey;
	  var selectedBlocks = (0, _getSelectedBlocks2.default)(contentState, startKey, endKey);

	  var finalEditorState = editorState;
	  selectedBlocks.forEach(function (block) {
	    var currentBlockKey = block.getKey();
	    var selectionStart = startOffset;
	    var selectionEnd = endOffset;

	    if (currentBlockKey === startKey) {
	      selectionStart = startOffset;
	      selectionEnd = isSameBlock ? endOffset : block.getText().length;
	    } else if (currentBlockKey === endKey) {
	      selectionStart = isSameBlock ? startOffset : 0;
	      selectionEnd = endOffset;
	    } else {
	      selectionStart = 0;
	      selectionEnd = block.getText().length;
	    }

	    var selection = new _draftJs.SelectionState({
	      anchorKey: currentBlockKey,
	      anchorOffset: selectionStart,
	      focusKey: currentBlockKey,
	      focusOffset: selectionEnd
	    });

	    finalEditorState = modifier.apply(undefined, [finalEditorState, selection].concat(args));
	  });

	  return _draftJs.EditorState.forceSelection(finalEditorState, currentSelection);
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EMPTY_SET = undefined;
	exports.default = getEntityRanges;

	var _immutable = __webpack_require__(4);

	var EMPTY_SET = exports.EMPTY_SET = new _immutable.OrderedSet();
	function getEntityRanges(text, charMetaList) {
	  var charEntity = null;
	  var prevCharEntity = null;
	  var ranges = [];
	  var rangeStart = 0;
	  for (var i = 0, len = text.length; i < len; i++) {
	    prevCharEntity = charEntity;
	    var meta = charMetaList.get(i);
	    charEntity = meta ? meta.getEntity() : null;
	    if (i > 0 && charEntity !== prevCharEntity) {
	      ranges.push([prevCharEntity, getStyleRanges(text.slice(rangeStart, i), charMetaList.slice(rangeStart, i))]);
	      rangeStart = i;
	    }
	  }
	  ranges.push([charEntity, getStyleRanges(text.slice(rangeStart), charMetaList.slice(rangeStart))]);
	  return ranges;
	}

	function getStyleRanges(text, charMetaList) {
	  var charStyle = EMPTY_SET;
	  var prevCharStyle = EMPTY_SET;
	  var ranges = [];
	  var rangeStart = 0;
	  for (var i = 0, len = text.length; i < len; i++) {
	    prevCharStyle = charStyle;
	    var meta = charMetaList.get(i);
	    charStyle = meta ? meta.getStyle() : EMPTY_SET;
	    if (i > 0 && !(0, _immutable.is)(charStyle, prevCharStyle)) {
	      ranges.push([text.slice(rangeStart, i), prevCharStyle]);
	      rangeStart = i;
	    }
	  }
	  ranges.push([text.slice(rangeStart), charStyle]);
	  return ranges;
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Constants = __webpack_require__(12);

	Object.keys(_Constants).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Constants[key];
	    }
	  });
	});
	Object.defineProperty(exports, 'Constants', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_Constants).default;
	  }
	});

	var _getEntityRanges = __webpack_require__(14);

	Object.defineProperty(exports, 'getEntityRanges', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_getEntityRanges).default;
	  }
	});

	var _getSelectedBlocks = __webpack_require__(1);

	Object.defineProperty(exports, 'getSelectedBlocks', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_getSelectedBlocks).default;
	  }
	});

	var _selectionContainsEntity = __webpack_require__(16);

	Object.defineProperty(exports, 'selectionContainsEntity', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_selectionContainsEntity).default;
	  }
	});

	var _callModifierForSelectedBlocks = __webpack_require__(13);

	Object.defineProperty(exports, 'callModifierForSelectedBlocks', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_callModifierForSelectedBlocks).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getSelectedBlocks = __webpack_require__(1);

	var _getSelectedBlocks2 = _interopRequireDefault(_getSelectedBlocks);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (strategy) {
	  return function (editorState, selection) {
	    var contentState = editorState.getCurrentContent();
	    var currentSelection = selection || editorState.getSelection();
	    var startKey = currentSelection.getStartKey();
	    var endKey = currentSelection.getEndKey();
	    var startOffset = currentSelection.getStartOffset();
	    var endOffset = currentSelection.getEndOffset();

	    var isSameBlock = startKey === endKey;
	    var selectedBlocks = (0, _getSelectedBlocks2.default)(contentState, startKey, endKey);
	    var entityFound = false;

	    // We have to shift the offset to not get false positives when selecting
	    // a character just before or after an entity
	    var finalStartOffset = startOffset + 1;
	    var finalEndOffset = endOffset - 1;

	    selectedBlocks.forEach(function (block) {
	      strategy(block, function (start, end) {
	        if (entityFound) {
	          return;
	        }

	        var blockKey = block.getKey();

	        if (isSameBlock && (end < finalStartOffset || start > finalEndOffset)) {
	          return;
	        } else if (blockKey === startKey && end < finalStartOffset) {
	          return;
	        } else if (blockKey === endKey && start > finalEndOffset) {
	          return;
	        }

	        entityFound = true;
	      });
	    });

	    return entityFound;
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"btn":"StyleButton--btn","iconBtn":"StyleButton--iconBtn","active":"StyleButton--active"};

/***/ },
/* 18 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"TextEditor--container","editor":"TextEditor--editor","controls":"TextEditor--controls","focus":"TextEditor--focus","editable":"TextEditor--editable"};

/***/ },
/* 19 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-present, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 */

	'use strict';

	/**
	 * CSS properties which accept numbers but are not in units of "px".
	 */

	var isUnitlessNumber = {
	  animationIterationCount: true,
	  borderImageOutset: true,
	  borderImageSlice: true,
	  borderImageWidth: true,
	  boxFlex: true,
	  boxFlexGroup: true,
	  boxOrdinalGroup: true,
	  columnCount: true,
	  flex: true,
	  flexGrow: true,
	  flexPositive: true,
	  flexShrink: true,
	  flexNegative: true,
	  flexOrder: true,
	  gridRow: true,
	  gridColumn: true,
	  fontWeight: true,
	  lineClamp: true,
	  lineHeight: true,
	  opacity: true,
	  order: true,
	  orphans: true,
	  tabSize: true,
	  widows: true,
	  zIndex: true,
	  zoom: true,

	  // SVG-related properties
	  fillOpacity: true,
	  floodOpacity: true,
	  stopOpacity: true,
	  strokeDasharray: true,
	  strokeDashoffset: true,
	  strokeMiterlimit: true,
	  strokeOpacity: true,
	  strokeWidth: true
	};

	/**
	 * @param {string} prefix vendor-specific prefix, eg: Webkit
	 * @param {string} key style name, eg: transitionDuration
	 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
	 * WebkitTransitionDuration
	 */
	function prefixKey(prefix, key) {
	  return prefix + key.charAt(0).toUpperCase() + key.substring(1);
	}

	/**
	 * Support style names that may come passed in prefixed by adding permutations
	 * of vendor prefixes.
	 */
	var prefixes = ['Webkit', 'ms', 'Moz', 'O'];

	// Using Object.keys here, or else the vanilla for-in loop makes IE8 go into an
	// infinite loop, because it iterates over the newly added props too.
	Object.keys(isUnitlessNumber).forEach(function (prop) {
	  prefixes.forEach(function (prefix) {
	    isUnitlessNumber[prefixKey(prefix, prop)] = isUnitlessNumber[prop];
	  });
	});

	/**
	 * Most style properties can be unset by doing .style[prop] = '' but IE8
	 * doesn't like doing that with shorthand properties so for the properties that
	 * IE8 breaks on, which are listed here, we instead unset each of the
	 * individual properties. See http://bugs.jquery.com/ticket/12385.
	 * The 4-value 'clock' properties like margin, padding, border-width seem to
	 * behave without any problems. Curiously, list-style works too without any
	 * special prodding.
	 */
	var shorthandPropertyExpansions = {
	  background: {
	    backgroundAttachment: true,
	    backgroundColor: true,
	    backgroundImage: true,
	    backgroundPositionX: true,
	    backgroundPositionY: true,
	    backgroundRepeat: true
	  },
	  backgroundPosition: {
	    backgroundPositionX: true,
	    backgroundPositionY: true
	  },
	  border: {
	    borderWidth: true,
	    borderStyle: true,
	    borderColor: true
	  },
	  borderBottom: {
	    borderBottomWidth: true,
	    borderBottomStyle: true,
	    borderBottomColor: true
	  },
	  borderLeft: {
	    borderLeftWidth: true,
	    borderLeftStyle: true,
	    borderLeftColor: true
	  },
	  borderRight: {
	    borderRightWidth: true,
	    borderRightStyle: true,
	    borderRightColor: true
	  },
	  borderTop: {
	    borderTopWidth: true,
	    borderTopStyle: true,
	    borderTopColor: true
	  },
	  font: {
	    fontStyle: true,
	    fontVariant: true,
	    fontWeight: true,
	    fontSize: true,
	    lineHeight: true,
	    fontFamily: true
	  },
	  outline: {
	    outlineWidth: true,
	    outlineStyle: true,
	    outlineColor: true
	  }
	};

	var CSSProperty = {
	  isUnitlessNumber: isUnitlessNumber,
	  shorthandPropertyExpansions: shorthandPropertyExpansions
	};

	module.exports = CSSProperty;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("ship-components-icon");

/***/ }
/******/ ]);