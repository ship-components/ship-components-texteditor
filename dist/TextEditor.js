/*!
 *        .__    .__                                                                          __                     __                   __             .___.__  __                
 *   _____|  |__ |__|_____             ____  ____   _____ ______   ____   ____   ____   _____/  |_  ______         _/  |_  ____ ___  ____/  |_  ____   __| _/|__|/  |_  ___________ 
 *  /  ___/  |  \|  \____ \   ______ _/ ___\/  _ \ /     \\____ \ /  _ \ /    \_/ __ \ /    \   __\/  ___/  ______ \   __\/ __ \\  \/  /\   __\/ __ \ / __ | |  \   __\/  _ \_  __ \
 *  \___ \|   Y  \  |  |_> > /_____/ \  \__(  <_> )  Y Y  \  |_> >  <_> )   |  \  ___/|   |  \  |  \___ \  /_____/  |  | \  ___/ >    <  |  | \  ___// /_/ | |  ||  | (  <_> )  | \/
 * /____  >___|  /__|   __/           \___  >____/|__|_|  /   __/ \____/|___|  /\___  >___|  /__| /____  >          |__|  \___  >__/\_ \ |__|  \___  >____ | |__||__|  \____/|__|   
 *      \/     \/   |__|                  \/            \/|__|               \/     \/     \/          \/                     \/      \/           \/     \/                        
 * ship-components-texteditor 0.2.2
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

	var _extends2 = __webpack_require__(68);

	var _extends3 = _interopRequireDefault(_extends2);

	var _defineProperty2 = __webpack_require__(38);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classCallCheck2 = __webpack_require__(14);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(19);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(18);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(35);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(53);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _immutable = __webpack_require__(54);

	var _immutable2 = _interopRequireDefault(_immutable);

	var _draftJs = __webpack_require__(34);

	var _draftJsExportHtml = __webpack_require__(107);

	var _StyleButton = __webpack_require__(60);

	var _StyleButton2 = _interopRequireDefault(_StyleButton);

	var _linkStrategy = __webpack_require__(62);

	var _linkStrategy2 = _interopRequireDefault(_linkStrategy);

	var _Link = __webpack_require__(61);

	var _Link2 = _interopRequireDefault(_Link);

	var _BlockTypes = __webpack_require__(56);

	var _BlockTypes2 = _interopRequireDefault(_BlockTypes);

	var _InlineStyles = __webpack_require__(59);

	var _InlineStyles2 = _interopRequireDefault(_InlineStyles);

	var _HtmlOptions = __webpack_require__(58);

	var _HtmlOptions2 = _interopRequireDefault(_HtmlOptions);

	var _ChangeEvent = __webpack_require__(57);

	var _ChangeEvent2 = _interopRequireDefault(_ChangeEvent);

	var _TextEditor = __webpack_require__(115);

	var _TextEditor2 = _interopRequireDefault(_TextEditor);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Helper function to setup any decorators
	 * @param    {Object}    props
	 * @return   {Array<Object>}
	 */
	function setupDecorators(props) {
	  // Configure custom decorators
	  var decorators = [];

	  // Convert links inline
	  if (props.convertLinksInline) {
	    decorators.push({
	      strategy: _linkStrategy2.default,
	      component: _Link2.default
	    });
	  }

	  return decorators;
	}

	// CSS Module
	/**
	 * @file TextEditor React Component based on Draft
	 * @author Isaac Suttell <isaac@isaacsuttell.com>
	 * @see https://facebook.github.io/draft-js/docs/overview.html
	 */

	var TextEditor = function (_Component) {
	  (0, _inherits3.default)(TextEditor, _Component);

	  function TextEditor(props) {
	    (0, _classCallCheck3.default)(this, TextEditor);

	    // Convert incoming to somethign draft-js friendly
	    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));

	    var content = _this.convertContentFrom(props);

	    // Configure custom decorators
	    var decorators = setupDecorators(props);

	    // Setup decorators
	    var compositeDecorator = new _draftJs.CompositeDecorator(decorators);

	    // Create State
	    var editorState = _draftJs.EditorState.createWithContent(content, compositeDecorator);

	    // Set state the first time
	    _this.state = {
	      focus: false,
	      editorState: editorState
	    };

	    // Binding
	    _this.handleEditorChange = _this.handleEditorChange.bind(_this);
	    _this.handleKeyCommand = _this.handleKeyCommand.bind(_this);
	    _this.focus = _this.focus.bind(_this);
	    _this.handleInlineStyleClick = _this.handleInlineStyleClick.bind(_this);
	    _this.handleBlockStyleClick = _this.handleBlockStyleClick.bind(_this);
	    _this.forceUpdate = _this.forceUpdate.bind(_this);
	    return _this;
	  }

	  /**
	   * Performance catch
	   */


	  TextEditor.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {
	    return nextProps.editable !== this.props.editable || nextState.focus !== this.state.focus || nextState.editorState !== this.state.editorState;
	  };

	  /**
	   * Public method to cause the editor to reread it's props.value. Often used
	   * when resetting the form.
	   * @public
	   * @example this.refs.editor.forceUpdate();
	   */


	  TextEditor.prototype.forceUpdateState = function forceUpdateState() {
	    var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

	    // Convert incoming to somethign draft-js friendly
	    var content = this.convertContentFrom(props);

	    // Generate new date
	    var updatedEditorState = _draftJs.EditorState.push(this.state.editorState, content);

	    // Update
	    this.handleEditorChange(updatedEditorState);
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
	      return (0, _draftJsExportHtml.stateToHTML)(content, _HtmlOptions2.default);
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

	      var event = new _ChangeEvent2.default(value, {
	        ref: _this2
	      });

	      // limit change events to only times it changed
	      _this2.props.onChange(event);
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
	    } else if (event) {
	      event.preventDefault();
	    }

	    // Generate new state with inline style applied
	    var editorState = _draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle);

	    // Update
	    this.handleEditorChange(editorState);
	  };

	  /**
	   * Toggle an inline style
	   */


	  TextEditor.prototype.handleBlockStyleClick = function handleBlockStyleClick(blockStyle, event) {
	    if (!this.props.editable) {
	      return;
	    } else if (event) {
	      event.preventDefault();
	    }

	    // Generate new state with block style applied
	    var editorState = _draftJs.RichUtils.toggleBlockType(this.state.editorState, blockStyle);

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
	    var currentInlineStyle = editorState.getCurrentInlineStyle();

	    // Determing the current blockt ype
	    var blockType = editorState.getCurrentContent().getBlockForKey(selectionState.getStartKey()).getType();

	    return _react2.default.createElement(
	      'div',
	      { className: (0, _classnames2.default)(_TextEditor2.default.container, this.props.className, 'text-editor', (_classNames = {
	          'text-editor--editable': this.props.editable,
	          'text-editor--focus': this.state.focus
	        }, (0, _defineProperty3.default)(_classNames, _TextEditor2.default.editable, this.props.editable), (0, _defineProperty3.default)(_classNames, _TextEditor2.default.focus, this.state.focus), _classNames)) },
	      this.props.editable ? _react2.default.createElement(
	        'div',
	        { className: _TextEditor2.default.controls },
	        _InlineStyles2.default
	        // Allow user to select styles to show
	        .filter(function (type) {
	          return _this3.props.inlineStyles.has(type.style);
	        }).map(function (type) {
	          return _react2.default.createElement(_StyleButton2.default, (0, _extends3.default)({
	            className: _this3.props.buttonClass,
	            key: type.style,
	            editorState: editorState
	            // Determine if the style is active or not
	            , active: selectionState.getHasFocus() && currentInlineStyle.has(type.style),
	            onMouseDown: _this3.handleInlineStyleClick.bind(_this3, type.style)
	          }, type));
	        }),
	        _BlockTypes2.default
	        // Allow user to select styles to show
	        .filter(function (type) {
	          return _this3.props.blockTypes.has(type.style);
	        }).map(function (type) {
	          return _react2.default.createElement(_StyleButton2.default, (0, _extends3.default)({
	            className: _this3.props.buttonClass,
	            key: type.style,
	            editorState: editorState,
	            active: type.style === blockType,
	            onMouseDown: _this3.handleBlockStyleClick.bind(_this3, type.style)
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
	          placeholder: this.props.editable ? this.props.placeholder : void 0,
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
	  blockTypes: _react.PropTypes.instanceOf(_immutable2.default.Set),
	  tabIndex: _react.PropTypes.number,
	  className: _react.PropTypes.string,
	  buttonClass: _react.PropTypes.string,
	  editable: _react.PropTypes.bool,
	  value: _react.PropTypes.any.isRequired,
	  type: _react.PropTypes.oneOf(['html', 'json', 'Immutable']),
	  spellCheck: _react.PropTypes.bool,
	  convertLinksInline: _react.PropTypes.bool,
	  stripPastedStyles: _react.PropTypes.bool
	};

	/**
	 * Defaults
	 * @type    {Object}
	 */
	TextEditor.defaultProps = {
	  inlineStyles: new _immutable2.default.Set(['BOLD', 'ITALIC', 'UNDERLINE', 'STRIKETHROUGH', 'CODE']),
	  blockTypes: new _immutable2.default.Set(['blockquote', 'code-block', 'unordered-list-item', 'ordered-list-item', 'header-one', 'header-two', 'header-three', 'header-four', 'header-five', 'header-six']),
	  editable: true,
	  type: 'html',
	  spellCheck: true,
	  convertLinksInline: true,
	  stripPastedStyles: true
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 2 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(11)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 4 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(10)
	  , IE8_DOM_DEFINE = __webpack_require__(43)
	  , toPrimitive    = __webpack_require__(30)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(3) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(44)
	  , defined = __webpack_require__(20);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(1)
	  , core      = __webpack_require__(2)
	  , ctx       = __webpack_require__(41)
	  , hide      = __webpack_require__(8)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(5)
	  , createDesc = __webpack_require__(16);
	module.exports = __webpack_require__(3) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(28)('wks')
	  , uid        = __webpack_require__(17)
	  , Symbol     = __webpack_require__(1).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(48)
	  , enumBugKeys = __webpack_require__(21);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 14 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _setPrototypeOf = __webpack_require__(64);

	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

	var _create = __webpack_require__(63);

	var _create2 = _interopRequireDefault(_create);

	var _typeof2 = __webpack_require__(39);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }

	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _typeof2 = __webpack_require__(39);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(10)
	  , dPs         = __webpack_require__(86)
	  , enumBugKeys = __webpack_require__(21)
	  , IE_PROTO    = __webpack_require__(27)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(42)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(79).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(5).f
	  , has = __webpack_require__(4)
	  , TAG = __webpack_require__(9)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(28)('keys')
	  , uid    = __webpack_require__(17);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(1)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(12);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(1)
	  , core           = __webpack_require__(2)
	  , LIBRARY        = __webpack_require__(23)
	  , wksExt         = __webpack_require__(32)
	  , defineProperty = __webpack_require__(5).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(9);

/***/ },
/* 33 */
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
/* 34 */
/***/ function(module, exports) {

	module.exports = require("draft-js");

/***/ },
/* 35 */
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(71), __esModule: true };

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(37);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (obj, key, value) {
	  if (key in obj) {
	    (0, _defineProperty2.default)(obj, key, {
	      value: value,
	      enumerable: true,
	      configurable: true,
	      writable: true
	    });
	  } else {
	    obj[key] = value;
	  }

	  return obj;
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(66);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(65);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(75);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12)
	  , document = __webpack_require__(1).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(3) && !__webpack_require__(11)(function(){
	  return Object.defineProperty(__webpack_require__(42)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(40);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(23)
	  , $export        = __webpack_require__(7)
	  , redefine       = __webpack_require__(49)
	  , hide           = __webpack_require__(8)
	  , has            = __webpack_require__(4)
	  , Iterators      = __webpack_require__(22)
	  , $iterCreate    = __webpack_require__(81)
	  , setToStringTag = __webpack_require__(26)
	  , getPrototypeOf = __webpack_require__(88)
	  , ITERATOR       = __webpack_require__(9)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(15)
	  , createDesc     = __webpack_require__(16)
	  , toIObject      = __webpack_require__(6)
	  , toPrimitive    = __webpack_require__(30)
	  , has            = __webpack_require__(4)
	  , IE8_DOM_DEFINE = __webpack_require__(43)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(3) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(48)
	  , hiddenKeys = __webpack_require__(21).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(4)
	  , toIObject    = __webpack_require__(6)
	  , arrayIndexOf = __webpack_require__(77)(false)
	  , IE_PROTO     = __webpack_require__(27)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(20);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	////////////////////////////////////////////////////////////////////////////////
	// Helpers

	// Merge objects
	//
	function assign(obj /*from1, from2, from3, ...*/) {
	  var sources = Array.prototype.slice.call(arguments, 1);

	  sources.forEach(function (source) {
	    if (!source) { return; }

	    Object.keys(source).forEach(function (key) {
	      obj[key] = source[key];
	    });
	  });

	  return obj;
	}

	function _class(obj) { return Object.prototype.toString.call(obj); }
	function isString(obj) { return _class(obj) === '[object String]'; }
	function isObject(obj) { return _class(obj) === '[object Object]'; }
	function isRegExp(obj) { return _class(obj) === '[object RegExp]'; }
	function isFunction(obj) { return _class(obj) === '[object Function]'; }


	function escapeRE(str) { return str.replace(/[.?*+^$[\]\\(){}|-]/g, '\\$&'); }

	////////////////////////////////////////////////////////////////////////////////


	var defaultOptions = {
	  fuzzyLink: true,
	  fuzzyEmail: true,
	  fuzzyIP: false
	};


	function isOptionsObj(obj) {
	  return Object.keys(obj || {}).reduce(function (acc, k) {
	    return acc || defaultOptions.hasOwnProperty(k);
	  }, false);
	}


	var defaultSchemas = {
	  'http:': {
	    validate: function (text, pos, self) {
	      var tail = text.slice(pos);

	      if (!self.re.http) {
	        // compile lazily, because "host"-containing variables can change on tlds update.
	        self.re.http =  new RegExp(
	          '^\\/\\/' + self.re.src_auth + self.re.src_host_port_strict + self.re.src_path, 'i'
	        );
	      }
	      if (self.re.http.test(tail)) {
	        return tail.match(self.re.http)[0].length;
	      }
	      return 0;
	    }
	  },
	  'https:':  'http:',
	  'ftp:':    'http:',
	  '//':      {
	    validate: function (text, pos, self) {
	      var tail = text.slice(pos);

	      if (!self.re.no_http) {
	      // compile lazily, because "host"-containing variables can change on tlds update.
	        self.re.no_http =  new RegExp(
	          '^' +
	          self.re.src_auth +
	          // Don't allow single-level domains, because of false positives like '//test'
	          // with code comments
	          '(?:localhost|(?:(?:' + self.re.src_domain + ')\\.)+' + self.re.src_domain_root + ')' +
	          self.re.src_port +
	          self.re.src_host_terminator +
	          self.re.src_path,

	          'i'
	        );
	      }

	      if (self.re.no_http.test(tail)) {
	        // should not be `://` & `///`, that protects from errors in protocol name
	        if (pos >= 3 && text[pos - 3] === ':') { return 0; }
	        if (pos >= 3 && text[pos - 3] === '/') { return 0; }
	        return tail.match(self.re.no_http)[0].length;
	      }
	      return 0;
	    }
	  },
	  'mailto:': {
	    validate: function (text, pos, self) {
	      var tail = text.slice(pos);

	      if (!self.re.mailto) {
	        self.re.mailto =  new RegExp(
	          '^' + self.re.src_email_name + '@' + self.re.src_host_strict, 'i'
	        );
	      }
	      if (self.re.mailto.test(tail)) {
	        return tail.match(self.re.mailto)[0].length;
	      }
	      return 0;
	    }
	  }
	};

	/*eslint-disable max-len*/

	// RE pattern for 2-character tlds (autogenerated by ./support/tlds_2char_gen.js)
	var tlds_2ch_src_re = 'a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]';

	// DON'T try to make PRs with changes. Extend TLDs with LinkifyIt.tlds() instead
	var tlds_default = 'biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф'.split('|');

	/*eslint-enable max-len*/

	////////////////////////////////////////////////////////////////////////////////

	function resetScanCache(self) {
	  self.__index__ = -1;
	  self.__text_cache__   = '';
	}

	function createValidator(re) {
	  return function (text, pos) {
	    var tail = text.slice(pos);

	    if (re.test(tail)) {
	      return tail.match(re)[0].length;
	    }
	    return 0;
	  };
	}

	function createNormalizer() {
	  return function (match, self) {
	    self.normalize(match);
	  };
	}

	// Schemas compiler. Build regexps.
	//
	function compile(self) {

	  // Load & clone RE patterns.
	  var re = self.re = __webpack_require__(116)(self.__opts__);

	  // Define dynamic patterns
	  var tlds = self.__tlds__.slice();

	  self.onCompile();

	  if (!self.__tlds_replaced__) {
	    tlds.push(tlds_2ch_src_re);
	  }
	  tlds.push(re.src_xn);

	  re.src_tlds = tlds.join('|');

	  function untpl(tpl) { return tpl.replace('%TLDS%', re.src_tlds); }

	  re.email_fuzzy      = RegExp(untpl(re.tpl_email_fuzzy), 'i');
	  re.link_fuzzy       = RegExp(untpl(re.tpl_link_fuzzy), 'i');
	  re.link_no_ip_fuzzy = RegExp(untpl(re.tpl_link_no_ip_fuzzy), 'i');
	  re.host_fuzzy_test  = RegExp(untpl(re.tpl_host_fuzzy_test), 'i');

	  //
	  // Compile each schema
	  //

	  var aliases = [];

	  self.__compiled__ = {}; // Reset compiled data

	  function schemaError(name, val) {
	    throw new Error('(LinkifyIt) Invalid schema "' + name + '": ' + val);
	  }

	  Object.keys(self.__schemas__).forEach(function (name) {
	    var val = self.__schemas__[name];

	    // skip disabled methods
	    if (val === null) { return; }

	    var compiled = { validate: null, link: null };

	    self.__compiled__[name] = compiled;

	    if (isObject(val)) {
	      if (isRegExp(val.validate)) {
	        compiled.validate = createValidator(val.validate);
	      } else if (isFunction(val.validate)) {
	        compiled.validate = val.validate;
	      } else {
	        schemaError(name, val);
	      }

	      if (isFunction(val.normalize)) {
	        compiled.normalize = val.normalize;
	      } else if (!val.normalize) {
	        compiled.normalize = createNormalizer();
	      } else {
	        schemaError(name, val);
	      }

	      return;
	    }

	    if (isString(val)) {
	      aliases.push(name);
	      return;
	    }

	    schemaError(name, val);
	  });

	  //
	  // Compile postponed aliases
	  //

	  aliases.forEach(function (alias) {
	    if (!self.__compiled__[self.__schemas__[alias]]) {
	      // Silently fail on missed schemas to avoid errons on disable.
	      // schemaError(alias, self.__schemas__[alias]);
	      return;
	    }

	    self.__compiled__[alias].validate =
	      self.__compiled__[self.__schemas__[alias]].validate;
	    self.__compiled__[alias].normalize =
	      self.__compiled__[self.__schemas__[alias]].normalize;
	  });

	  //
	  // Fake record for guessed links
	  //
	  self.__compiled__[''] = { validate: null, normalize: createNormalizer() };

	  //
	  // Build schema condition
	  //
	  var slist = Object.keys(self.__compiled__)
	                      .filter(function (name) {
	                        // Filter disabled & fake schemas
	                        return name.length > 0 && self.__compiled__[name];
	                      })
	                      .map(escapeRE)
	                      .join('|');
	  // (?!_) cause 1.5x slowdown
	  self.re.schema_test   = RegExp('(^|(?!_)(?:[><]|' + re.src_ZPCc + '))(' + slist + ')', 'i');
	  self.re.schema_search = RegExp('(^|(?!_)(?:[><]|' + re.src_ZPCc + '))(' + slist + ')', 'ig');

	  self.re.pretest       = RegExp(
	                            '(' + self.re.schema_test.source + ')|' +
	                            '(' + self.re.host_fuzzy_test.source + ')|' +
	                            '@',
	                            'i');

	  //
	  // Cleanup
	  //

	  resetScanCache(self);
	}

	/**
	 * class Match
	 *
	 * Match result. Single element of array, returned by [[LinkifyIt#match]]
	 **/
	function Match(self, shift) {
	  var start = self.__index__,
	      end   = self.__last_index__,
	      text  = self.__text_cache__.slice(start, end);

	  /**
	   * Match#schema -> String
	   *
	   * Prefix (protocol) for matched string.
	   **/
	  this.schema    = self.__schema__.toLowerCase();
	  /**
	   * Match#index -> Number
	   *
	   * First position of matched string.
	   **/
	  this.index     = start + shift;
	  /**
	   * Match#lastIndex -> Number
	   *
	   * Next position after matched string.
	   **/
	  this.lastIndex = end + shift;
	  /**
	   * Match#raw -> String
	   *
	   * Matched string.
	   **/
	  this.raw       = text;
	  /**
	   * Match#text -> String
	   *
	   * Notmalized text of matched string.
	   **/
	  this.text      = text;
	  /**
	   * Match#url -> String
	   *
	   * Normalized url of matched string.
	   **/
	  this.url       = text;
	}

	function createMatch(self, shift) {
	  var match = new Match(self, shift);

	  self.__compiled__[match.schema].normalize(match, self);

	  return match;
	}


	/**
	 * class LinkifyIt
	 **/

	/**
	 * new LinkifyIt(schemas, options)
	 * - schemas (Object): Optional. Additional schemas to validate (prefix/validator)
	 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
	 *
	 * Creates new linkifier instance with optional additional schemas.
	 * Can be called without `new` keyword for convenience.
	 *
	 * By default understands:
	 *
	 * - `http(s)://...` , `ftp://...`, `mailto:...` & `//...` links
	 * - "fuzzy" links and emails (example.com, foo@bar.com).
	 *
	 * `schemas` is an object, where each key/value describes protocol/rule:
	 *
	 * - __key__ - link prefix (usually, protocol name with `:` at the end, `skype:`
	 *   for example). `linkify-it` makes shure that prefix is not preceeded with
	 *   alphanumeric char and symbols. Only whitespaces and punctuation allowed.
	 * - __value__ - rule to check tail after link prefix
	 *   - _String_ - just alias to existing rule
	 *   - _Object_
	 *     - _validate_ - validator function (should return matched length on success),
	 *       or `RegExp`.
	 *     - _normalize_ - optional function to normalize text & url of matched result
	 *       (for example, for @twitter mentions).
	 *
	 * `options`:
	 *
	 * - __fuzzyLink__ - recognige URL-s without `http(s):` prefix. Default `true`.
	 * - __fuzzyIP__ - allow IPs in fuzzy links above. Can conflict with some texts
	 *   like version numbers. Default `false`.
	 * - __fuzzyEmail__ - recognize emails without `mailto:` prefix.
	 *
	 **/
	function LinkifyIt(schemas, options) {
	  if (!(this instanceof LinkifyIt)) {
	    return new LinkifyIt(schemas, options);
	  }

	  if (!options) {
	    if (isOptionsObj(schemas)) {
	      options = schemas;
	      schemas = {};
	    }
	  }

	  this.__opts__           = assign({}, defaultOptions, options);

	  // Cache last tested result. Used to skip repeating steps on next `match` call.
	  this.__index__          = -1;
	  this.__last_index__     = -1; // Next scan position
	  this.__schema__         = '';
	  this.__text_cache__     = '';

	  this.__schemas__        = assign({}, defaultSchemas, schemas);
	  this.__compiled__       = {};

	  this.__tlds__           = tlds_default;
	  this.__tlds_replaced__  = false;

	  this.re = {};

	  compile(this);
	}


	/** chainable
	 * LinkifyIt#add(schema, definition)
	 * - schema (String): rule name (fixed pattern prefix)
	 * - definition (String|RegExp|Object): schema definition
	 *
	 * Add new rule definition. See constructor description for details.
	 **/
	LinkifyIt.prototype.add = function add(schema, definition) {
	  this.__schemas__[schema] = definition;
	  compile(this);
	  return this;
	};


	/** chainable
	 * LinkifyIt#set(options)
	 * - options (Object): { fuzzyLink|fuzzyEmail|fuzzyIP: true|false }
	 *
	 * Set recognition options for links without schema.
	 **/
	LinkifyIt.prototype.set = function set(options) {
	  this.__opts__ = assign(this.__opts__, options);
	  return this;
	};


	/**
	 * LinkifyIt#test(text) -> Boolean
	 *
	 * Searches linkifiable pattern and returns `true` on success or `false` on fail.
	 **/
	LinkifyIt.prototype.test = function test(text) {
	  // Reset scan cache
	  this.__text_cache__ = text;
	  this.__index__      = -1;

	  if (!text.length) { return false; }

	  var m, ml, me, len, shift, next, re, tld_pos, at_pos;

	  // try to scan for link with schema - that's the most simple rule
	  if (this.re.schema_test.test(text)) {
	    re = this.re.schema_search;
	    re.lastIndex = 0;
	    while ((m = re.exec(text)) !== null) {
	      len = this.testSchemaAt(text, m[2], re.lastIndex);
	      if (len) {
	        this.__schema__     = m[2];
	        this.__index__      = m.index + m[1].length;
	        this.__last_index__ = m.index + m[0].length + len;
	        break;
	      }
	    }
	  }

	  if (this.__opts__.fuzzyLink && this.__compiled__['http:']) {
	    // guess schemaless links
	    tld_pos = text.search(this.re.host_fuzzy_test);
	    if (tld_pos >= 0) {
	      // if tld is located after found link - no need to check fuzzy pattern
	      if (this.__index__ < 0 || tld_pos < this.__index__) {
	        if ((ml = text.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null) {

	          shift = ml.index + ml[1].length;

	          if (this.__index__ < 0 || shift < this.__index__) {
	            this.__schema__     = '';
	            this.__index__      = shift;
	            this.__last_index__ = ml.index + ml[0].length;
	          }
	        }
	      }
	    }
	  }

	  if (this.__opts__.fuzzyEmail && this.__compiled__['mailto:']) {
	    // guess schemaless emails
	    at_pos = text.indexOf('@');
	    if (at_pos >= 0) {
	      // We can't skip this check, because this cases are possible:
	      // 192.168.1.1@gmail.com, my.in@example.com
	      if ((me = text.match(this.re.email_fuzzy)) !== null) {

	        shift = me.index + me[1].length;
	        next  = me.index + me[0].length;

	        if (this.__index__ < 0 || shift < this.__index__ ||
	            (shift === this.__index__ && next > this.__last_index__)) {
	          this.__schema__     = 'mailto:';
	          this.__index__      = shift;
	          this.__last_index__ = next;
	        }
	      }
	    }
	  }

	  return this.__index__ >= 0;
	};


	/**
	 * LinkifyIt#pretest(text) -> Boolean
	 *
	 * Very quick check, that can give false positives. Returns true if link MAY BE
	 * can exists. Can be used for speed optimization, when you need to check that
	 * link NOT exists.
	 **/
	LinkifyIt.prototype.pretest = function pretest(text) {
	  return this.re.pretest.test(text);
	};


	/**
	 * LinkifyIt#testSchemaAt(text, name, position) -> Number
	 * - text (String): text to scan
	 * - name (String): rule (schema) name
	 * - position (Number): text offset to check from
	 *
	 * Similar to [[LinkifyIt#test]] but checks only specific protocol tail exactly
	 * at given position. Returns length of found pattern (0 on fail).
	 **/
	LinkifyIt.prototype.testSchemaAt = function testSchemaAt(text, schema, pos) {
	  // If not supported schema check requested - terminate
	  if (!this.__compiled__[schema.toLowerCase()]) {
	    return 0;
	  }
	  return this.__compiled__[schema.toLowerCase()].validate(text, pos, this);
	};


	/**
	 * LinkifyIt#match(text) -> Array|null
	 *
	 * Returns array of found link descriptions or `null` on fail. We strongly
	 * recommend to use [[LinkifyIt#test]] first, for best speed.
	 *
	 * ##### Result match description
	 *
	 * - __schema__ - link schema, can be empty for fuzzy links, or `//` for
	 *   protocol-neutral  links.
	 * - __index__ - offset of matched text
	 * - __lastIndex__ - index of next char after mathch end
	 * - __raw__ - matched text
	 * - __text__ - normalized text
	 * - __url__ - link, generated from matched text
	 **/
	LinkifyIt.prototype.match = function match(text) {
	  var shift = 0, result = [];

	  // Try to take previous element from cache, if .test() called before
	  if (this.__index__ >= 0 && this.__text_cache__ === text) {
	    result.push(createMatch(this, shift));
	    shift = this.__last_index__;
	  }

	  // Cut head if cache was used
	  var tail = shift ? text.slice(shift) : text;

	  // Scan string until end reached
	  while (this.test(tail)) {
	    result.push(createMatch(this, shift));

	    tail = tail.slice(this.__last_index__);
	    shift += this.__last_index__;
	  }

	  if (result.length) {
	    return result;
	  }

	  return null;
	};


	/** chainable
	 * LinkifyIt#tlds(list [, keepOld]) -> this
	 * - list (Array): list of tlds
	 * - keepOld (Boolean): merge with current list if `true` (`false` by default)
	 *
	 * Load (or merge) new tlds list. Those are user for fuzzy links (without prefix)
	 * to avoid false positives. By default this algorythm used:
	 *
	 * - hostname with any 2-letter root zones are ok.
	 * - biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф
	 *   are ok.
	 * - encoded (`xn--...`) root zones are ok.
	 *
	 * If list is replaced, then exact match for 2-chars root zones will be checked.
	 **/
	LinkifyIt.prototype.tlds = function tlds(list, keepOld) {
	  list = Array.isArray(list) ? list : [ list ];

	  if (!keepOld) {
	    this.__tlds__ = list.slice();
	    this.__tlds_replaced__ = true;
	    compile(this);
	    return this;
	  }

	  this.__tlds__ = this.__tlds__.concat(list)
	                                  .sort()
	                                  .filter(function (el, idx, arr) {
	                                    return el !== arr[idx - 1];
	                                  })
	                                  .reverse();

	  compile(this);
	  return this;
	};

	/**
	 * LinkifyIt#normalize(match)
	 *
	 * Default normalizer (if schema does not define it's own).
	 **/
	LinkifyIt.prototype.normalize = function normalize(match) {

	  // Do minimal possible changes by default. Need to collect feedback prior
	  // to move forward https://github.com/markdown-it/linkify-it/issues/1

	  if (!match.schema) { match.url = 'http://' + match.url; }

	  if (match.schema === 'mailto:' && !/^mailto:/i.test(match.url)) {
	    match.url = 'mailto:' + match.url;
	  }
	};


	/**
	 * LinkifyIt#onCompile()
	 *
	 * Override to modify basic RegExp-s.
	 **/
	LinkifyIt.prototype.onCompile = function onCompile() {
	};


	module.exports = LinkifyIt;


/***/ },
/* 52 */
/***/ function(module, exports) {

	module.exports = [
	  "aaa",
	  "aarp",
	  "abarth",
	  "abb",
	  "abbott",
	  "abbvie",
	  "abc",
	  "able",
	  "abogado",
	  "abudhabi",
	  "ac",
	  "academy",
	  "accenture",
	  "accountant",
	  "accountants",
	  "aco",
	  "active",
	  "actor",
	  "ad",
	  "adac",
	  "ads",
	  "adult",
	  "ae",
	  "aeg",
	  "aero",
	  "aetna",
	  "af",
	  "afamilycompany",
	  "afl",
	  "ag",
	  "agakhan",
	  "agency",
	  "ai",
	  "aig",
	  "aigo",
	  "airbus",
	  "airforce",
	  "airtel",
	  "akdn",
	  "al",
	  "alfaromeo",
	  "alibaba",
	  "alipay",
	  "allfinanz",
	  "allstate",
	  "ally",
	  "alsace",
	  "alstom",
	  "am",
	  "americanexpress",
	  "americanfamily",
	  "amex",
	  "amfam",
	  "amica",
	  "amsterdam",
	  "analytics",
	  "android",
	  "anquan",
	  "anz",
	  "ao",
	  "aol",
	  "apartments",
	  "app",
	  "apple",
	  "aq",
	  "aquarelle",
	  "ar",
	  "aramco",
	  "archi",
	  "army",
	  "arpa",
	  "art",
	  "arte",
	  "as",
	  "asda",
	  "asia",
	  "associates",
	  "at",
	  "athleta",
	  "attorney",
	  "au",
	  "auction",
	  "audi",
	  "audible",
	  "audio",
	  "auspost",
	  "author",
	  "auto",
	  "autos",
	  "avianca",
	  "aw",
	  "aws",
	  "ax",
	  "axa",
	  "az",
	  "azure",
	  "ba",
	  "baby",
	  "baidu",
	  "banamex",
	  "bananarepublic",
	  "band",
	  "bank",
	  "bar",
	  "barcelona",
	  "barclaycard",
	  "barclays",
	  "barefoot",
	  "bargains",
	  "baseball",
	  "basketball",
	  "bauhaus",
	  "bayern",
	  "bb",
	  "bbc",
	  "bbt",
	  "bbva",
	  "bcg",
	  "bcn",
	  "bd",
	  "be",
	  "beats",
	  "beauty",
	  "beer",
	  "bentley",
	  "berlin",
	  "best",
	  "bestbuy",
	  "bet",
	  "bf",
	  "bg",
	  "bh",
	  "bharti",
	  "bi",
	  "bible",
	  "bid",
	  "bike",
	  "bing",
	  "bingo",
	  "bio",
	  "biz",
	  "bj",
	  "black",
	  "blackfriday",
	  "blanco",
	  "blockbuster",
	  "blog",
	  "bloomberg",
	  "blue",
	  "bm",
	  "bms",
	  "bmw",
	  "bn",
	  "bnl",
	  "bnpparibas",
	  "bo",
	  "boats",
	  "boehringer",
	  "bofa",
	  "bom",
	  "bond",
	  "boo",
	  "book",
	  "booking",
	  "boots",
	  "bosch",
	  "bostik",
	  "boston",
	  "bot",
	  "boutique",
	  "box",
	  "br",
	  "bradesco",
	  "bridgestone",
	  "broadway",
	  "broker",
	  "brother",
	  "brussels",
	  "bs",
	  "bt",
	  "budapest",
	  "bugatti",
	  "build",
	  "builders",
	  "business",
	  "buy",
	  "buzz",
	  "bv",
	  "bw",
	  "by",
	  "bz",
	  "bzh",
	  "ca",
	  "cab",
	  "cafe",
	  "cal",
	  "call",
	  "calvinklein",
	  "cam",
	  "camera",
	  "camp",
	  "cancerresearch",
	  "canon",
	  "capetown",
	  "capital",
	  "capitalone",
	  "car",
	  "caravan",
	  "cards",
	  "care",
	  "career",
	  "careers",
	  "cars",
	  "cartier",
	  "casa",
	  "case",
	  "caseih",
	  "cash",
	  "casino",
	  "cat",
	  "catering",
	  "catholic",
	  "cba",
	  "cbn",
	  "cbre",
	  "cbs",
	  "cc",
	  "cd",
	  "ceb",
	  "center",
	  "ceo",
	  "cern",
	  "cf",
	  "cfa",
	  "cfd",
	  "cg",
	  "ch",
	  "chanel",
	  "channel",
	  "chase",
	  "chat",
	  "cheap",
	  "chintai",
	  "chloe",
	  "christmas",
	  "chrome",
	  "chrysler",
	  "church",
	  "ci",
	  "cipriani",
	  "circle",
	  "cisco",
	  "citadel",
	  "citi",
	  "citic",
	  "city",
	  "cityeats",
	  "ck",
	  "cl",
	  "claims",
	  "cleaning",
	  "click",
	  "clinic",
	  "clinique",
	  "clothing",
	  "cloud",
	  "club",
	  "clubmed",
	  "cm",
	  "cn",
	  "co",
	  "coach",
	  "codes",
	  "coffee",
	  "college",
	  "cologne",
	  "com",
	  "comcast",
	  "commbank",
	  "community",
	  "company",
	  "compare",
	  "computer",
	  "comsec",
	  "condos",
	  "construction",
	  "consulting",
	  "contact",
	  "contractors",
	  "cooking",
	  "cookingchannel",
	  "cool",
	  "coop",
	  "corsica",
	  "country",
	  "coupon",
	  "coupons",
	  "courses",
	  "cr",
	  "credit",
	  "creditcard",
	  "creditunion",
	  "cricket",
	  "crown",
	  "crs",
	  "cruise",
	  "cruises",
	  "csc",
	  "cu",
	  "cuisinella",
	  "cv",
	  "cw",
	  "cx",
	  "cy",
	  "cymru",
	  "cyou",
	  "cz",
	  "dabur",
	  "dad",
	  "dance",
	  "date",
	  "dating",
	  "datsun",
	  "day",
	  "dclk",
	  "dds",
	  "de",
	  "deal",
	  "dealer",
	  "deals",
	  "degree",
	  "delivery",
	  "dell",
	  "deloitte",
	  "delta",
	  "democrat",
	  "dental",
	  "dentist",
	  "desi",
	  "design",
	  "dev",
	  "dhl",
	  "diamonds",
	  "diet",
	  "digital",
	  "direct",
	  "directory",
	  "discount",
	  "discover",
	  "dish",
	  "diy",
	  "dj",
	  "dk",
	  "dm",
	  "dnp",
	  "do",
	  "docs",
	  "doctor",
	  "dodge",
	  "dog",
	  "doha",
	  "domains",
	  "dot",
	  "download",
	  "drive",
	  "dtv",
	  "dubai",
	  "duck",
	  "dunlop",
	  "duns",
	  "dupont",
	  "durban",
	  "dvag",
	  "dvr",
	  "dz",
	  "earth",
	  "eat",
	  "ec",
	  "eco",
	  "edeka",
	  "edu",
	  "education",
	  "ee",
	  "eg",
	  "email",
	  "emerck",
	  "energy",
	  "engineer",
	  "engineering",
	  "enterprises",
	  "epost",
	  "epson",
	  "equipment",
	  "er",
	  "ericsson",
	  "erni",
	  "es",
	  "esq",
	  "estate",
	  "esurance",
	  "et",
	  "eu",
	  "eurovision",
	  "eus",
	  "events",
	  "everbank",
	  "exchange",
	  "expert",
	  "exposed",
	  "express",
	  "extraspace",
	  "fage",
	  "fail",
	  "fairwinds",
	  "faith",
	  "family",
	  "fan",
	  "fans",
	  "farm",
	  "farmers",
	  "fashion",
	  "fast",
	  "fedex",
	  "feedback",
	  "ferrari",
	  "ferrero",
	  "fi",
	  "fiat",
	  "fidelity",
	  "fido",
	  "film",
	  "final",
	  "finance",
	  "financial",
	  "fire",
	  "firestone",
	  "firmdale",
	  "fish",
	  "fishing",
	  "fit",
	  "fitness",
	  "fj",
	  "fk",
	  "flickr",
	  "flights",
	  "flir",
	  "florist",
	  "flowers",
	  "fly",
	  "fm",
	  "fo",
	  "foo",
	  "food",
	  "foodnetwork",
	  "football",
	  "ford",
	  "forex",
	  "forsale",
	  "forum",
	  "foundation",
	  "fox",
	  "fr",
	  "free",
	  "fresenius",
	  "frl",
	  "frogans",
	  "frontdoor",
	  "frontier",
	  "ftr",
	  "fujitsu",
	  "fujixerox",
	  "fund",
	  "furniture",
	  "futbol",
	  "fyi",
	  "ga",
	  "gal",
	  "gallery",
	  "gallo",
	  "gallup",
	  "game",
	  "games",
	  "gap",
	  "garden",
	  "gb",
	  "gbiz",
	  "gd",
	  "gdn",
	  "ge",
	  "gea",
	  "gent",
	  "genting",
	  "george",
	  "gf",
	  "gg",
	  "ggee",
	  "gh",
	  "gi",
	  "gift",
	  "gifts",
	  "gives",
	  "giving",
	  "gl",
	  "glade",
	  "glass",
	  "gle",
	  "global",
	  "globo",
	  "gm",
	  "gmail",
	  "gmbh",
	  "gmo",
	  "gmx",
	  "gn",
	  "godaddy",
	  "gold",
	  "goldpoint",
	  "golf",
	  "goo",
	  "goodhands",
	  "goodyear",
	  "goog",
	  "google",
	  "gop",
	  "got",
	  "gov",
	  "gp",
	  "gq",
	  "gr",
	  "grainger",
	  "graphics",
	  "gratis",
	  "green",
	  "gripe",
	  "group",
	  "gs",
	  "gt",
	  "gu",
	  "guardian",
	  "gucci",
	  "guge",
	  "guide",
	  "guitars",
	  "guru",
	  "gw",
	  "gy",
	  "hair",
	  "hamburg",
	  "hangout",
	  "haus",
	  "hbo",
	  "hdfc",
	  "hdfcbank",
	  "health",
	  "healthcare",
	  "help",
	  "helsinki",
	  "here",
	  "hermes",
	  "hgtv",
	  "hiphop",
	  "hisamitsu",
	  "hitachi",
	  "hiv",
	  "hk",
	  "hkt",
	  "hm",
	  "hn",
	  "hockey",
	  "holdings",
	  "holiday",
	  "homedepot",
	  "homegoods",
	  "homes",
	  "homesense",
	  "honda",
	  "honeywell",
	  "horse",
	  "hospital",
	  "host",
	  "hosting",
	  "hot",
	  "hoteles",
	  "hotmail",
	  "house",
	  "how",
	  "hr",
	  "hsbc",
	  "ht",
	  "htc",
	  "hu",
	  "hughes",
	  "hyatt",
	  "hyundai",
	  "ibm",
	  "icbc",
	  "ice",
	  "icu",
	  "id",
	  "ie",
	  "ieee",
	  "ifm",
	  "iinet",
	  "ikano",
	  "il",
	  "im",
	  "imamat",
	  "imdb",
	  "immo",
	  "immobilien",
	  "in",
	  "industries",
	  "infiniti",
	  "info",
	  "ing",
	  "ink",
	  "institute",
	  "insurance",
	  "insure",
	  "int",
	  "intel",
	  "international",
	  "intuit",
	  "investments",
	  "io",
	  "ipiranga",
	  "iq",
	  "ir",
	  "irish",
	  "is",
	  "iselect",
	  "ismaili",
	  "ist",
	  "istanbul",
	  "it",
	  "itau",
	  "itv",
	  "iveco",
	  "iwc",
	  "jaguar",
	  "java",
	  "jcb",
	  "jcp",
	  "je",
	  "jeep",
	  "jetzt",
	  "jewelry",
	  "jio",
	  "jlc",
	  "jll",
	  "jm",
	  "jmp",
	  "jnj",
	  "jo",
	  "jobs",
	  "joburg",
	  "jot",
	  "joy",
	  "jp",
	  "jpmorgan",
	  "jprs",
	  "juegos",
	  "juniper",
	  "kaufen",
	  "kddi",
	  "ke",
	  "kerryhotels",
	  "kerrylogistics",
	  "kerryproperties",
	  "kfh",
	  "kg",
	  "kh",
	  "ki",
	  "kia",
	  "kim",
	  "kinder",
	  "kindle",
	  "kitchen",
	  "kiwi",
	  "km",
	  "kn",
	  "koeln",
	  "komatsu",
	  "kosher",
	  "kp",
	  "kpmg",
	  "kpn",
	  "kr",
	  "krd",
	  "kred",
	  "kuokgroup",
	  "kw",
	  "ky",
	  "kyoto",
	  "kz",
	  "la",
	  "lacaixa",
	  "ladbrokes",
	  "lamborghini",
	  "lamer",
	  "lancaster",
	  "lancia",
	  "lancome",
	  "land",
	  "landrover",
	  "lanxess",
	  "lasalle",
	  "lat",
	  "latino",
	  "latrobe",
	  "law",
	  "lawyer",
	  "lb",
	  "lc",
	  "lds",
	  "lease",
	  "leclerc",
	  "lefrak",
	  "legal",
	  "lego",
	  "lexus",
	  "lgbt",
	  "li",
	  "liaison",
	  "lidl",
	  "life",
	  "lifeinsurance",
	  "lifestyle",
	  "lighting",
	  "like",
	  "lilly",
	  "limited",
	  "limo",
	  "lincoln",
	  "linde",
	  "link",
	  "lipsy",
	  "live",
	  "living",
	  "lixil",
	  "lk",
	  "loan",
	  "loans",
	  "locker",
	  "locus",
	  "loft",
	  "lol",
	  "london",
	  "lotte",
	  "lotto",
	  "love",
	  "lpl",
	  "lplfinancial",
	  "lr",
	  "ls",
	  "lt",
	  "ltd",
	  "ltda",
	  "lu",
	  "lundbeck",
	  "lupin",
	  "luxe",
	  "luxury",
	  "lv",
	  "ly",
	  "ma",
	  "macys",
	  "madrid",
	  "maif",
	  "maison",
	  "makeup",
	  "man",
	  "management",
	  "mango",
	  "market",
	  "marketing",
	  "markets",
	  "marriott",
	  "marshalls",
	  "maserati",
	  "mattel",
	  "mba",
	  "mc",
	  "mcd",
	  "mcdonalds",
	  "mckinsey",
	  "md",
	  "me",
	  "med",
	  "media",
	  "meet",
	  "melbourne",
	  "meme",
	  "memorial",
	  "men",
	  "menu",
	  "meo",
	  "metlife",
	  "mg",
	  "mh",
	  "miami",
	  "microsoft",
	  "mil",
	  "mini",
	  "mint",
	  "mit",
	  "mitsubishi",
	  "mk",
	  "ml",
	  "mlb",
	  "mls",
	  "mm",
	  "mma",
	  "mn",
	  "mo",
	  "mobi",
	  "mobily",
	  "moda",
	  "moe",
	  "moi",
	  "mom",
	  "monash",
	  "money",
	  "monster",
	  "montblanc",
	  "mopar",
	  "mormon",
	  "mortgage",
	  "moscow",
	  "moto",
	  "motorcycles",
	  "mov",
	  "movie",
	  "movistar",
	  "mp",
	  "mq",
	  "mr",
	  "ms",
	  "msd",
	  "mt",
	  "mtn",
	  "mtpc",
	  "mtr",
	  "mu",
	  "museum",
	  "mutual",
	  "mutuelle",
	  "mv",
	  "mw",
	  "mx",
	  "my",
	  "mz",
	  "na",
	  "nab",
	  "nadex",
	  "nagoya",
	  "name",
	  "nationwide",
	  "natura",
	  "navy",
	  "nba",
	  "nc",
	  "ne",
	  "nec",
	  "net",
	  "netbank",
	  "netflix",
	  "network",
	  "neustar",
	  "new",
	  "newholland",
	  "news",
	  "next",
	  "nextdirect",
	  "nexus",
	  "nf",
	  "nfl",
	  "ng",
	  "ngo",
	  "nhk",
	  "ni",
	  "nico",
	  "nike",
	  "nikon",
	  "ninja",
	  "nissan",
	  "nissay",
	  "nl",
	  "no",
	  "nokia",
	  "northwesternmutual",
	  "norton",
	  "now",
	  "nowruz",
	  "nowtv",
	  "np",
	  "nr",
	  "nra",
	  "nrw",
	  "ntt",
	  "nu",
	  "nyc",
	  "nz",
	  "obi",
	  "observer",
	  "off",
	  "office",
	  "okinawa",
	  "olayan",
	  "olayangroup",
	  "oldnavy",
	  "ollo",
	  "om",
	  "omega",
	  "one",
	  "ong",
	  "onl",
	  "online",
	  "onyourside",
	  "ooo",
	  "open",
	  "oracle",
	  "orange",
	  "org",
	  "organic",
	  "orientexpress",
	  "origins",
	  "osaka",
	  "otsuka",
	  "ott",
	  "ovh",
	  "pa",
	  "page",
	  "pamperedchef",
	  "panasonic",
	  "panerai",
	  "paris",
	  "pars",
	  "partners",
	  "parts",
	  "party",
	  "passagens",
	  "pay",
	  "pccw",
	  "pe",
	  "pet",
	  "pf",
	  "pfizer",
	  "pg",
	  "ph",
	  "pharmacy",
	  "philips",
	  "photo",
	  "photography",
	  "photos",
	  "physio",
	  "piaget",
	  "pics",
	  "pictet",
	  "pictures",
	  "pid",
	  "pin",
	  "ping",
	  "pink",
	  "pioneer",
	  "pizza",
	  "pk",
	  "pl",
	  "place",
	  "play",
	  "playstation",
	  "plumbing",
	  "plus",
	  "pm",
	  "pn",
	  "pnc",
	  "pohl",
	  "poker",
	  "politie",
	  "porn",
	  "post",
	  "pr",
	  "pramerica",
	  "praxi",
	  "press",
	  "prime",
	  "pro",
	  "prod",
	  "productions",
	  "prof",
	  "progressive",
	  "promo",
	  "properties",
	  "property",
	  "protection",
	  "pru",
	  "prudential",
	  "ps",
	  "pt",
	  "pub",
	  "pw",
	  "pwc",
	  "py",
	  "qa",
	  "qpon",
	  "quebec",
	  "quest",
	  "qvc",
	  "racing",
	  "radio",
	  "raid",
	  "re",
	  "read",
	  "realestate",
	  "realtor",
	  "realty",
	  "recipes",
	  "red",
	  "redstone",
	  "redumbrella",
	  "rehab",
	  "reise",
	  "reisen",
	  "reit",
	  "reliance",
	  "ren",
	  "rent",
	  "rentals",
	  "repair",
	  "report",
	  "republican",
	  "rest",
	  "restaurant",
	  "review",
	  "reviews",
	  "rexroth",
	  "rich",
	  "richardli",
	  "ricoh",
	  "rightathome",
	  "ril",
	  "rio",
	  "rip",
	  "rmit",
	  "ro",
	  "rocher",
	  "rocks",
	  "rodeo",
	  "rogers",
	  "room",
	  "rs",
	  "rsvp",
	  "ru",
	  "ruhr",
	  "run",
	  "rw",
	  "rwe",
	  "ryukyu",
	  "sa",
	  "saarland",
	  "safe",
	  "safety",
	  "sakura",
	  "sale",
	  "salon",
	  "samsclub",
	  "samsung",
	  "sandvik",
	  "sandvikcoromant",
	  "sanofi",
	  "sap",
	  "sapo",
	  "sarl",
	  "sas",
	  "save",
	  "saxo",
	  "sb",
	  "sbi",
	  "sbs",
	  "sc",
	  "sca",
	  "scb",
	  "schaeffler",
	  "schmidt",
	  "scholarships",
	  "school",
	  "schule",
	  "schwarz",
	  "science",
	  "scjohnson",
	  "scor",
	  "scot",
	  "sd",
	  "se",
	  "seat",
	  "secure",
	  "security",
	  "seek",
	  "select",
	  "sener",
	  "services",
	  "ses",
	  "seven",
	  "sew",
	  "sex",
	  "sexy",
	  "sfr",
	  "sg",
	  "sh",
	  "shangrila",
	  "sharp",
	  "shaw",
	  "shell",
	  "shia",
	  "shiksha",
	  "shoes",
	  "shop",
	  "shopping",
	  "shouji",
	  "show",
	  "showtime",
	  "shriram",
	  "si",
	  "silk",
	  "sina",
	  "singles",
	  "site",
	  "sj",
	  "sk",
	  "ski",
	  "skin",
	  "sky",
	  "skype",
	  "sl",
	  "sling",
	  "sm",
	  "smart",
	  "smile",
	  "sn",
	  "sncf",
	  "so",
	  "soccer",
	  "social",
	  "softbank",
	  "software",
	  "sohu",
	  "solar",
	  "solutions",
	  "song",
	  "sony",
	  "soy",
	  "space",
	  "spiegel",
	  "spot",
	  "spreadbetting",
	  "sr",
	  "srl",
	  "srt",
	  "st",
	  "stada",
	  "staples",
	  "star",
	  "starhub",
	  "statebank",
	  "statefarm",
	  "statoil",
	  "stc",
	  "stcgroup",
	  "stockholm",
	  "storage",
	  "store",
	  "stream",
	  "studio",
	  "study",
	  "style",
	  "su",
	  "sucks",
	  "supplies",
	  "supply",
	  "support",
	  "surf",
	  "surgery",
	  "suzuki",
	  "sv",
	  "swatch",
	  "swiftcover",
	  "swiss",
	  "sx",
	  "sy",
	  "sydney",
	  "symantec",
	  "systems",
	  "sz",
	  "tab",
	  "taipei",
	  "talk",
	  "taobao",
	  "target",
	  "tatamotors",
	  "tatar",
	  "tattoo",
	  "tax",
	  "taxi",
	  "tc",
	  "tci",
	  "td",
	  "tdk",
	  "team",
	  "tech",
	  "technology",
	  "tel",
	  "telecity",
	  "telefonica",
	  "temasek",
	  "tennis",
	  "teva",
	  "tf",
	  "tg",
	  "th",
	  "thd",
	  "theater",
	  "theatre",
	  "tiaa",
	  "tickets",
	  "tienda",
	  "tiffany",
	  "tips",
	  "tires",
	  "tirol",
	  "tj",
	  "tjmaxx",
	  "tjx",
	  "tk",
	  "tkmaxx",
	  "tl",
	  "tm",
	  "tmall",
	  "tn",
	  "to",
	  "today",
	  "tokyo",
	  "tools",
	  "top",
	  "toray",
	  "toshiba",
	  "total",
	  "tours",
	  "town",
	  "toyota",
	  "toys",
	  "tr",
	  "trade",
	  "trading",
	  "training",
	  "travel",
	  "travelchannel",
	  "travelers",
	  "travelersinsurance",
	  "trust",
	  "trv",
	  "tt",
	  "tube",
	  "tui",
	  "tunes",
	  "tushu",
	  "tv",
	  "tvs",
	  "tw",
	  "tz",
	  "ua",
	  "ubank",
	  "ubs",
	  "uconnect",
	  "ug",
	  "uk",
	  "unicom",
	  "university",
	  "uno",
	  "uol",
	  "ups",
	  "us",
	  "uy",
	  "uz",
	  "va",
	  "vacations",
	  "vana",
	  "vanguard",
	  "vc",
	  "ve",
	  "vegas",
	  "ventures",
	  "verisign",
	  "versicherung",
	  "vet",
	  "vg",
	  "vi",
	  "viajes",
	  "video",
	  "vig",
	  "viking",
	  "villas",
	  "vin",
	  "vip",
	  "virgin",
	  "visa",
	  "vision",
	  "vista",
	  "vistaprint",
	  "viva",
	  "vivo",
	  "vlaanderen",
	  "vn",
	  "vodka",
	  "volkswagen",
	  "volvo",
	  "vote",
	  "voting",
	  "voto",
	  "voyage",
	  "vu",
	  "vuelos",
	  "wales",
	  "walmart",
	  "walter",
	  "wang",
	  "wanggou",
	  "warman",
	  "watch",
	  "watches",
	  "weather",
	  "weatherchannel",
	  "webcam",
	  "weber",
	  "website",
	  "wed",
	  "wedding",
	  "weibo",
	  "weir",
	  "wf",
	  "whoswho",
	  "wien",
	  "wiki",
	  "williamhill",
	  "win",
	  "windows",
	  "wine",
	  "winners",
	  "wme",
	  "wolterskluwer",
	  "woodside",
	  "work",
	  "works",
	  "world",
	  "wow",
	  "ws",
	  "wtc",
	  "wtf",
	  "xbox",
	  "xerox",
	  "xfinity",
	  "xihuan",
	  "xin",
	  "कॉम", // xn--11b4c3d
	  "セール", // xn--1ck2e1b
	  "佛山", // xn--1qqw23a
	  "慈善", // xn--30rr7y
	  "集团", // xn--3bst00m
	  "在线", // xn--3ds443g
	  "한국", // xn--3e0b707e
	  "大众汽车", // xn--3oq18vl8pn36a
	  "点看", // xn--3pxu8k
	  "คอม", // xn--42c2d9a
	  "ভারত", // xn--45brj9c
	  "八卦", // xn--45q11c
	  "موقع", // xn--4gbrim
	  "বাংলা", // xn--54b7fta0cc
	  "公益", // xn--55qw42g
	  "公司", // xn--55qx5d
	  "香格里拉", // xn--5su34j936bgsg
	  "网站", // xn--5tzm5g
	  "移动", // xn--6frz82g
	  "我爱你", // xn--6qq986b3xl
	  "москва", // xn--80adxhks
	  "қаз", // xn--80ao21a
	  "католик", // xn--80aqecdr1a
	  "онлайн", // xn--80asehdb
	  "сайт", // xn--80aswg
	  "联通", // xn--8y0a063a
	  "срб", // xn--90a3ac
	  "бг", // xn--90ae
	  "бел", // xn--90ais
	  "קום", // xn--9dbq2a
	  "时尚", // xn--9et52u
	  "微博", // xn--9krt00a
	  "淡马锡", // xn--b4w605ferd
	  "ファッション", // xn--bck1b9a5dre4c
	  "орг", // xn--c1avg
	  "नेट", // xn--c2br7g
	  "ストア", // xn--cck2b3b
	  "삼성", // xn--cg4bki
	  "சிங்கப்பூர்", // xn--clchc0ea0b2g2a9gcd
	  "商标", // xn--czr694b
	  "商店", // xn--czrs0t
	  "商城", // xn--czru2d
	  "дети", // xn--d1acj3b
	  "мкд", // xn--d1alf
	  "ею", // xn--e1a4c
	  "ポイント", // xn--eckvdtc9d
	  "新闻", // xn--efvy88h
	  "工行", // xn--estv75g
	  "家電", // xn--fct429k
	  "كوم", // xn--fhbei
	  "中文网", // xn--fiq228c5hs
	  "中信", // xn--fiq64b
	  "中国", // xn--fiqs8s
	  "中國", // xn--fiqz9s
	  "娱乐", // xn--fjq720a
	  "谷歌", // xn--flw351e
	  "భారత్", // xn--fpcrj9c3d
	  "ලංකා", // xn--fzc2c9e2c
	  "電訊盈科", // xn--fzys8d69uvgm
	  "购物", // xn--g2xx48c
	  "クラウド", // xn--gckr3f0f
	  "ભારત", // xn--gecrj9c
	  "通販", // xn--gk3at1e
	  "भारत", // xn--h2brj9c
	  "网店", // xn--hxt814e
	  "संगठन", // xn--i1b6b1a6a2e
	  "餐厅", // xn--imr513n
	  "网络", // xn--io0a7i
	  "ком", // xn--j1aef
	  "укр", // xn--j1amh
	  "香港", // xn--j6w193g
	  "诺基亚", // xn--jlq61u9w7b
	  "食品", // xn--jvr189m
	  "飞利浦", // xn--kcrx77d1x4a
	  "台湾", // xn--kprw13d
	  "台灣", // xn--kpry57d
	  "手表", // xn--kpu716f
	  "手机", // xn--kput3i
	  "мон", // xn--l1acc
	  "الجزائر", // xn--lgbbat1ad8j
	  "عمان", // xn--mgb9awbf
	  "ارامكو", // xn--mgba3a3ejt
	  "ایران", // xn--mgba3a4f16a
	  "العليان", // xn--mgba7c0bbn0a
	  "امارات", // xn--mgbaam7a8h
	  "بازار", // xn--mgbab2bd
	  "الاردن", // xn--mgbayh7gpa
	  "موبايلي", // xn--mgbb9fbpob
	  "بھارت", // xn--mgbbh1a71e
	  "المغرب", // xn--mgbc0a9azcg
	  "ابوظبي", // xn--mgbca7dzdo
	  "السعودية", // xn--mgberp4a5d4ar
	  "كاثوليك", // xn--mgbi4ecexp
	  "سودان", // xn--mgbpl2fh
	  "همراه", // xn--mgbt3dhd
	  "عراق", // xn--mgbtx2b
	  "مليسيا", // xn--mgbx4cd0ab
	  "澳門", // xn--mix891f
	  "닷컴", // xn--mk1bu44c
	  "政府", // xn--mxtq1m
	  "شبكة", // xn--ngbc5azd
	  "بيتك", // xn--ngbe9e0a
	  "გე", // xn--node
	  "机构", // xn--nqv7f
	  "组织机构", // xn--nqv7fs00ema
	  "健康", // xn--nyqy26a
	  "ไทย", // xn--o3cw4h
	  "سورية", // xn--ogbpf8fl
	  "рус", // xn--p1acf
	  "рф", // xn--p1ai
	  "珠宝", // xn--pbt977c
	  "تونس", // xn--pgbs0dh
	  "大拿", // xn--pssy2u
	  "みんな", // xn--q9jyb4c
	  "グーグル", // xn--qcka1pmc
	  "ελ", // xn--qxam
	  "世界", // xn--rhqv96g
	  "書籍", // xn--rovu88b
	  "ਭਾਰਤ", // xn--s9brj9c
	  "网址", // xn--ses554g
	  "닷넷", // xn--t60b56a
	  "コム", // xn--tckwe
	  "天主教", // xn--tiq49xqyj
	  "游戏", // xn--unup4y
	  "vermögensberater", // xn--vermgensberater-ctb
	  "vermögensberatung", // xn--vermgensberatung-pwb
	  "企业", // xn--vhquv
	  "信息", // xn--vuq861b
	  "嘉里大酒店", // xn--w4r85el8fhu5dnra
	  "嘉里", // xn--w4rs40l
	  "مصر", // xn--wgbh1c
	  "قطر", // xn--wgbl6a
	  "广东", // xn--xhq521b
	  "இலங்கை", // xn--xkc2al3hye2a
	  "இந்தியா", // xn--xkc2dl3a5ee0h
	  "հայ", // xn--y9a3aq
	  "新加坡", // xn--yfro4i67o
	  "فلسطين", // xn--ygbi2ammx
	  "政务", // xn--zfr164b
	  "xperia",
	  "xxx",
	  "xyz",
	  "yachts",
	  "yahoo",
	  "yamaxun",
	  "yandex",
	  "ye",
	  "yodobashi",
	  "yoga",
	  "yokohama",
	  "you",
	  "youtube",
	  "yt",
	  "yun",
	  "za",
	  "zappos",
	  "zara",
	  "zero",
	  "zip",
	  "zippo",
	  "zm",
	  "zone",
	  "zuerich",
	  "zw"
	];


/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = require("classnames");

/***/ },
/* 54 */
/***/ function(module, exports) {

	module.exports = require("immutable");

/***/ },
/* 55 */
/***/ function(module, exports) {

	module.exports = require("ship-components-icon");

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _shipComponentsIcon = __webpack_require__(55);

	var _shipComponentsIcon2 = _interopRequireDefault(_shipComponentsIcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * block styles to be used with draft-js
	 * @type    {Array}
	 * @see https://facebook.github.io/draft-js/docs/advanced-topics-custom-block-render-map.html
	 */
	var BLOCK_TYPES = [{
	  label: 'H1',
	  style: 'header-one'
	}, {
	  label: 'H2',
	  style: 'header-two'
	}, {
	  label: 'H3',
	  style: 'header-three'
	}, {
	  label: 'H4',
	  style: 'header-four'
	}, {
	  label: 'H5',
	  style: 'header-five'
	}, {
	  label: 'H6',
	  style: 'header-six'
	}, {
	  label: 'Quote',
	  style: 'blockquote',
	  iconClass: _shipComponentsIcon2.default.format_quote
	}, {
	  label: 'Unordered List',
	  style: 'unordered-list-item',
	  iconClass: _shipComponentsIcon2.default.format_list_bulleted
	}, {
	  label: 'Ordered List',
	  style: 'ordered-list-item',
	  iconClass: _shipComponentsIcon2.default.format_list_numbered
	}, {
	  label: 'Code Block',
	  style: 'code-block',
	  iconClass: _shipComponentsIcon2.default.code
	}];

	exports.default = BLOCK_TYPES;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _assign = __webpack_require__(36);

	var _assign2 = _interopRequireDefault(_assign);

	var _classCallCheck2 = __webpack_require__(14);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(67);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * Custom event class to pass around values
	 */
	var ChangeEvent = function () {
	  function ChangeEvent(value) {
	    var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	    (0, _classCallCheck3.default)(this, ChangeEvent);

	    (0, _assign2.default)(this, props);

	    this.type = 'change';
	    this.value = value;
	    this.timeStamp = Date.now();
	  }

	  /**
	   * Returns the same path as a default event
	   * @return    {Object}
	   */


	  (0, _createClass3.default)(ChangeEvent, [{
	    key: 'target',
	    get: function get() {
	      return {
	        value: this.value
	      };
	    }
	  }]);
	  return ChangeEvent;
	}();

	exports.default = ChangeEvent;

/***/ },
/* 58 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
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

	exports.default = TO_HTML_OPTIONS;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _shipComponentsIcon = __webpack_require__(55);

	var _shipComponentsIcon2 = _interopRequireDefault(_shipComponentsIcon);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * inline styles to be used with draft-js
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
	  label: 'Strikethrough',
	  style: 'STRIKETHROUGH',
	  iconClass: _shipComponentsIcon2.default.format_strikethrough
	}, {
	  label: 'Code',
	  style: 'CODE',
	  iconClass: _shipComponentsIcon2.default.code
	}];

	exports.default = INLINE_STYLES;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _defineProperty2 = __webpack_require__(38);

	var _defineProperty3 = _interopRequireDefault(_defineProperty2);

	var _classCallCheck2 = __webpack_require__(14);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(19);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(18);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(35);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(53);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _StyleButton = __webpack_require__(114);

	var _StyleButton2 = _interopRequireDefault(_StyleButton);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var StyleButton = function (_Component) {
	  (0, _inherits3.default)(StyleButton, _Component);

	  function StyleButton() {
	    (0, _classCallCheck3.default)(this, StyleButton);
	    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
	  }

	  /**
	   * Make Render
	   * @return    {React}
	   */
	  StyleButton.prototype.render = function render() {
	    var _classNames;

	    return _react2.default.createElement(
	      'div',
	      {
	        className: (0, _classnames2.default)(this.props.className, 'text-editor---btn', _StyleButton2.default.btn, this.props.iconClass, (_classNames = {}, (0, _defineProperty3.default)(_classNames, _StyleButton2.default.icon, typeof this.props.iconClass === 'string'), (0, _defineProperty3.default)(_classNames, 'text-editor--btn-active', this.props.active), (0, _defineProperty3.default)(_classNames, _StyleButton2.default.active, this.props.active), _classNames)),
	        onMouseDown: this.props.onMouseDown,
	        title: this.props.title
	      },
	      typeof this.props.iconClass !== 'string' ? this.props.label : null
	    );
	  };

	  return StyleButton;
	}(_react.Component);

	/**
	 * Type checking
	 * @type    {Object}
	 */


	// CSS Module
	/**
	 * @file Text Editor StyleButton
	 * @author Isaac Suttell <isaac@isaacsuttell.com>
	 */

	exports.default = StyleButton;
	StyleButton.propTypes = {
	  iconClass: _react.PropTypes.string,
	  style: _react.PropTypes.string.isRequired,
	  label: _react.PropTypes.string.isRequired,
	  active: _react.PropTypes.bool.isRequired,
	  className: _react.PropTypes.string,
	  title: _react.PropTypes.string
	};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _classCallCheck2 = __webpack_require__(14);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _possibleConstructorReturn2 = __webpack_require__(19);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(18);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(35);

	var _react2 = _interopRequireDefault(_react);

	var _linkifyIt = __webpack_require__(51);

	var _linkifyIt2 = _interopRequireDefault(_linkifyIt);

	var _tlds = __webpack_require__(52);

	var _tlds2 = _interopRequireDefault(_tlds);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var linkify = (0, _linkifyIt2.default)(); /**
	                                           * Used to render a link
	                                           */

	linkify.tlds(_tlds2.default);

	var Link = function (_Component) {
	  (0, _inherits3.default)(Link, _Component);

	  function Link() {
	    (0, _classCallCheck3.default)(this, Link);
	    return (0, _possibleConstructorReturn3.default)(this, _Component.apply(this, arguments));
	  }

	  Link.prototype.render = function render() {
	    // Get from props
	    var _props = this.props,
	        _props$decoratedText = _props.decoratedText,
	        decoratedText = _props$decoratedText === undefined ? '' : _props$decoratedText,
	        _props$target = _props.target,
	        target = _props$target === undefined ? '_blank' : _props$target,
	        _props$title = _props.title,
	        title = _props$title === undefined ? '' : _props$title,
	        _props$alt = _props.alt,
	        alt = _props$alt === undefined ? '' : _props$alt,
	        className = _props.className,
	        children = _props.children;

	    // Parse

	    var links = linkify.match(decoratedText);

	    // Extract
	    var href = links && links[0] ? links[0].url : '';

	    // Anchor props
	    var props = {
	      href: href,
	      target: target,
	      className: className,
	      title: title,
	      alt: alt
	    };

	    return _react2.default.createElement(
	      'a',
	      props,
	      children
	    );
	  };

	  return Link;
	}(_react.Component);

	exports.default = Link;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (contentBlock, callback) {
	  // Find
	  var links = linkify.match(contentBlock.get('text'));

	  // Apply
	  if (typeof links !== 'undefined' && links !== null) {
	    for (var i = 0; i < links.length; i += 1) {
	      callback(links[i].index, links[i].lastIndex);
	    }
	  }
	};

	var _linkifyIt = __webpack_require__(51);

	var _linkifyIt2 = _interopRequireDefault(_linkifyIt);

	var _tlds = __webpack_require__(52);

	var _tlds2 = _interopRequireDefault(_tlds);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Setup
	var linkify = (0, _linkifyIt2.default)();
	linkify.tlds(_tlds2.default);

	/**
	 * Parse text to find valid links and return them in the callback. If found the
	 * Link component is used
	 * @param    {Immutable}      contentBlock    [description]
	 * @param    {Function}       callback        [description]
	 */

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(72), __esModule: true };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(73), __esModule: true };

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(74), __esModule: true };

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _defineProperty = __webpack_require__(37);

	var _defineProperty2 = _interopRequireDefault(_defineProperty);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }

	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(36);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(94);
	module.exports = __webpack_require__(2).Object.assign;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(95);
	var $Object = __webpack_require__(2).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(96);
	var $Object = __webpack_require__(2).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(97);
	module.exports = __webpack_require__(2).Object.setPrototypeOf;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(100);
	__webpack_require__(98);
	__webpack_require__(101);
	__webpack_require__(102);
	module.exports = __webpack_require__(2).Symbol;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(99);
	__webpack_require__(103);
	module.exports = __webpack_require__(32).f('iterator');

/***/ },
/* 75 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(6)
	  , toLength  = __webpack_require__(92)
	  , toIndex   = __webpack_require__(91);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(13)
	  , gOPS    = __webpack_require__(25)
	  , pIE     = __webpack_require__(15);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1).document && document.documentElement;

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(40);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(24)
	  , descriptor     = __webpack_require__(16)
	  , setToStringTag = __webpack_require__(26)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(8)(IteratorPrototype, __webpack_require__(9)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(13)
	  , toIObject = __webpack_require__(6);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(17)('meta')
	  , isObject = __webpack_require__(12)
	  , has      = __webpack_require__(4)
	  , setDesc  = __webpack_require__(5).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(11)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(13)
	  , gOPS     = __webpack_require__(25)
	  , pIE      = __webpack_require__(15)
	  , toObject = __webpack_require__(50)
	  , IObject  = __webpack_require__(44)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(11)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(5)
	  , anObject = __webpack_require__(10)
	  , getKeys  = __webpack_require__(13);

	module.exports = __webpack_require__(3) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(6)
	  , gOPN      = __webpack_require__(47).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(4)
	  , toObject    = __webpack_require__(50)
	  , IE_PROTO    = __webpack_require__(27)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(12)
	  , anObject = __webpack_require__(10);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(41)(Function.call, __webpack_require__(46).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(29)
	  , defined   = __webpack_require__(20);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(29)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(29)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(76)
	  , step             = __webpack_require__(82)
	  , Iterators        = __webpack_require__(22)
	  , toIObject        = __webpack_require__(6);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(45)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(7);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(85)});

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(7)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(24)});

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(7);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(3), 'Object', {defineProperty: __webpack_require__(5).f});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(7);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(89).set});

/***/ },
/* 98 */
/***/ function(module, exports) {

	

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(90)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(45)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(1)
	  , has            = __webpack_require__(4)
	  , DESCRIPTORS    = __webpack_require__(3)
	  , $export        = __webpack_require__(7)
	  , redefine       = __webpack_require__(49)
	  , META           = __webpack_require__(84).KEY
	  , $fails         = __webpack_require__(11)
	  , shared         = __webpack_require__(28)
	  , setToStringTag = __webpack_require__(26)
	  , uid            = __webpack_require__(17)
	  , wks            = __webpack_require__(9)
	  , wksExt         = __webpack_require__(32)
	  , wksDefine      = __webpack_require__(31)
	  , keyOf          = __webpack_require__(83)
	  , enumKeys       = __webpack_require__(78)
	  , isArray        = __webpack_require__(80)
	  , anObject       = __webpack_require__(10)
	  , toIObject      = __webpack_require__(6)
	  , toPrimitive    = __webpack_require__(30)
	  , createDesc     = __webpack_require__(16)
	  , _create        = __webpack_require__(24)
	  , gOPNExt        = __webpack_require__(87)
	  , $GOPD          = __webpack_require__(46)
	  , $DP            = __webpack_require__(5)
	  , $keys          = __webpack_require__(13)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(47).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(15).f  = $propertyIsEnumerable;
	  __webpack_require__(25).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(23)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(8)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(31)('asyncIterator');

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(31)('observable');

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(93);
	var global        = __webpack_require__(1)
	  , hide          = __webpack_require__(8)
	  , Iterators     = __webpack_require__(22)
	  , TO_STRING_TAG = __webpack_require__(9)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 104 */
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
/* 105 */
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
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _CSSProperty = __webpack_require__(121);

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
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _stateToHTML = __webpack_require__(108);

	Object.defineProperty(exports, 'stateToHTML', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_stateToHTML).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 108 */
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

	var _combineOrderedStyles3 = __webpack_require__(104);

	var _combineOrderedStyles4 = _interopRequireDefault(_combineOrderedStyles3);

	var _normalizeAttributes = __webpack_require__(105);

	var _normalizeAttributes2 = _interopRequireDefault(_normalizeAttributes);

	var _styleToCSS = __webpack_require__(106);

	var _styleToCSS2 = _interopRequireDefault(_styleToCSS);

	var _draftJs = __webpack_require__(34);

	var _draftJsUtils = __webpack_require__(112);

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
/* 109 */
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
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _draftJs = __webpack_require__(34);

	var _getSelectedBlocks = __webpack_require__(33);

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
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.EMPTY_SET = undefined;
	exports.default = getEntityRanges;

	var _immutable = __webpack_require__(54);

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
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _Constants = __webpack_require__(109);

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

	var _getEntityRanges = __webpack_require__(111);

	Object.defineProperty(exports, 'getEntityRanges', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_getEntityRanges).default;
	  }
	});

	var _getSelectedBlocks = __webpack_require__(33);

	Object.defineProperty(exports, 'getSelectedBlocks', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_getSelectedBlocks).default;
	  }
	});

	var _selectionContainsEntity = __webpack_require__(113);

	Object.defineProperty(exports, 'selectionContainsEntity', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_selectionContainsEntity).default;
	  }
	});

	var _callModifierForSelectedBlocks = __webpack_require__(110);

	Object.defineProperty(exports, 'callModifierForSelectedBlocks', {
	  enumerable: true,
	  get: function get() {
	    return _interopRequireDefault(_callModifierForSelectedBlocks).default;
	  }
	});

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getSelectedBlocks = __webpack_require__(33);

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
/* 114 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"btn":"StyleButton--btn","icon":"StyleButton--icon","active":"StyleButton--active"};

/***/ },
/* 115 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"container":"TextEditor--container","editor":"TextEditor--editor","controls":"TextEditor--controls","focus":"TextEditor--focus","editable":"TextEditor--editable"};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';


	module.exports = function (opts) {
	  var re = {};

	  // Use direct extract instead of `regenerate` to reduse browserified size
	  re.src_Any = __webpack_require__(120).source;
	  re.src_Cc  = __webpack_require__(117).source;
	  re.src_Z   = __webpack_require__(119).source;
	  re.src_P   = __webpack_require__(118).source;

	  // \p{\Z\P\Cc\CF} (white spaces + control + format + punctuation)
	  re.src_ZPCc = [ re.src_Z, re.src_P, re.src_Cc ].join('|');

	  // \p{\Z\Cc} (white spaces + control)
	  re.src_ZCc = [ re.src_Z, re.src_Cc ].join('|');

	  // All possible word characters (everything without punctuation, spaces & controls)
	  // Defined via punctuation & spaces to save space
	  // Should be something like \p{\L\N\S\M} (\w but without `_`)
	  re.src_pseudo_letter       = '(?:(?!>|<|' + re.src_ZPCc + ')' + re.src_Any + ')';
	  // The same as abothe but without [0-9]
	  // var src_pseudo_letter_non_d = '(?:(?![0-9]|' + src_ZPCc + ')' + src_Any + ')';

	  ////////////////////////////////////////////////////////////////////////////////

	  re.src_ip4 =

	    '(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';

	  // Prohibit any of "@/[]()" in user/pass to avoid wrong domain fetch.
	  re.src_auth    = '(?:(?:(?!' + re.src_ZCc + '|[@/\\[\\]()]).)+@)?';

	  re.src_port =

	    '(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?';

	  re.src_host_terminator =

	    '(?=$|>|<|' + re.src_ZPCc + ')(?!-|_|:\\d|\\.-|\\.(?!$|' + re.src_ZPCc + '))';

	  re.src_path =

	    '(?:' +
	      '[/?#]' +
	        '(?:' +
	          '(?!' + re.src_ZCc + '|[()[\\]{}.,"\'?!\\-<>]).|' +
	          '\\[(?:(?!' + re.src_ZCc + '|\\]).)*\\]|' +
	          '\\((?:(?!' + re.src_ZCc + '|[)]).)*\\)|' +
	          '\\{(?:(?!' + re.src_ZCc + '|[}]).)*\\}|' +
	          '\\"(?:(?!' + re.src_ZCc + '|["]).)+\\"|' +
	          "\\'(?:(?!" + re.src_ZCc + "|[']).)+\\'|" +
	          "\\'(?=" + re.src_pseudo_letter + '|[-]).|' +  // allow `I'm_king` if no pair found
	          '\\.{2,3}[a-zA-Z0-9%/]|' + // github has ... in commit range links. Restrict to
	                                     // - english
	                                     // - percent-encoded
	                                     // - parts of file path
	                                     // until more examples found.
	          '\\.(?!' + re.src_ZCc + '|[.]).|' +
	          (opts && opts['---'] ?
	            '\\-(?!--(?:[^-]|$))(?:-*)|' // `---` => long dash, terminate
	          :
	            '\\-+|'
	          ) +
	          '\\,(?!' + re.src_ZCc + ').|' +      // allow `,,,` in paths
	          '\\!(?!' + re.src_ZCc + '|[!]).|' +
	          '\\?(?!' + re.src_ZCc + '|[?]).' +
	        ')+' +
	      '|\\/' +
	    ')?';

	  re.src_email_name =

	    '[\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]+';

	  re.src_xn =

	    'xn--[a-z0-9\\-]{1,59}';

	  // More to read about domain names
	  // http://serverfault.com/questions/638260/

	  re.src_domain_root =

	    // Allow letters & digits (http://test1)
	    '(?:' +
	      re.src_xn +
	      '|' +
	      re.src_pseudo_letter + '{1,63}' +
	    ')';

	  re.src_domain =

	    '(?:' +
	      re.src_xn +
	      '|' +
	      '(?:' + re.src_pseudo_letter + ')' +
	      '|' +
	      // don't allow `--` in domain names, because:
	      // - that can conflict with markdown &mdash; / &ndash;
	      // - nobody use those anyway
	      '(?:' + re.src_pseudo_letter + '(?:-(?!-)|' + re.src_pseudo_letter + '){0,61}' + re.src_pseudo_letter + ')' +
	    ')';

	  re.src_host =

	    '(?:' +
	    // Don't need IP check, because digits are already allowed in normal domain names
	    //   src_ip4 +
	    // '|' +
	      '(?:(?:(?:' + re.src_domain + ')\\.)*' + re.src_domain/*_root*/ + ')' +
	    ')';

	  re.tpl_host_fuzzy =

	    '(?:' +
	      re.src_ip4 +
	    '|' +
	      '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))' +
	    ')';

	  re.tpl_host_no_ip_fuzzy =

	    '(?:(?:(?:' + re.src_domain + ')\\.)+(?:%TLDS%))';

	  re.src_host_strict =

	    re.src_host + re.src_host_terminator;

	  re.tpl_host_fuzzy_strict =

	    re.tpl_host_fuzzy + re.src_host_terminator;

	  re.src_host_port_strict =

	    re.src_host + re.src_port + re.src_host_terminator;

	  re.tpl_host_port_fuzzy_strict =

	    re.tpl_host_fuzzy + re.src_port + re.src_host_terminator;

	  re.tpl_host_port_no_ip_fuzzy_strict =

	    re.tpl_host_no_ip_fuzzy + re.src_port + re.src_host_terminator;


	  ////////////////////////////////////////////////////////////////////////////////
	  // Main rules

	  // Rude test fuzzy links by host, for quick deny
	  re.tpl_host_fuzzy_test =

	    'localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:' + re.src_ZPCc + '|>|$))';

	  re.tpl_email_fuzzy =

	      '(^|<|>|\\(|' + re.src_ZCc + ')(' + re.src_email_name + '@' + re.tpl_host_fuzzy_strict + ')';

	  re.tpl_link_fuzzy =
	      // Fuzzy link can't be prepended with .:/\- and non punctuation.
	      // but can start with > (markdown blockquote)
	      '(^|(?![.:/\\-_@])(?:[$+<=>^`|]|' + re.src_ZPCc + '))' +
	      '((?![$+<=>^`|])' + re.tpl_host_port_fuzzy_strict + re.src_path + ')';

	  re.tpl_link_no_ip_fuzzy =
	      // Fuzzy link can't be prepended with .:/\- and non punctuation.
	      // but can start with > (markdown blockquote)
	      '(^|(?![.:/\\-_@])(?:[$+<=>^`|]|' + re.src_ZPCc + '))' +
	      '((?![$+<=>^`|])' + re.tpl_host_port_no_ip_fuzzy_strict + re.src_path + ')';

	  return re;
	};


/***/ },
/* 117 */
/***/ function(module, exports) {

	module.exports=/[\0-\x1F\x7F-\x9F]/

/***/ },
/* 118 */
/***/ function(module, exports) {

	module.exports=/[!-#%-\*,-/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E44\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDF3C-\uDF3E]|\uD807[\uDC41-\uDC45\uDC70\uDC71]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/

/***/ },
/* 119 */
/***/ function(module, exports) {

	module.exports=/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/

/***/ },
/* 120 */
/***/ function(module, exports) {

	module.exports=/[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/

/***/ },
/* 121 */
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

/***/ }
/******/ ]);