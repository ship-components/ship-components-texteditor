/**
 * ES6 Buttons Example
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Immutable from 'immutable';
import TextEditor from '../src/TextEditor';

class Examples extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      basic: '<p>This is <b>some </b><u><b>sample</b></u> <i><b>text</b></i></p>',
      json: ''
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
          <div>
            <h3>Result</h3>
            <pre>{this.state.basic}</pre>
          </div>
        </div>
        <div className='example-group'>
          <h2>Basic Non Editable (HTML)</h2>
          <TextEditor
            editable={false}
            type='html'
            value={this.state.basic}
          />
          <div>
            <h3>Value</h3>
            <pre>{this.state.basic}</pre>
          </div>
        </div>
        <div className='example-group'>
          <h2>Basic (JSON)</h2>
          <TextEditor
            editable
            type='json'
            inlineStyles={new Immutable.Set(['BOLD', 'UNDERLINE', 'ITALIC'])}
            placeholder='Enter some text here and see the json result...'
            onChange={this.handleChange.bind(this, 'json')}
            value={this.state.json}
          />
          <div>
            <h3>Value</h3>
            <code>
              {JSON.stringify(this.state.json, null, '    ').toString()}
            </code>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Examples />, document.getElementById('examples'));
