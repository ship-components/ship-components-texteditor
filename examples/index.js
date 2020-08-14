/**
 * ES6 Buttons Example
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Modals from 'ship-components-dialog/src/Modals';
import TextEditor from '../src/TextEditor';
import { convertEntities, entities } from './entities';

class Examples extends React.Component {

  constructor(props) {
    super(props);

    this.state ={
      basic: '<h1>Titles</h1><p>Here is <b>some <u>sample</u> <i>text</i></b> with links to google.com</p><blockquote>"And some quotes too"</blockquote><ul><li>Even Bullets!</li></ul>',
      json: '',
      suggestions: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEntityChange = this.handleEntityChange.bind(this);
  }

  handleChange(key, event) {
    // When any changes are triggered by the editor
    this.setState({
      [key]: event.target.value
    });
  }

  handleEntityChange(event) {
    // When an marked entity is selected/deselected
    let suggestions = null;
    // Show suggestions list when dealing with a suggestion entity
    if (event.entity && event.entity.type === 'SUGGESTION') {
      suggestions = entities.filter(item =>
        item.value.toLowerCase().indexOf(event.value.toLowerCase()) !== -1
      ).map(entity => ({
        label: entity.label,
        value: `${entity.value} `
      }));
    }
    this.setState({
      suggestions
    });
  }

  handleReset(key) {
    this.setState({
      [key]: ''
    }, ()=>{
      this.refs[key].forceUpdate();
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
            ref='basic'
            type='html'
            onChange={this.handleChange.bind(this, 'basic')}
            value={this.state.basic}
            placeholder='Basic editor...'
          />
          <button
            onClick={this.handleReset.bind(this, 'basic')}
          >
            Reset
          </button>
          <div>
            <h3>Result</h3>
            <pre>{this.state.basic}</pre>
          </div>
        </div>
        <div className='example-group'>
          <h2>Basic (HTML) with Custom Buttons</h2>
          <TextEditor
            editable
            type='html'
            onChange={this.handleChange.bind(this, 'basic')}
            value={this.state.basic}
            buttonClass='dark-btn'
          />
          <div>
            <h3>Result</h3>
            <pre>{this.state.basic}</pre>
          </div>
        </div>
        <div className='example-group'>
          <h2>Basic (HTML) with only Inline buttons</h2>
          <TextEditor
            onlyInline
            editable
            type='html'
            onChange={this.handleChange.bind(this, 'basic')}
            value={this.state.basic}
          />
          <div>
            <h3>Result</h3>
            <pre>{this.state.basic}</pre>
          </div>
        </div>
        <div className='example-group'>
          <h2>Basic (HTML) with no style buttons</h2>
          <TextEditor
            noStyleButtons
            editable
            type='html'
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
          <h2>Entity support for suggestions, mentions and hashtags (HTML)</h2>
          <TextEditor
            editable
            ref='basic'
            type='html'
            onChange={this.handleChange.bind(this, 'basic')}
            onEntityChange={this.handleEntityChange}
            convertEntities={convertEntities}
            value={this.state.basic}
            placeholder='Basic editor...'
            suggestions={this.state.suggestions}
          />
          <button
            onClick={this.handleReset.bind(this, 'basic')}
          >
            Reset
          </button>
          <div>
            <h3>Result</h3>
            <pre>{this.state.basic}</pre>
          </div>
        </div>
        <div className='example-group'>
          <h2>Basic (JSON)</h2>
          <TextEditor
            editable
            type='json'
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
        <Modals />
      </div>
    );
  }
}

ReactDOM.render(<Examples />, document.getElementById('examples'));
