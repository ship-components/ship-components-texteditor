# TextEditor

Rich Text Editor for React using contentEditable. Uses ES6 through Babel.

## Installation

Requires react and classnames to installed. They are not bundled in the package.

```shell
npm install react classnames react-texteditor --save-dev`
```

## Usage

```js
var React = require('react');
var TextEditor = require('react-texteditor');

var ExampleView = React.createClass({
    /**
     * Initial State
     *
     * @type    {Object}
     */
    getInitialState: {
        text: ''
    }

    /**
     * Handle a change in the editor
     *
     * @param     {String}    prop
     * @param     {Object}    event
     */
    handleChange: function(prop, event) {
        var state = this.state;
        state[prop] = event.target.value;
        this.setState(state);
    },

    /**
     * Render
     *
     * @return    {React}
     */
    render: function() {
        return (
            <TextEditor
                  onChange={this.handleChange.bind(this, 'text')}
                  html={this.state.html} />
        );
    }
});

```

## Development

Source files are located in `src/` and can be built with `grunt build` command after running `npm install`. Transformed files are saved to the `dist/` folder.

If you're using webpack with the babel loader you can directly require the `src/` folder, e.g.

```js
var TextEditor = require('react-texteditor/src');
```
