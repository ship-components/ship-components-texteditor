# TextEditor

Rich Text Editor for React

## Installation

1) `npm install react lodash classnames react-texteditor`

## Usage

```js
var TextEditor = require('react-texteditor');

var View = react.createClass({
    /**
     * Initial State
     *
     * @type    {Object}
     */
    getInitialState: {
        text: '',
        editable: true,
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
                  value={this.state.text}
                  editable={this.state.editable} />
        );
    }
});

```

## Development

Source files are located in `src/` and can be built the default `grunt` command after running `npm install`. Transformed files are saved to the `dist/` folder.

If you're using webpack with the babel loader you can directly require the `src/` folder, e.g.

```js
var TextEditor = require('react-texteditor/src');
```
