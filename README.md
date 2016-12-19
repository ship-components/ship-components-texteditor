# ship-components-texteditor
[React](http://facebook.github.io/react/) rich text editor built on [draft-js](https://facebook.github.io/draft-js/). Exports a commonjs module that can be used with [webpack](http://webpack.github.io/). Source is in ES6 and is compiled down to ES5 using [Babel](https://babeljs.io/).

[![npm](https://img.shields.io/npm/v/ship-components-texteditor.svg?maxAge=2592000)](https://www.npmjs.com/package/ship-components-texteditor)
[![dependencies](https://img.shields.io/david/ship-components/ship-components-texteditor.svg?style=flat)](https://david-dm.org/ship-components/ship-components-texteditor)
[![devDependencies](https://img.shields.io/david/dev/ship-components/ship-components-texteditor.svg?style=flat)](https://david-dm.org/ship-components/ship-components-texteditor?type=dev)

## Usage

### ES6/JSX (Recommended)
The component is written using ES6/JSX therefore Babel is recommended to use it. The below example is based on using [webpack](http://webpack.github.io/) and [babel-loader](https://github.com/babel/babel-loader).
```js
import React from 'react';
import TextEditor from 'ship-components-texteditor';

class Examples extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      basic: '<p>This is <b>some </b><u><b>sample</b></u> <i><b>text</b></i></p>'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, event) {
    this.setState({
      [key]: event.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>{'<TextEditor /> Examples'}</h1>
        <div className='example-group'>
          <h2>Basic (HTML)</h2>
          <TextEditor
            editable
            type='html'
            inlineStyles={new Immutable.Set(['BOLD', 'UNDERLINE', 'ITALIC'])}
            onChange={this.handleChange.bind(this, 'basic')}
            value={this.state.basic}
          />
        </div>
      </div>
    );
  }
}

```

## Examples and Development
Examples can be found in the `examples/` folder. A development server can be run with:

```shell
$ npm install
$ npm start
```

This will live reload any changes you make and serve them at http://localhost:8080.

### Webpack Configuration
This module is designed to be used with webpack but requires a few loaders if you are pulling the source into another project.

```shell
$ npm install webpack babel-loader css-loader style-loader postcss-loader extract-text-webpack-plugin postcss-nested postcss-color-hex-alpha postcss-color-function postcss-calc postcss-simple-vars autoprefixer --save-dev
```

Below are is a sample of how to setup the loaders:

```js
/**
 * Relevant Webpack Configuration
 */
{
  [...]
  module: {
    loaders: [
      // Setup support for ES6
      {
        test: /\.(jsx?|es6)$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      // ES6/JSX for external ship-components modules
      {
        test: /\.(jsx?|es6)$/,
        include: [
          /ship-components\-.*\/src/
        ],
        loader: 'babel'
      },
      // Loaded for fonts and images
      {
       test: /\.(png|svg|jpeg|jpg|ttf|eot|woff)/,
       loader: 'file?name=[path][name].[ext]'
      },
      // Setup support for CSS Modules
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
      }
    ]
  },
  plugins: [
    // Extract the css and put it in one file. Path is relative to output path
    new ExtractTextPlugin('../css/[name].css', { allChunks: true })
  ],
  // CSS Modules
  postcss: [
    require('postcss-nested'),
    require('postcss-color-hex-alpha'),
    require('postcss-color-function'),
    require('postcss-calc'),
    require('autoprefixer')
  ],
  [...]
}
```

## Tests
1. `npm install`
2. `npm test`

## History
* 0.2.1 - Fixed devDeps -> deps issue
* 0.2.0 - Switched to draft-js for core engine, added inline link support, added more styles
* 0.1.0 - Initial

## License
The MIT License (MIT)

Copyright (c) 2016 SHIP

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
