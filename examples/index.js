/**
 * ES6 Buttons Example
 */

import React from 'react';
import ReactDOM from 'react-dom';
import TextEditor from '../src/TextEditor';

class Examples extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      value: 'This is <b>some</b> sample text'
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  getButtons() {
    return {
      bold: {
        enabled: true,
        command: 'bold',
        comp: <button>B</button>
      },
      italic: {
        enabled: true,
        command: 'italic',
        comp: <button>I</button>
      },
      underline: {
        enabled: true,
        command: 'underline',
        comp: <button>U</button>
      }
    };
  }
  render() {
    console.log(this.state.value);
    return (
      <div>
        <h1>{'<TextEditor /> Examples'}</h1>
        <div className='example-group'>
          <h2>Basic</h2>
          <TextEditor
            editable
            buttons={this.getButtons.call(this)}
            onChange={this.handleChange}
            html='This is <b>some</b> sample text'
          />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Examples />, document.getElementById('examples'));
